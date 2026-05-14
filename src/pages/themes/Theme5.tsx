import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, AlertCircle, PlayCircle, HelpCircle } from "lucide-react";

export default function Theme5() {
  const [activeTab, setActiveTab] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);

  const tabs = [
    { title: "من طبقك إلى مزاجك" },
    { title: "الأكل الواعي" },
    { title: "اختبري معلوماتك" }
  ];

  const handleQuizAnswer = (qIndex: number, aIndex: number) => {
    const newAnswers = [...quizAnswers];
    newAnswers[qIndex] = aIndex;
    setQuizAnswers(newAnswers);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-2 mb-8 bg-slate-50 p-2 rounded-2xl w-fit">
        {tabs.map((tab, idx) => (
          <button
            key={idx}
            onClick={() => setActiveTab(idx)}
            className={`px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-medium transition-all text-sm sm:text-base ${
              activeTab === idx
                ? "bg-white text-orange-600 shadow-sm border border-orange-100"
                : "text-slate-500 hover:text-slate-700 hover:bg-slate-100"
            }`}
          >
            {tab.title}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 0 ? (
          <motion.div
            key="page1"
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
             <h2 className="text-3xl font-bold text-slate-800 mb-6 border-r-4 border-orange-500 pr-4">
               تأثير الوجبات السريعة على نفسيتك ومزاجك
            </h2>

            <div className="bg-orange-50 rounded-2xl p-6 border border-orange-100 mb-6">
                <h3 className="text-2xl font-bold text-orange-800 mb-3 flex items-center gap-2">
                  <span>🧠</span> خامساً: الغذاء والصحة النفسية
                </h3>
                <p className="text-slate-700 leading-relaxed text-lg">
                  هل فكرتي يوماً إن اللي بتاكليه بيأثر على مزاجك وأحاسيسك؟ الأكل الصحي المتوازن بيساعد المخ على إفراز هرمونات السعادة اللي بتخليكي هادية ومركزة ومبسوطة. لما تاكلي خضروات وفاكهة وبروتين، دماغك بيشتغل أحسن وبتقدري تتعلمي وتحفظي بسهولة أكبر. على العكس، الوجبات السريعة والمشروبات الغازية المليانة سكر بتعمل ارتفاع سريع في السكر في الدم يعقبه هبوط مفاجئ، وده بيسبب توتر وصداع وتقلب مزاج. كمان الأكل الكتير من الدهون والمواد المضافة بيأثر على الجهاز العصبي ويزود الإحساس بالعصبية والضغط. الأكل الواعي يعني إنك تاكلي بتركيز وتحسي بالجوع الحقيقي وتوقفي لما تشبعي. ده بيخليكي محكومة في نفسك وواثقة فيها. صحتك النفسية وصحتك الجسدية وجهان لعملة واحدة، فاعتني بيهم معاً! 🍎
                </p>
            </div>
            
            <p className="text-slate-700 text-lg bg-orange-50 p-6 rounded-2xl border border-orange-100 font-medium">
              هل فكرت يوماً أن ما تأكلينه يحدد مدى سعادتك وتوترك في اليوم؟ التغذية ترتبط بقوة بصحتك النفسية وكيمياء المخ ومعدلات الاكتئاب في سن المراهقة!
            </p>

            <div className="my-8 rounded-3xl overflow-hidden bg-slate-100 shadow-md">
              <img src="https://i.ibb.co/tM27kqsR/IMG-6410-jpg.jpg" alt="عادات صغيرة تغييرات كبيرة" className="w-full h-auto object-contain max-h-[70vh]" />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white hover:-translate-y-1 transition-transform p-8 rounded-3xl border border-slate-100 shadow-sm">
                <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center text-4xl mb-4">😤</div>
                <h3 className="font-bold text-slate-800 text-xl mb-3">التوتر والعصبية (التهاب الأعصاب)</h3>
                <p className="text-slate-600 leading-relaxed">
                  الإكثار من الوجبات السريعة يؤدي لزيادة الالتهابات الدقيقة في الجسم لاحتوائها على زيوت مكررة. هذه الالتهابات قادرة على إحداث خلل في كيمياء الدماغ، مما يزيد شعورك بالتوتر السريع، والانفعال، والعصبية تجاه أبسط الأمور.
                </p>
              </div>

              <div className="bg-white hover:-translate-y-1 transition-transform p-8 rounded-3xl border border-slate-100 shadow-sm">
                <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center text-4xl mb-4">🎢</div>
                <h3 className="font-bold text-slate-800 text-xl mb-3">تقلبات المزاج (قطار السكر المعلق)</h3>
                <p className="text-slate-600 leading-relaxed">
                  تناول كميات كبيرة من السكر والدقيق الأبيض يرفع سكر الدم بقوة ثم يهوي به فجأة (Sugar Crash). هذا ההهبوط السريع يتركك في حالة نفسية محبطة، حزينة بدون سبب واضح، مصحوبة بصداع ورغبة ملحة في التهرب من الواجبات.
                </p>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-emerald-400 to-teal-500 p-8 rounded-3xl text-white shadow-lg flex flex-col md:flex-row items-center gap-6 mt-8">
              <div className="text-5xl bg-white/20 p-4 rounded-2xl">🧠</div>
              <div>
                <h4 className="text-2xl font-bold mb-2">غذاء المخ = هرمونات السعادة</h4>
                <p className="text-white/90 text-lg leading-relaxed">
                  في المقابل، الأطعمة الغنية بـ "أوميجا 3" مثل الأسماك والمكسرات تساعد المخ على إفراز هرمون "السيروتونين" (هرمون السعادة)، مما يبقيكِ هادئة، متفائلة، ومستقرة نفسياً طوال اليوم.
                </p>
              </div>
            </div>
          </motion.div>
        ) : activeTab === 1 ? (
          <motion.div
            key="page2"
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <h2 className="text-3xl font-bold text-slate-800 mb-6 border-r-4 border-orange-500 pr-4">
              ما هو "الأكل الواعي"؟ (Mindful Eating)
            </h2>

            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm relative">
              <p className="text-lg text-slate-700 leading-relaxed relative z-10 mb-8 font-medium">
                في عصر السرعة والمشتتات، كثيراً ما نأكل أمام الشاشات دون أن نشعر بطعم الطعام، وكم أكلنا! 
                يُقصد بالأكل الواعي هو حضور الذهن إثناء الأكل، وإعطاء جسمك حق الاستمتاع والتمييز الذكي بين:
              </p>

              <div className="flex flex-col md:flex-row gap-6 mb-8 relative z-10">
                <div className="flex-1 bg-amber-50 p-8 rounded-3xl border-2 border-amber-200 text-center hover:shadow-md transition-shadow">
                  <span className="block text-4xl mb-4">🍽️</span>
                  <h4 className="font-bold text-amber-800 text-xl mb-3">الجوع الفسيولوجي (الحقيقي)</h4>
                  <p className="text-slate-600 leading-relaxed">عندما تحتاج معدتك وجسمك حقاً إلى الطاقة والغذاء. يظهر بالتدريج، يتوقف عند الشبع، ويجعلك تشعرين بالرضا والطاقة بعد الانتهاء.</p>
                </div>
                
                <div className="flex items-center justify-center">
                  <div className="bg-slate-800 text-white font-bold w-12 h-12 rounded-full flex items-center justify-center text-sm shadow-lg">VS</div>
                </div>

                <div className="flex-1 bg-rose-50 p-8 rounded-3xl border-2 border-rose-200 text-center hover:shadow-md transition-shadow">
                  <span className="block text-4xl mb-4">😢</span>
                  <h4 className="font-bold text-rose-800 text-xl mb-3">الجوع العاطفي (الوهمي)</h4>
                  <p className="text-slate-600 leading-relaxed">يأتي فجأة كرغبة ملحة جداً في أكل "شيء مسكر أو مالح" هرباً من المذاكرة أو لتخفيف القلق. وغالباً ما يرافقه شعور بالذنب بعد الأكل!</p>
                </div>
              </div>

              <div className="bg-slate-800 rounded-3xl p-8 text-white shadow-md relative z-10">
                <h4 className="font-bold text-2xl mb-6 text-orange-400">تدريب عملي: خطوات الأكل الواعي</h4>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="flex gap-4">
                    <span className="text-orange-400 font-bold text-xl">1</span>
                    <p className="text-slate-300">أبعدي هاتفك المحمول أو شاشة التلفاز تماماً أثناء تناول الوجبة.</p>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-orange-400 font-bold text-xl">2</span>
                    <p className="text-slate-300">امضغي كل لقمة جيداً وتذوقي قوامها ومكوناتها بهدوء.</p>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-orange-400 font-bold text-xl">3</span>
                    <p className="text-slate-300">اسألي نفسك قبل الأكل: "هل أنا جائعة فعلاً أم أشعر بالملل؟"</p>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-orange-400 font-bold text-xl">4</span>
                    <p className="text-slate-300">توقفي عندما تشعرين بأن معدتك امتلأت بنسبة 80% (الشبع المريح).</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="page3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8 bg-slate-50 p-8 rounded-3xl"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-orange-100 text-orange-600 rounded-xl">
                <HelpCircle size={32} />
              </div>
              <h2 className="text-3xl font-bold text-slate-800">
                اختبري وعيك النفسي!
              </h2>
            </div>

            <div className="space-y-6">
              {[
                {
                  q: "شعرتِ بانزعاج شديد وضغط بسبب اقتراب الامتحانات، فتوجهتِ للمطبخ للبحث عن شوكولاتة أو رقائق بطاطس. هذا يعتبر:",
                  ops: ["جوع حقيقي (فسيولوجي) لنقص الطاقة", "أكل واعي", "جوع عاطفي للهروب من التوتر"],
                  ans: 2
                },
                {
                  q: "من آثار الانخفاض المفاجئ للسكر في الدم بعد تناول حلويات مصنعة:",
                  ops: ["الشعور بالاسترخاء والراحة النفسية", "تقلب حاد في المزاج وعصبية غير مبررة", "زيادة قوة الذاكرة"],
                  ans: 1
                }
              ].map((question, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                  <h4 className="font-bold text-lg mb-4">{i + 1}. {question.q}</h4>
                  <div className="space-y-2">
                    {question.ops.map((opt, oIdx) => (
                      <button 
                        key={oIdx}
                        onClick={() => handleQuizAnswer(i, oIdx)}
                        className={`block w-full text-right p-4 rounded-xl border transition-all ${
                          quizAnswers[i] === oIdx 
                            ? "bg-orange-50 border-orange-500 text-orange-800 font-bold" 
                            : "bg-slate-50 border-slate-100 hover:bg-slate-100 text-slate-600"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                  {showResult && quizAnswers[i] !== undefined && (
                    <div className={`mt-4 p-3 rounded-lg flex items-center gap-2 ${quizAnswers[i] === question.ans ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                      {quizAnswers[i] === question.ans ? <CheckCircle2 /> : <AlertCircle />}
                      <span>{quizAnswers[i] === question.ans ? "إجابة صحيحة! سيطرتك على وعيك تعني سيطرتك على مزاجك." : "إجابة خاطئة. حاولي التفريق دائماً بين احتياجك الحقيقي ورغبتك العاطفية!"}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <button 
              onClick={() => setShowResult(true)}
              className="w-full py-4 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-bold text-lg transition-colors shadow-md"
            >
              عرض النتيجة وتقييم المعلومات
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
