import { redirect } from "next/navigation";

export default function PanelPage({ params }) {
  // Redirect to console by default
  redirect(`/panel/${params.id}/console`);
}
