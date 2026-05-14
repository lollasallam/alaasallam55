import { useParams, Navigate } from "react-router-dom";
import { themesInfo } from "../data/themes";
import { motion } from "motion/react";
import { useEffect } from "react";
import { logInteraction } from "../lib/InteractionService";

export default function ThemeViewer() {
  const { themeId } = useParams<{ themeId: string }>();
  
  const theme = themesInfo.find(t => t.id === themeId);
  
  useEffect(() => {
    if (themeId) {
      logInteraction(themeId, "view_theme");
    }
  }, [themeId]);

  if (!theme) {
    return <Navigate to="/" />;
  }

  const ThemeComponent = theme.component;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`rounded-3xl p-8 md:p-12 text-white bg-gradient-to-r ${theme.gradient} shadow-lg relative overflow-hidden`}
      >
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/20 rounded-full blur-3xl"></div>
        <div className="flex items-center gap-6 relative z-10">
          <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-inner">
            <theme.icon size={40} className="text-white" />
          </div>
          <div>
            <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium mb-2 inline-block">
              {theme.shortTitle}
            </span>
            <h1 className="text-3xl md:text-5xl font-bold">{theme.title}</h1>
          </div>
        </div>
      </motion.div>

      <div className="bg-white rounded-3xl min-h-[500px] shadow-sm border border-slate-100 p-6 md:p-10">
        <ThemeComponent />
      </div>
    </div>
  );
}
