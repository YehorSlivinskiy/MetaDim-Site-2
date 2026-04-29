import PageHeader from "../../../_components/PageHeader";
import ProjectForm from "../../../_components/ProjectForm";
import { createProject } from "../../../actions/projects";
import { listPublicGallery } from "@/lib/gallery";

export default function NewProjectPage() {
  const gallery = listPublicGallery();
  return (
    <>
      <PageHeader title="Новий проект" description="Заповніть поля та збережіть." />
      <ProjectForm action={createProject} cancelHref="/admin/projects" gallery={gallery} />
    </>
  );
}
