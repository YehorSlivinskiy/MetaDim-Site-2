import PageHeader from "../../../_components/PageHeader";
import ServiceForm from "../../../_components/ServiceForm";
import { createService } from "../../../actions/services";
import { listPublicGallery } from "@/lib/gallery";

export default function NewServicePage() {
  return (
    <>
      <PageHeader title="Нова послуга" />
      <ServiceForm
        action={createService}
        cancelHref="/admin/services"
        gallery={listPublicGallery()}
      />
    </>
  );
}
