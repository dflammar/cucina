"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  LayoutDashboard,
  Images,
  MessageSquare,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard },
  { label: "Portfolio", href: "/admin/portfolio", icon: Images },
  { label: "Messages", href: "/admin/messages", icon: MessageSquare },
];

export default function AdminSidebar({ userEmail }: { userEmail: string }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <aside className="w-60 bg-charcoal flex flex-col min-h-screen flex-shrink-0">
      {/* Logo */}
      <div className="p-6 border-b border-cream/10">
        <div className="flex flex-col leading-none">
          <span className="text-xl font-black text-cream">
            Cucina <span className="text-gold">+</span>
          </span>
          <span className="text-[9px] font-medium tracking-[0.2em] uppercase text-cream/30 mt-0.5">
            Admin Panel
          </span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-0.5">
        {navItems.map(({ label, href, icon: Icon }) => {
          const isActive = href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 text-sm font-semibold transition-all duration-200 rounded-lg group",
                isActive
                  ? "bg-cream/10 text-cream"
                  : "text-cream/40 hover:bg-cream/5 hover:text-cream/80"
              )}
            >
              <Icon size={17} className={isActive ? "text-gold" : "text-cream/30 group-hover:text-cream/60"} />
              {label}
              {isActive && <ChevronRight size={13} className="ml-auto text-gold" />}
            </Link>
          );
        })}
      </nav>

      {/* User + Logout */}
      <div className="p-4 border-t border-cream/10">
        <p className="text-cream/25 text-xs mb-3 truncate px-1">{userEmail}</p>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-2.5 w-full text-sm text-cream/40 hover:text-red-400 hover:bg-red-400/5 transition-all duration-200 rounded-lg"
        >
          <LogOut size={16} />
          Sign out
        </button>
        <div className="mt-3 pt-3 border-t border-cream/10">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2 px-1 text-xs text-cream/25 hover:text-gold transition-colors"
          >
            ← View public site
          </Link>
        </div>
      </div>
    </aside>
  );
}
