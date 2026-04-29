import { Trash } from "@phosphor-icons/react/dist/ssr";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import PageHeader from "../../_components/PageHeader";
import { TextField, NumberField, TextareaField, ToggleField } from "../../_components/Fields";
import {
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from "../../actions/testimonials";
import type { TestimonialRow } from "@/lib/supabase";

export const dynamic = "force-dynamic";

function TestimonialEditor({
  testimonial,
  action,
  submitLabel,
}: {
  testimonial?: TestimonialRow;
  action: (formData: FormData) => void;
  submitLabel: string;
}) {
  return (
    <form
      action={action}
      className="bg-zinc-950 border border-zinc-800 p-4 sm:p-5 flex flex-col gap-4"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
        <TextField
          label="Ім'я автора"
          name="author_name"
          defaultValue={testimonial?.author_name}
          required
        />
        <TextField
          label="Посада"
          name="author_role"
          defaultValue={testimonial?.author_role ?? ""}
        />
        <TextField
          label="Компанія"
          name="company"
          defaultValue={testimonial?.company ?? ""}
        />
      </div>
      <TextareaField
        label="Цитата"
        name="quote"
        defaultValue={testimonial?.quote ?? ""}
        rows={3}
        required
      />
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 items-end">
        <NumberField
          label="Рейтинг (1-5)"
          name="rating"
          defaultValue={testimonial?.rating ?? 5}
          min={1}
          step={1}
        />
        <NumberField
          label="Порядок"
          name="sort_order"
          defaultValue={testimonial?.sort_order ?? 0}
        />
        <ToggleField
          label="Опубліковано"
          name="is_published"
          defaultChecked={testimonial?.is_published ?? true}
        />
      </div>
      <div className="flex items-center gap-3 pt-2 border-t border-zinc-800">
        <button
          type="submit"
          className="bg-gold text-zinc-950 font-display text-sm px-5 py-2 hover:bg-gold-dim transition-colors"
        >
          {submitLabel}
        </button>
        {testimonial && (
          <form action={deleteTestimonial} className="ml-auto">
            <input type="hidden" name="id" value={testimonial.id} />
            <button
              type="submit"
              className="flex items-center gap-1.5 text-sm text-red-400 hover:text-red-300 transition-colors"
            >
              <Trash size={14} />
              Видалити
            </button>
          </form>
        )}
      </div>
    </form>
  );
}

export default async function TestimonialsPage() {
  const supabase = createSupabaseServerClient();
  const { data } = await supabase
    .from("testimonials")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("id", { ascending: false });
  const testimonials = (data ?? []) as TestimonialRow[];

  return (
    <>
      <PageHeader
        title="Відгуки"
        description="Карусель відгуків клієнтів на головній."
      />
      <div className="px-4 sm:px-6 lg:px-10 py-6 lg:py-8 flex flex-col gap-8 max-w-4xl">
        <section>
          <h2 className="text-xs uppercase tracking-widest text-zinc-500 mb-3">
            Додати новий відгук
          </h2>
          <TestimonialEditor action={createTestimonial} submitLabel="Додати" />
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-xs uppercase tracking-widest text-zinc-500">
            Усі відгуки ({testimonials.length})
          </h2>
          {testimonials.length === 0 ? (
            <p className="text-zinc-500 text-sm">Поки що немає відгуків.</p>
          ) : (
            testimonials.map((t) => (
              <TestimonialEditor
                key={t.id}
                testimonial={t}
                action={updateTestimonial.bind(null, t.id)}
                submitLabel="Оновити"
              />
            ))
          )}
        </section>
      </div>
    </>
  );
}
