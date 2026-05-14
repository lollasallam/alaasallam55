import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Home, BookOpen, Activity, UserCheck, Sprout, Users, Brain, ShieldCheck } from "lucide-react";
import { cn } from "../lib/utils";

const menuItems = [
  { path: "/", label: "الرئيسية", icon: Home, color: "text-slate-600" },
  { path: "/theme/nutritional-health", label: "الصحة الغذائية", icon: Activity, color: "text-emerald-600" },
  { path: "/theme/personal-behavior", label: "السلوك الشخصي", icon: UserCheck, color: "text-teal-600" },
  { path: "/theme/environmental-health", label: "البيئة والغذاء", icon: Sprout, color: "text-emerald-700" },
  { path: "/theme/community-health", label: "المجتمع والغذاء", icon: Users, color: "text-teal-700" },
  { path: "/theme/psychological-health", label: "الصحة النفسية", icon: Brain, color: "text-emerald-500" },
  { path: "/theme/preventive-health", label: "الصحة الوقائية", icon: ShieldCheck, color: "text-teal-500" },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 right-4 z-50 p-2 bg-white rounded-full shadow-md lg:hidden text-primary-600"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-primary-900/20 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed top-0 right-0 z-40 w-72 h-screen transition-transform bg-white border-l border-primary-100 shadow-xl",
          isOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"
        )}
      >
        <div className="h-full px-4 py-8 overflow-y-auto bg-gradient-to-b from-white to-primary-50">
          <Link to="/" className="flex items-center justify-center mb-10 gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white shadow-lg shadow-primary-200">
              <BookOpen size={28} />
            </div>
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-l from-primary-600 to-primary-800">
              صحتي في غذائي
            </span>
          </Link>

          <div className="space-y-2">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 font-medium",
                    isActive
                      ? "bg-primary-100 text-primary-800 shadow-sm border border-primary-200/50"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  )}
                >
                  <div className={cn(
                    "p-2 rounded-xl transition-colors",
                    isActive ? "bg-white shadow-sm" : "bg-slate-100"
                  )}>
                    <item.icon size={20} className={isActive ? item.color : "text-slate-500"} />
                  </div>
                  <span className="text-[1.05rem]">{item.label}</span>
                </Link>
              );
            })}
          </div>
          
          <div className="mt-12 p-5 bg-white rounded-2xl shadow-sm border border-primary-100 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-l from-primary-400 to-secondary-400"></div>
            <p className="text-sm text-slate-500 leading-relaxed relative z-10 text-center">
              برنامج تثقيفي غذائي باستخدام الحاسب الآلي لتلميذات المرحلة الإعدادية.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
