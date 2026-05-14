import { Brain, ArrowUpSquare, Smile, ShieldCheck, Sun, Bone, HeartPulse, Footprints } from "lucide-react";
import { cn } from "../lib/utils";

export default function ExtraInformation() {
  return (
    <section className="space-y-12">
      <div className="text-center space-y-2">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">معلومات إضافية هامة</h2>
        <p className="text-slate-500">مقتطفات صحية للحفاظ على نشاطك اليومي</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Brain Benefits of Exercise UI */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-blue-100 shadow-sm relative overflow-hidden">
          <div className="absolute -top-10 -right-10 opacity-5">
            <Brain className="w-64 h-64 text-blue-500" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-blue-100 p-2 rounded-xl">
                <Brain className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-800">تأثير الرياضة على الدماغ</h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: Smile, text: "التقليل من التوتر والاكتئاب", color: "text-amber-500", bg: "bg-amber-50" },
                { icon: ArrowUpSquare, text: "زيادة إفراز الإندروفين لتحسين المزاج", color: "text-rose-500", bg: "bg-rose-50" },
                { icon: ShieldCheck, text: "رفع الثقة بالنفس", color: "text-purple-500", bg: "bg-purple-50" },
                { icon: Brain, text: "الحماية من التدهور وتنشيط الذاكرة", color: "text-blue-500", bg: "bg-blue-50" },
              ].map((item, i) => (
                <div key={i} className={cn("p-4 rounded-2xl flex items-center gap-3", item.bg)}>
                  <item.icon className={cn("w-6 h-6 shrink-0", item.color)} />
                  <span className="text-sm font-semibold text-slate-700">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Vitamin D Benefits UI */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-100 shadow-sm relative overflow-hidden">
          <div className="absolute -top-10 -right-10 opacity-5">
            <Sun className="w-64 h-64 text-amber-500" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-amber-100 p-2 rounded-xl">
                <Sun className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-800">مصادر وفوائد فيتامين "د"</h3>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex-1 space-y-4">
                <p className="text-slate-600 text-sm font-medium">المصادر الطبيعية:</p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm text-slate-700"><div className="w-2 h-2 rounded-full bg-amber-400"></div>التعرض لأشعة الشمس المباشرة</li>
                  <li className="flex items-center gap-2 text-sm text-slate-700"><div className="w-2 h-2 rounded-full bg-blue-400"></div>الأسماك الدهنية (كالسالمون)</li>
                  <li className="flex items-center gap-2 text-sm text-slate-700"><div className="w-2 h-2 rounded-full bg-yellow-400"></div>البيض وزيت كبد الحوت</li>
                </ul>
              </div>
              <div className="flex-1 space-y-4">
                <p className="text-slate-600 text-sm font-medium">الفوائد:</p>
                <div className="grid grid-cols-1 gap-2">
                  <div className="bg-emerald-50 text-emerald-700 p-2 rounded-xl text-sm flex items-center gap-2">
                    <Bone className="w-4 h-4" /> صحة العظام والأسنان
                  </div>
                  <div className="bg-emerald-50 text-emerald-700 p-2 rounded-xl text-sm flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4" /> تقوية المناعة
                  </div>
                  <div className="bg-emerald-50 text-emerald-700 p-2 rounded-xl text-sm flex items-center gap-2">
                    <HeartPulse className="w-4 h-4" /> المساعدة على النمو
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits of Walking UI */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-100 shadow-sm relative overflow-hidden lg:col-span-2">
          <div className="absolute -top-10 -left-10 opacity-5">
            <Footprints className="w-64 h-64 text-emerald-500" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-emerald-100 p-2 rounded-xl">
                <Footprints className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-800">فوائد المشي للجميع</h3>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
               {[
                { title: "يحسن الصحة النفسية", desc: "يمد بالطاقة ويزيد القدرة الإبداعية" },
                { title: "يعزز جودة النوم", desc: "يساعدك على الاسترخاء والنوم بعمق" },
                { title: "يزيد اللياقة البدنية", desc: "يقوي العضلات ويحافظ على الوزن" },
                { title: "يقوّي مناعة الجسم", desc: "ويحافظ على صحة وظائف المعرفة (الدماغ)" },
              ].map((item, i) => (
                <div key={i} className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <div className="font-bold text-emerald-700 mb-1">{item.title}</div>
                  <div className="text-xs text-slate-600 leading-relaxed">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
