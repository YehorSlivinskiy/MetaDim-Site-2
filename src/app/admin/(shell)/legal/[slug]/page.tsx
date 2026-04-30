import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowSquareOut } from "@phosphor-icons/react/dist/ssr";
import PageHeader, {
  FormShell,
  FormActions,
} from "../../../_components/PageHeader";
import {
  TextField,
  TextareaField,
  NumberField,
} from "../../../_components/Fields";
import LegalSectionsEditor from "../../../_components/LegalSectionsEditor";
import { getLegalPage } from "@/lib/db";
import { updateLegalPage } from "../../../actions/legal";

export const dynamic = "force-dynamic";

export default async function EditLegalPage({
  params,
}: {
  params: { slug: string };
}) {
  const page = await getLegalPage(params.slug);
  if (!page) notFound();

  const action = updateLegalPage.bind(null, page.slug);

  return (
    <>
      <PageHeader
        title={page.title}
        description={`/${page.slug} — публічна юридична сторінка`}
      />
      <div className="px-4 sm:px-6 lg:px-10 pt-4 max-w-4xl">
        <Link
          href={`/${page.slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-gold transition-colors"
        >
          <ArrowSquareOut size={14} />
          Відкрити публічну версію
        </Link>
      </div>
      <form action={action}>
        <FormShell>
          <TextField label="Заголовок" name="title" defaultValue={page.title} required />
          <TextareaField
            label="Короткий опис (для meta description)"
            name="description"
            defaultValue={page.description ?? ""}
            rows={2}
            hint="Використовується в SEO meta description і open graph."
          />
          <NumberField
            label="Порядок сортування"
            name="sort_order"
            defaultValue={page.sort_order}
            hint="Менше число — раніше у списку футера."
          />
          <LegalSectionsEditor name="sections" defaultValue={page.sections} />
          <FormActions cancelHref="/admin/legal" />
        </FormShell>
      </form>
    </>
  );
}
