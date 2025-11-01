import { Header } from "@/containers/layout/header";
import { Footer } from "@/containers/layout/footer";

export default function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      <Footer />
    </div>
  );
}
