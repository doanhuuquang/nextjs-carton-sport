import { ModeSwitch } from "@/components/shared/mode-switch";
import ShopCart from "@/components/shared/app-cart";
import ShopLogo from "@/components/shared/app-logo";
import { AppMenuMobile } from "@/components/shared/app-menu-mobile";
import ShopNav from "@/components/shared/app-nav";
import { AppSearch } from "@/components/shared/app-search";
import AppTopbar from "@/components/shared/app-topbar";
import UserAccount from "@/components/shared/user-account";

export default function AppHeader() {
  return (
    <div className="w-full bg-background sticky -top-12 z-50 border-b">
      {/* Top bar */}
      <AppTopbar />

      <header className="w-full max-w-7xl h-20 p-3 mx-auto flex items-center justify-between">
        <ShopLogo className="lg:w-56 w-40" />
        <ShopNav className="lg:flex hidden" />
        <div className="flex items-center gap-6">
          <div className="hidden lg:block">
            <ModeSwitch />
          </div>
          <AppSearch />
          <ShopCart />
          <UserAccount className="lg:flex hidden" />
          <div className="lg:hidden">
            <AppMenuMobile />
          </div>
        </div>
      </header>
    </div>
  );
}
