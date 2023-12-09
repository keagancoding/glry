import { navList } from "@/config";
import MainNav from "./main-nav";
import MobileNav from "./mobile-nav";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/60 backdrop-blur">
      <div className="container flex h-16 items-center">
        <MainNav items={navList} />
        <MobileNav items={navList} />
      </div>
    </header>
  );
}
