import { notFound } from "next/navigation";
import PageHeader from "../../../_components/PageHeader";
import ProjectForm from "../../../_components/ProjectForm";
import { updateProject, deleteProject } from "../../../actions/projects";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { listPublicGallery } from "@/lib/gallery";
import type { ProjectRow } from "@/lib/supabase";

export default async function EditProjectPage({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  if (!Number.isFinite(id)) notFound();

  const supabase = createSupabaseServerClient();
  const { data } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (!data) notFound();

  const project = data as ProjectRow;
  const gallery = listPublicGallery();

  const updateAction = updateProject.bind(null, id);
  const deleteAction = deleteProject.bind(null, id);

  return (
    <>
      <PageHeader
        title={project.name || "Редагування проекту"}
        description={`Slug: ${project.slug}`}
      />
      <ProjectForm
        initial={project}
        gallery={gallery}
        action={updateAction}
        cancelHref="/admin/projects"
        destructiveAction={deleteAction}
      />
    </>
  );
}
