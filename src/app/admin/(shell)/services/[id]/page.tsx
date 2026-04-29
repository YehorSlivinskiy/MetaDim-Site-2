import { notFound } from "next/navigation";
import PageHeader from "../../../_components/PageHeader";
import ServiceForm from "../../../_components/ServiceForm";
import { updateService, deleteService } from "../../../actions/services";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { listPublicGallery } from "@/lib/gallery";
import type { ServiceRow } from "@/lib/supabase";

export default async function EditServicePage({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  if (!Number.isFinite(id)) notFound();

  const supabase = createSupabaseServerClient();
  const { data } = await supabase
    .from("services")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (!data) notFound();

  return (
    <>
      <PageHeader title={(data as ServiceRow).title || "Послуга"} description={`Slug: ${(data as ServiceRow).slug}`} />
      <ServiceForm
        initial={data as ServiceRow}
        gallery={listPublicGallery()}
        action={updateService.bind(null, id)}
        cancelHref="/admin/services"
        destructiveAction={deleteService.bind(null, id)}
      />
    </>
  );
}
