import { Header } from "@/containers/layout/header";
import { Footer } from "@/containers/layout/footer";
import { TabProvider } from "@/contexts/tabContext";
import { TabBar } from "@/components/ui/tabBar";
import { TabContent } from "@/components/ui/tabContent";

export default function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TabProvider>
      <div className="min-h-screen bg-background flex flex-col">
        <Header />

        {/* Tab Bar - Header'ın hemen altında */}
        <TabBar />

        {/* Main Content - Tab Content veya Children */}
        <main className="flex-1 flex flex-col">
          <TabContent />
        </main>

        <Footer />
      </div>
    </TabProvider>
  );
}
