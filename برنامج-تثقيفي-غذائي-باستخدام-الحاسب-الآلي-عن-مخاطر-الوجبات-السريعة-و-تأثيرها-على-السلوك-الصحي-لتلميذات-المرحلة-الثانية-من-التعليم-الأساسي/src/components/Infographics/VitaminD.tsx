import { motion } from "motion/react";
import { Sun, Bone, Droplets, Utensils, AlertCircle } from "lucide-react";

export default function VitaminD() {
  return (
    <div className="bg-amber-50 rounded-3xl p-6 md:p-10 shadow-sm border border-amber-100 relative overflow-hidden">
      <div className="absolute -top-10 -right-10 text-amber-300/30">
        <Sun size={200} />
      </div>

      <div className="text-center mb-10 relative z-10">
        <h3 className="text-2xl md:text-3xl font-bold text-amber-600 mb-3 flex items-center justify-center gap-3">
          <Sun className="text-amber-500" /> فيتامين "د" <Sun className="text-amber-500" />
        </h3>
        <p className="text-slate-600 max-w-lg mx-auto">
          فيتامين أشعة الشمس.. ضروري لنمو العظام والأسنان.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="bg-white p-6 rounded-2xl shadow-sm border border-amber-100/50"
        >
          <div className="flex items-center gap-3 mb-4 text-emerald-600">
            <Bone size={24} />
            <h4 className="font-bold text-lg">الفوائد</h4>
          </div>
          <ul className="space-y-3 text-slate-600">
            <li className="flex gap-2"><span className="text-emerald-500">•</span> يساعد القناة الهضمية في امتصاص الكالسيوم والفوسفور.</li>
            <li className="flex gap-2"><span className="text-emerald-500">•</span> مهم لنمو وتطور العظام والأسنان بشكل سليم.</li>
            <li className="flex gap-2"><span className="text-emerald-500">•</span> يعزز جهاز المناعة ويحمي من الأمراض.</li>
          </ul>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
          className="bg-white p-6 rounded-2xl shadow-sm border border-amber-100/50"
        >
          <div className="flex items-center gap-3 mb-4 text-rose-500">
            <AlertCircle size={24} />
            <h4 className="font-bold text-lg">أعراض النقص</h4>
          </div>
          <ul className="space-y-3 text-slate-600">
            <li className="flex gap-2"><span className="text-rose-400">•</span> ألم في العظام والعضلات.</li>
            <li className="flex gap-2"><span className="text-rose-400">•</span> الشعور الدائم بالوهن والتعب.</li>
            <li className="flex gap-2"><span className="text-rose-400">•</span> ضعف في نمو العظام (تأثير سلبي في مرحلة النمو).</li>
            <li className="flex gap-2"><span className="text-rose-400">•</span> تقلبات في المزاج.</li>
          </ul>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-2xl shadow-sm border border-amber-100/50"
        >
          <div className="flex items-center gap-3 mb-4 text-blue-500">
            <Utensils size={24} />
            <h4 className="font-bold text-lg">المصادر الطبيعية</h4>
          </div>
          <p className="text-sm text-slate-500 mb-4 bg-blue-50 p-2 rounded-lg">
            المصدر الرئيسي هو التعرض لأشعة الشمس المباشرة (في الأوقات الآمنة).
          </p>
          <div className="flex flex-wrap gap-2">
            {["البيض", "الحليب المدعم", "سمك السلمون والتونة", "الفطر", "كبد البقر", "الجبنة"].map((item, i) => (
              <span key={i} className="bg-slate-100 text-slate-700 px-3 py-1.5 rounded-full text-sm border border-slate-200">
                {item}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
