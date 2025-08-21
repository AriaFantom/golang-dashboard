import { Sidebar } from "@/components/layouts/sidebar";

export default function PanelLayout({ children }) {
  return (
    <section className="min-h-screen">
      <Sidebar />
      <div className="w-full pl-[var(--sidebar-width)] md:pl-[var(--sidebar-width)]">
        {children}
      </div>
    </section>
  );
}
