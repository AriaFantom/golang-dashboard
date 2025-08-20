import { Sidebar } from "@/components/layouts/sidebar";

export default function PanelLayout({ children }) {
  return (
    <section className="flex">
      <Sidebar />
      <div className="w-full">{children}</div>
    </section>
  );
}
