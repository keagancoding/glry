import SiteHeader from "@/components/layouts/site-header";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex w-full flex-col overflow-hidden">{children}</main>
    </div>
  );
}
