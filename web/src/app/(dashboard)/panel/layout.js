import { Navbar } from "@/components/layouts/navbar";

export default function RootPanelLayout({ children }) {
  return (
    <div className="w-full">
      <Navbar />
      {children}
    </div>
  );
}
