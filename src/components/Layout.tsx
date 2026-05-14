import { ReactNode } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { Apple, Home, User, ArrowRight } from "lucide-react";

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();

  const isHome = location.pathname === '/student';

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-800 dir-rtl">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm border-b border-pink-100">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-4">
            {!isHome && (
              <button 
                onClick={() => navigate(-1)} 
                className="p-1.5 sm:p-2 ml-1 sm:ml-2 bg-slate-100 hover:bg-emerald-100 text-slate-600 hover:text-emerald-600 rounded-full transition"
                title="العودة للخلف"
              >
                <ArrowRight size={20} />
              </button>
            )}
            <Link to="/student" className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 transition">
              <div className="bg-emerald-100 p-2 rounded-xl hidden sm:block">
                <Apple className="w-6 h-6" />
              </div>
              <span className="font-bold font-sans text-sm sm:text-base hidden sm:block truncate max-w-[200px] md:max-w-md lg:max-w-xl">
                برنامج تثقيفي غذائي عن مخاطر الوجبات السريعة
              </span>
              <span className="font-bold sm:hidden text-lg">صحتي في غذائي</span>
            </Link>
          </div>
          <nav className="flex items-center gap-1 sm:gap-4 shrink-0 overflow-x-auto no-scrollbar">
            <Link to="/student" className="flex items-center gap-1.5 px-2 sm:px-3 py-2 rounded-lg hover:bg-emerald-50 text-slate-600 hover:text-emerald-600 transition font-medium text-xs sm:text-base whitespace-nowrap">
              <Apple className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>المحاور</span>
            </Link>
            <Link to="/" className="flex items-center gap-1.5 px-2 sm:px-3 py-2 rounded-lg hover:bg-emerald-50 text-slate-600 hover:text-emerald-600 transition font-medium text-xs sm:text-base whitespace-nowrap">
              <Home className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>خروج</span>
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-auto py-8 text-center text-slate-500">
        <p className="max-w-3xl mx-auto px-4 text-sm leading-relaxed mb-4">
          برنامج تثقيفي غذائي باستخدام الحاسب الآلي عن مخاطر الوجبات السريعة و تأثيرها على السلوك الصحي لتلميذات المرحلة الثانية من التعليم الأساسي
        </p>
        <Link to="/dashboard" className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-primary-500 transition">
          <User size={14} />
          <span>لوحة الباحث</span>
        </Link>
      </footer>
    </div>
  );
}
