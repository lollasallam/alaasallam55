import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GraduationCap, UserCog, ArrowLeft, CheckCircle2, Apple, HeartPulse } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import { logInteraction } from "../lib/InteractionService";

export default function Welcome() {
  const navigate = useNavigate();
  const [studentName, setStudentName] = useState("");
  const [showStudentInput, setShowStudentInput] = useState(false);
  const [showResearcherInput, setShowResearcherInput] = useState(false);
  const [researcherPassword, setResearcherPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  const handleStudentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (studentName.trim().length > 0) {
      localStorage.setItem("studentName", studentName.trim());
      // Log interaction in the background, do not block the navigation
      logInteraction('system', 'تسجيل دخول التلميذة').catch(err => {
        console.error("error logging interaction", err);
      });
      navigate('/student');
    }
  };

  const handleResearcherSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (researcherPassword.trim() === "alaa2025") {
      localStorage.setItem("isResearcherAuthenticated", "true");
      navigate('/dashboard');
    } else {
      setPasswordError(true);
    }
  };

  return (
    <div className="min-h-[100dvh] bg-slate-50 flex flex-col p-2 sm:p-8 dir-rtl relative overflow-x-hidden overflow-y-auto justify-center">
      {/* Background Official Grid */}
      <div className="absolute inset-0 z-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none fixed"></div>

      <div className="relative z-10 w-full max-w-5xl mx-auto my-auto space-y-3 sm:space-y-8 py-2 sm:py-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-2 sm:space-y-6"
        >
          <div className="inline-flex items-center justify-center gap-2 sm:gap-3 bg-white border border-slate-200 px-3 sm:px-5 py-1 sm:py-2 rounded-full shadow-sm text-slate-700">
            <Apple className="text-emerald-700 w-3 h-3 sm:w-4 sm:h-4" />
            <span className="font-bold tracking-wide text-[10px] sm:text-sm">صحتي في غذائي</span>
            <HeartPulse className="text-emerald-700 w-3 h-3 sm:w-4 sm:h-4" />
          </div>

          <h1 className="text-base sm:text-3xl lg:text-4xl font-extrabold text-slate-800 leading-[1.4] sm:leading-[1.5] max-w-4xl mx-auto px-2">
            برنامج تثقيفي غذائي باستخدام الحاسب الآلي<br className="hidden sm:block"/>
            <span className="mt-1 sm:mt-2 block pb-0 sm:pb-2 text-sm sm:text-3xl lg:text-4xl text-slate-700">
              عن مخاطر الوجبات السريعة وتأثيرها على السلوك الصحي
            </span>
            <span className="block text-xs sm:text-2xl mt-1 sm:mt-2 text-emerald-700">
              لتلميذات المرحلة الأساسية
            </span>
          </h1>

          <div className="bg-white border border-slate-200 rounded-xl sm:rounded-2xl p-2 sm:p-6 text-slate-800 max-w-2xl mx-auto shadow-sm">
            <p className="text-emerald-700 font-bold mb-1 sm:mb-3 text-sm sm:text-lg tracking-wide">جامعة طنطا - كلية علوم الرياضة</p>
            <p className="text-slate-500 font-medium mb-2 sm:mb-4 text-[8px] sm:text-xs uppercase tracking-widest hidden sm:block">إشـــراف</p>
            <div className="flex flex-row items-center justify-center gap-2 sm:gap-8 text-slate-800 font-bold text-[10px] sm:text-lg">
              <p className="flex items-center gap-1.5 sm:gap-2 bg-slate-50 py-1.5 sm:py-2 px-3 sm:px-5 rounded-lg w-full sm:w-auto justify-center border border-slate-200">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-slate-400"></span> 
                أ.د / مسعود كمال غرابة
              </p>
              <p className="flex items-center gap-1.5 sm:gap-2 bg-slate-50 py-1.5 sm:py-2 px-3 sm:px-5 rounded-lg w-full sm:w-auto justify-center border border-slate-200">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-slate-400"></span> 
                أ.م.د / عايدة أبو السعود نصر
              </p>
            </div>
          </div>
        </motion.div>

        {/* Portals */}
        <div className="grid md:grid-cols-2 gap-3 sm:gap-6 w-full max-w-3xl mx-auto">
          {/* Student Portal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="group flex flex-col h-full bg-white p-3 sm:p-6 rounded-2xl sm:rounded-[1.5rem] shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100 hover:border-emerald-200 sm:hover:-translate-y-2">
              <div className="hidden sm:flex w-12 h-12 sm:w-20 sm:h-20 bg-gradient-to-br from-emerald-100 to-green-200 text-emerald-600 rounded-xl sm:rounded-[1.2rem] items-center justify-center mx-auto mb-2 sm:mb-4 shadow-inner group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                <GraduationCap className="w-6 h-6 sm:w-10 sm:h-10" strokeWidth={1.5} />
              </div>
              <h2 className="text-sm sm:text-2xl font-bold text-slate-800 mb-1 sm:mb-3 text-center group-hover:text-emerald-600 transition-colors">دخول التلميذة</h2>
              <p className="text-slate-600 mb-2 sm:mb-6 text-center leading-relaxed text-[10px] sm:text-base pb-0 sm:pb-2">
                اكتشفي أسرار الغذاء الصحي السليم، وتعرفي على خفايا الوجبات السريعة!
              </p>

              <div className="mt-auto">
                <AnimatePresence mode="wait">
                  {showStudentInput ? (
                    <motion.form 
                      key="inputForm"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      onSubmit={handleStudentSubmit} 
                      className="flex flex-col gap-2 sm:gap-3"
                    >
                      <input
                        autoFocus
                        type="text"
                        placeholder="اسم التلميذة (ثلاثي)"
                        title="يرجى كتابة اسمك الثلاثي"
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 outline-none transition-all text-slate-800 bg-slate-50 focus:bg-white text-center font-bold text-[10px] sm:text-base"
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        required
                      />
                      <button type="submit" className="inline-flex items-center justify-center gap-1.5 sm:gap-2 text-white font-bold bg-emerald-500 w-full py-2 sm:py-3 rounded-lg sm:rounded-xl hover:bg-emerald-600 transition-all shadow-sm sm:shadow-lg shadow-emerald-500/30 disabled:opacity-50 disabled:cursor-not-allowed text-[10px] sm:text-base overflow-hidden relative group/btn" disabled={studentName.trim().length === 0}>
                          <span className="relative z-10">متابعة الدخول</span>
                          <CheckCircle2 size={14} className="relative z-10 sm:w-5 sm:h-5" />
                          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"></div>
                      </button>
                    </motion.form>
                  ) : (
                    <motion.button 
                      key="startButton"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={() => setShowStudentInput(true)} 
                      className="inline-flex items-center justify-center gap-1.5 sm:gap-2 text-white font-bold bg-emerald-500 w-full py-2 sm:py-4 rounded-lg sm:rounded-xl group-hover:bg-emerald-600 transition-all shadow-sm sm:shadow-lg shadow-emerald-500/30 text-[10px] sm:text-base overflow-hidden relative group/btn"
                    >
                        <span className="relative z-10">ابدئي الرحلة الآن</span>
                        <ArrowLeft size={14} className="relative z-10 sm:w-5 sm:h-5 group-hover:-translate-x-1 transition-transform" />
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"></div>
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* Researcher Portal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="group flex flex-col h-full bg-white p-3 sm:p-6 rounded-2xl sm:rounded-[1.5rem] shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100 hover:border-blue-200 sm:hover:-translate-y-2">
              <div className="hidden sm:flex w-12 h-12 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-100 to-indigo-200 text-blue-600 rounded-xl sm:rounded-[1.2rem] items-center justify-center mx-auto mb-2 sm:mb-4 shadow-inner group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300">
                <UserCog className="w-6 h-6 sm:w-10 sm:h-10" strokeWidth={1.5} />
              </div>
              <h2 className="text-sm sm:text-2xl font-bold text-slate-800 mb-1 sm:mb-3 text-center group-hover:text-blue-600 transition-colors">دخول الباحثة</h2>
              <p className="text-slate-600 mb-2 sm:mb-6 text-center leading-relaxed text-[10px] sm:text-base pb-0 sm:pb-2">
                متابعة سجلات الاستخدام وتحليل بيانات النشاط.
              </p>
              
              <div className="mt-auto w-full">
                <AnimatePresence mode="wait">
                  {showResearcherInput ? (
                    <motion.form 
                      key="researcherForm"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      onSubmit={handleResearcherSubmit} 
                      className="flex flex-col gap-2 sm:gap-3"
                    >
                      <input
                        autoFocus
                        type="password"
                        placeholder="كلمة المرور"
                        className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl border ${passwordError ? 'border-red-500 focus:ring-red-500/10' : 'border-slate-200 focus:border-blue-500 focus:ring-blue-500/10'} focus:ring-2 outline-none transition-all text-slate-800 bg-slate-50 focus:bg-white text-center font-bold text-[10px] sm:text-base`}
                        value={researcherPassword}
                        onChange={(e) => {
                          setResearcherPassword(e.target.value);
                          setPasswordError(false);
                        }}
                        required
                      />
                      {passwordError && <p className="text-red-500 text-[10px] sm:text-xs text-center">كلمة المرور غير صحيحة</p>}
                      <button type="submit" className="inline-flex items-center justify-center gap-1.5 sm:gap-2 text-white font-bold bg-slate-800 w-full py-2 sm:py-3 rounded-lg sm:rounded-xl hover:bg-blue-600 transition-all shadow-sm sm:shadow-lg shadow-slate-800/30 group-hover:shadow-blue-600/30 text-[10px] sm:text-base overflow-hidden relative group/btn" disabled={researcherPassword.length === 0}>
                          <span className="relative z-10">تأكيد الدخول</span>
                          <CheckCircle2 size={14} className="relative z-10 sm:w-5 sm:h-5" />
                          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"></div>
                      </button>
                    </motion.form>
                  ) : (
                    <motion.button 
                      key="startResearcherButton"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={() => setShowResearcherInput(true)} 
                      className="inline-flex items-center justify-center gap-1.5 sm:gap-2 text-white font-bold bg-slate-800 w-full py-2 sm:py-4 rounded-lg sm:rounded-xl hover:bg-blue-600 transition-all shadow-sm sm:shadow-lg shadow-slate-800/30 text-[10px] sm:text-base overflow-hidden relative group/btn"
                    >
                        <span className="relative z-10">استعراض البيانات</span>
                        <ArrowLeft size={14} className="relative z-10 sm:w-5 sm:h-5 group-hover:-translate-x-1 transition-transform" />
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"></div>
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
