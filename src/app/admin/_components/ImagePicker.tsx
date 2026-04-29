"use client";

import { useRef, useState } from "react";
import { Image as ImageIcon, X, UploadSimple, Spinner, CheckCircle } from "@phosphor-icons/react";
import imageCompression from "browser-image-compression";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";

const labelClass = "text-xs uppercase tracking-widest text-zinc-500";
const inputClass =
  "w-full bg-zinc-900 border border-zinc-800 px-3 py-2.5 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-gold transition-colors text-sm";

export type ImageRecommendation = {
  /** Human label, e.g. "16:9 (горизонтальне)" */
  ratio?: string;
  /** Min recommended dimensions, e.g. "1600 × 900 px" */
  minSize?: string;
  /** Notes appended to the hint */
  note?: string;
};

const DEFAULT_RECO: ImageRecommendation = {
  ratio: "будь-яке",
  minSize: "≥ 1200 px по довшій стороні",
};

const ACCEPTED = "image/jpeg,image/png,image/webp,image/avif";

function slugifyFilename(name: string) {
  const dot = name.lastIndexOf(".");
  const base = dot === -1 ? name : name.slice(0, dot);
  return base
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60) || "image";
}

export default function ImagePicker({
  label,
  name,
  defaultValue,
  gallery,
  hint,
  recommendation = DEFAULT_RECO,
}: {
  label: string;
  name: string;
  defaultValue?: string | null;
  gallery: string[];
  hint?: string;
  recommendation?: ImageRecommendation;
}) {
  const [value, setValue] = useState<string>(defaultValue ?? "");
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState<{ original: number; compressed: number } | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropRef = useRef<HTMLDivElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setUploadError("Це не зображення.");
      return;
    }
    setUploadError(null);
    setUploading(true);
    setProgress({ original: file.size, compressed: 0 });
    try {
      // Compress to WebP, ~500KB target, max 2000px on the longer edge
      const compressed = await imageCompression(file, {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 2000,
        useWebWorker: true,
        fileType: "image/webp",
        initialQuality: 0.82,
      });
      setProgress({ original: file.size, compressed: compressed.size });

      const supabase = createSupabaseBrowserClient();
      const path = `${Date.now()}-${slugifyFilename(file.name)}.webp`;
      const { error } = await supabase.storage
        .from("site-images")
        .upload(path, compressed, {
          contentType: "image/webp",
          upsert: false,
          cacheControl: "31536000",
        });
      if (error) throw error;

      const { data: pub } = supabase.storage
        .from("site-images")
        .getPublicUrl(path);
      setValue(pub.publicUrl);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Не вдалося завантажити файл.";
      setUploadError(message);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) void handleFile(file);
  };

  return (
    <div className="flex flex-col gap-2">
      <label className={labelClass}>{label}</label>

      {/* Recommendation banner */}
      <div className="text-xs text-zinc-400 bg-zinc-900/50 border border-zinc-800 px-3 py-2 flex flex-col sm:flex-row sm:flex-wrap gap-x-4 gap-y-1">
        <span>
          <span className="text-zinc-500">Формат:</span> JPG / PNG / WebP
        </span>
        {recommendation.ratio && (
          <span>
            <span className="text-zinc-500">Пропорції:</span> {recommendation.ratio}
          </span>
        )}
        {recommendation.minSize && (
          <span>
            <span className="text-zinc-500">Розмір:</span> {recommendation.minSize}
          </span>
        )}
        <span className="text-zinc-500 hidden sm:inline">
          Авто-стиснення до WebP ~500 КБ, max 2000 px
        </span>
        {recommendation.note && (
          <span className="basis-full text-zinc-500">{recommendation.note}</span>
        )}
      </div>

      {/* Drop zone + actions */}
      <div
        ref={dropRef}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        className={`relative border-2 border-dashed transition-colors ${
          dragOver ? "border-gold bg-gold/[0.04]" : "border-zinc-800 bg-zinc-900/30"
        } px-4 py-5 flex flex-col gap-3`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={ACCEPTED}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) void handleFile(file);
          }}
          className="hidden"
        />

        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:items-center">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="flex items-center justify-center gap-2 bg-gold text-zinc-950 font-display text-sm px-4 py-2.5 sm:py-2 hover:bg-gold-dim disabled:opacity-60 transition-colors"
          >
            {uploading ? (
              <>
                <Spinner size={14} className="animate-spin" />
                Завантаження…
              </>
            ) : (
              <>
                <UploadSimple size={14} weight="bold" />
                Завантажити з пристрою
              </>
            )}
          </button>
          <button
            type="button"
            onClick={() => setGalleryOpen(true)}
            disabled={uploading}
            className="flex items-center justify-center gap-1.5 px-3 py-2.5 sm:py-2 text-xs text-zinc-300 border border-zinc-800 hover:border-gold hover:text-gold transition-colors"
          >
            <ImageIcon size={14} />
            Галерея
          </button>
          <span className="text-xs text-zinc-500 hidden sm:inline">
            або перетягни файл сюди
          </span>
        </div>

        {/* Status */}
        {uploadError && (
          <p className="text-sm text-red-400">{uploadError}</p>
        )}
        {progress && progress.compressed > 0 && !uploading && (
          <p className="text-xs text-emerald-400 flex items-center gap-1.5">
            <CheckCircle size={14} />
            Стиснено: {(progress.original / 1024).toFixed(0)} КБ →{" "}
            {(progress.compressed / 1024).toFixed(0)} КБ
            {progress.original > 0 &&
              ` (${Math.round(
                (1 - progress.compressed / progress.original) * 100,
              )}% менше)`}
          </p>
        )}
      </div>

      {/* URL input */}
      <div className="flex gap-2">
        <input
          name={name}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="URL зображення (заповнюється автоматично після завантаження)"
          className={inputClass}
        />
      </div>

      {/* Preview */}
      {value && (
        <div className="mt-1 flex items-start gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt=""
            className="w-32 h-32 object-cover border border-zinc-800 bg-zinc-900"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.opacity = "0.2";
            }}
          />
          <div className="flex flex-col gap-1.5">
            <button
              type="button"
              onClick={() => setValue("")}
              className="text-xs text-zinc-500 hover:text-red-400 transition-colors self-start"
            >
              Очистити
            </button>
            <a
              href={value}
              target="_blank"
              rel="noreferrer"
              className="text-xs text-zinc-500 hover:text-gold transition-colors self-start"
            >
              Відкрити в новій вкладці ↗
            </a>
          </div>
        </div>
      )}

      {hint && <p className="text-xs text-zinc-500">{hint}</p>}

      {/* Gallery modal */}
      {galleryOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6"
          onClick={() => setGalleryOpen(false)}
        >
          <div
            className="bg-zinc-950 border border-zinc-800 max-w-4xl w-full max-h-[80vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-3">
              <h3 className="font-display text-zinc-100">
                Галерея /public/images
              </h3>
              <button
                type="button"
                onClick={() => setGalleryOpen(false)}
                className="text-zinc-500 hover:text-zinc-200"
                aria-label="Закрити"
              >
                <X size={18} />
              </button>
            </div>
            <div className="overflow-y-auto p-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {gallery.map((src) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => {
                    setValue(src);
                    setGalleryOpen(false);
                  }}
                  className={`group relative border ${
                    value === src ? "border-gold" : "border-zinc-800"
                  } hover:border-gold transition-colors`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt=""
                    className="w-full aspect-square object-cover"
                  />
                  <span className="absolute bottom-0 left-0 right-0 bg-zinc-950/80 text-[10px] text-zinc-300 px-2 py-1 truncate">
                    {src.replace("/images/", "")}
                  </span>
                </button>
              ))}
              {gallery.length === 0 && (
                <p className="col-span-full text-center text-zinc-500 text-sm py-8">
                  Файлів у /public/images немає.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
