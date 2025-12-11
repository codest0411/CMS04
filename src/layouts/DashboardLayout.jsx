import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LogOut, Shield, PanelLeft, LayoutGrid } from 'lucide-react';
import { useAuthStore } from '../store/authStore.js';
import { useMemo, useState } from 'react';

const navItems = [
  { label: 'Overview', path: '/', icon: LayoutGrid },
  { label: 'About', path: '/about', icon: Shield },
  { label: 'Skills', path: '/skills', icon: PanelLeft },
  { label: 'Projects', path: '/projects', icon: PanelLeft },
  { label: 'Blogs', path: '/blogs', icon: PanelLeft },
  { label: 'Experience', path: '/experience', icon: PanelLeft },
  { label: 'Education', path: '/education', icon: PanelLeft },
  { label: 'Awards & Certificates', path: '/achievements', icon: PanelLeft },
  { label: 'Services', path: '/services', icon: PanelLeft },
  { label: 'Messages', path: '/messages', icon: PanelLeft },
];

const DashboardLayout = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const initials = useMemo(
    () =>
      user?.email
        ? user.email
            .split('@')[0]
            .slice(0, 2)
            .toUpperCase()
        : 'AD',
    [user?.email]
  );

  return (
    <div className="relative min-h-screen bg-base-dark text-white">
      <div className="absolute inset-0 bg-mesh opacity-60 pointer-events-none" />
      <div className="relative flex h-screen overflow-hidden">
        <aside
          className={`transition-all duration-300 bg-black/30 backdrop-blur-xl border-r border-white/10 ${
            collapsed ? 'w-20' : 'w-64'
          } hidden md:flex flex-col`}
        >
          <div className="p-6 flex items-center gap-3 border-b border-white/10">
            <button
              type="button"
              onClick={() => setCollapsed((prev) => !prev)}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition"
            >
              <PanelLeft className="size-5" />
            </button>
            {!collapsed && (
              <div>
                <p className="uppercase tracking-[0.3em] text-xs text-neon-green">Chirag</p>
                <h1 className="font-display text-xl">Portfolio CMS</h1>
              </div>
            )}
          </div>
          <nav className="flex-1 px-3 py-6 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-2xl transition ${
                      isActive
                        ? 'bg-white/15 text-white shadow-glow'
                        : 'text-white/70 hover:bg-white/5'
                    }`
                  }
                  end={item.path === '/'}
                >
                  <Icon className="size-4 shrink-0" />
                  {!collapsed && <span className="font-medium">{item.label}</span>}
                </NavLink>
              );
            })}
          </nav>
          <div className="p-6 border-t border-white/10">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-2xl bg-white/10 flex items-center justify-center font-semibold">
                {initials}
              </div>
              {!collapsed && (
                <div>
                  <p className="text-sm text-white/60">Signed in as</p>
                  <p className="font-medium">{user?.email}</p>
                </div>
              )}
            </div>
            <button
              type="button"
              onClick={() => {
                logout();
                navigate('/login');
              }}
              className="mt-4 w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-sm font-semibold py-2 rounded-xl transition"
            >
              <LogOut className="size-4" />
              {!collapsed && 'Logout'}
            </button>
          </div>
        </aside>

        <main className="flex-1 relative overflow-y-auto px-4 md:px-8 py-6">
          <div className="md:hidden mb-4">
            <button
              type="button"
              onClick={() => setIsMobileNavOpen((prev) => !prev)}
              className="px-4 py-2 rounded-full bg-white/10 text-sm font-semibold"
            >
              {isMobileNavOpen ? 'Close menu' : 'Open menu'}
            </button>
          </div>
          {isMobileNavOpen && (
            <nav className="md:hidden mb-4 rounded-3xl border border-white/10 bg-black/40 backdrop-blur px-3 py-3 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2 rounded-2xl text-sm transition ${
                        isActive
                          ? 'bg-white/15 text-white shadow-glow'
                          : 'text-white/70 hover:bg-white/5'
                      }`
                    }
                    end={item.path === '/'}
                    onClick={() => setIsMobileNavOpen(false)}
                  >
                    <Icon className="size-4 shrink-0" />
                    <span className="font-medium">{item.label}</span>
                  </NavLink>
                );
              })}
            </nav>
          )}
          <div className="rounded-[32px] border border-white/10 bg-black/30 backdrop-blur-2xl p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
