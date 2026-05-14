import { motion } from "motion/react";
import { Brain, Smile, ShieldCheck, Zap, Activity } from "lucide-react";

export default function BrainSports() {
  const benefits = [
    { text: "التقليل من التوتر والاكتئاب", icon: Smile, color: "bg-orange-100 text-orange-600", delay: 0.1 },
    { text: "زيادة إفراز هرمون السعادة الذي يحسن المزاج", icon: Sparkles, color: "bg-rose-100 text-rose-600", delay: 0.2 },
    { text: "رفع الثقة بالنفس والطاقة الإيجابية", icon: Zap, color: "bg-purple-100 text-purple-600", delay: 0.3 },
    { text: "الحفاظ على صحة الدماغ ونشاطه", icon: Brain, color: "bg-blue-100 text-blue-600", delay: 0.4 },
    { text: "تحسين الأداء في المذاكرة والتعلم", icon: ShieldCheck, color: "bg-teal-100 text-teal-600", delay: 0.5 },
    { text: "زيادة النشاط والحيوية اليومية", icon: Activity, color: "bg-green-100 text-green-600", delay: 0.6 }
  ];

  return (
    <div className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-slate-100 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary-50 rounded-full blur-3xl opacity-60 -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="text-center mb-10 relative z-10">
        <h3 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-rose-500 mb-3">
          تأثير الرياضة على الدماغ
        </h3>
        <p className="text-slate-600 max-w-lg mx-auto">
          أثبتت الرياضة فعاليتها وأثرها الإيجابي على صحتك وحيويتك!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        {benefits.map((benefit, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: benefit.delay, duration: 0.5 }}
            className="flex flex-col items-center text-center p-6 rounded-2xl bg-slate-50 hover:bg-white hover:shadow-md transition-all duration-300 border border-slate-100 hover:border-slate-200 group"
          >
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${benefit.color}`}>
              <benefit.icon size={28} />
            </div>
            <div className="w-8 h-1 bg-slate-200 rounded-full mb-4 group-hover:bg-primary-300 transition-colors"></div>
            <p className="font-semibold text-slate-700 leading-snug">{benefit.text}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function Sparkles(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
    </svg>
  );
}
