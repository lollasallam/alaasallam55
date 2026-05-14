import { motion } from "motion/react";
import { Smile, Moon, Dumbbell, HeartPulse, BrainCircuit, ShieldAlert } from "lucide-react";

export default function WalkingBenefits() {
  const benefits = [
    { text: "يحسن الصحة النفسية ويمد بالطاقة ويزيد الإبداع", icon: Smile },
    { text: "يعزز جودة النوم والراحة", icon: Moon },
    { text: "يزيد اللياقة البدنية وقوة العضلات", icon: Dumbbell },
    { text: "يمنحك حياة صحية مديدة ونشيطة", icon: HeartPulse },
    { text: "يحافظ على صحة الدماغ ووظائف المعرفة", icon: BrainCircuit },
    { text: "يقوّي مناعة الجسم ضد الأمراض", icon: ShieldAlert }
  ];

  return (
    <div className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-3xl p-6 md:p-10 shadow-lg text-white overflow-hidden relative">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

      <div className="text-center mb-10 relative z-10">
        <h3 className="text-3xl md:text-4xl font-extrabold mb-4 drop-shadow-md">
          فوائد المشي
        </h3>
        <p className="text-blue-100 max-w-lg mx-auto text-lg">
          خطوات بسيطة يومياً تصنع فارقاً كبيراً في صحتك الجسدية والنفسية.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 relative z-10 max-w-4xl mx-auto">
        {benefits.map((benefit, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
            className="flex items-center gap-4 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all group"
          >
            <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-blue-600 shadow-inner flex-shrink-0 group-hover:scale-110 transition-transform">
              <benefit.icon size={26} />
            </div>
            <p className="font-semibold text-lg leading-tight">{benefit.text}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
