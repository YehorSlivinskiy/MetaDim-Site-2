import { Trash } from "@phosphor-icons/react/dist/ssr";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import PageHeader from "../../_components/PageHeader";
import { TextField, NumberField, ToggleField } from "../../_components/Fields";
import { createStat, updateStat, deleteStat } from "../../actions/stats";
import type { StatRow } from "@/lib/supabase";

export const dynamic = "force-dynamic";

function StatEditor({
  stat,
  action,
  submitLabel,
}: {
  stat?: StatRow;
  action: (formData: FormData) => void;
  submitLabel: string;
}) {
  return (
    <form
      action={action}
      className="bg-zinc-950 border border-zinc-800 p-4 sm:p-5 flex flex-col gap-3"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <TextField label="Підпис" name="label" defaultValue={stat?.label} required />
        <NumberField
          label="Значення"
          name="value"
          defaultValue={stat?.value ?? 0}
          step="any"
          required
        />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <TextField label="Суфікс" name="suffix" defaultValue={stat?.suffix ?? ""} />
        <NumberField
          label="Знаків"
          name="decimals"
          defaultValue={stat?.decimals ?? 0}
          min={0}
          hint="Дробних"
        />
        <NumberField
          label="Порядок"
          name="sort_order"
          defaultValue={stat?.sort_order ?? 0}
        />
        <ToggleField
          label="Видно"
          name="is_published"
          defaultChecked={stat?.is_published ?? true}
        />
      </div>
      <div className="flex items-center gap-2 pt-3 border-t border-zinc-800">
        <button
          type="submit"
          className="bg-gold text-zinc-950 font-display text-sm px-5 py-2.5 hover:bg-gold-dim transition-colors"
        >
          {submitLabel}
        </button>
        {stat && (
          <form action={deleteStat} className="ml-auto">
            <input type="hidden" name="id" value={stat.id} />
            <button
              type="submit"
              className="flex items-center gap-1.5 text-sm text-red-400 hover:text-red-300 transition-colors px-3 py-2"
              aria-label="Видалити"
            >
              <Trash size={14} />
              <span className="hidden sm:inline">Видалити</span>
            </button>
          </form>
        )}
      </div>
    </form>
  );
}

export default async function StatsPage() {
  const supabase = createSupabaseServerClient();
  const { data } = await supabase
    .from("stats")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("id", { ascending: true });
  const stats = (data ?? []) as StatRow[];

  return (
    <>
      <PageHeader
        title="Статистика"
        description="Цифри в секції з лічильниками."
      />
      <div className="px-4 sm:px-6 lg:px-10 py-6 lg:py-8 flex flex-col gap-6 max-w-5xl">
        <section className="flex flex-col gap-3">
          <h2 className="text-xs uppercase tracking-widest text-zinc-500">
            Існуючі ({stats.length})
          </h2>
          {stats.length === 0 ? (
            <p className="text-zinc-500 text-sm">Поки що немає статистики.</p>
          ) : (
            stats.map((s) => (
              <StatEditor
                key={s.id}
                stat={s}
                action={updateStat.bind(null, s.id)}
                submitLabel="Оновити"
              />
            ))
          )}
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xs uppercase tracking-widest text-zinc-500">Додати нову</h2>
          <StatEditor action={createStat} submitLabel="Додати" />
        </section>
      </div>
    </>
  );
}
