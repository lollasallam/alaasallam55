import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, AlertCircle, PlayCircle, HelpCircle } from "lucide-react";

export default function Theme3() {
  const [activeTab, setActiveTab] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);

  const tabs = [
    { title: "الغذاء والبيئة" },
    { title: "كوكبنا والوجبات السريعة" },
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
                ? "bg-white text-green-600 shadow-sm border border-green-100"
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
             <h2 className="text-3xl font-bold text-slate-800 mb-4 border-r-4 border-emerald-500 pr-4">
               رحلة الغذاء من الأرض إلى مائدتك
            </h2>

            <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-100 mb-6">
                <h3 className="text-2xl font-bold text-emerald-800 mb-3 flex items-center gap-2">
                  <span>🌿</span> ثالثاً: الصحة البيئية الغذائية
                </h3>
                <p className="text-slate-700 leading-relaxed text-lg">
                  أكلك مش بس بيأثر على جسمك، لكنه بيأثر على البيئة اللي إنتي عايشة فيها كمان. الوجبات السريعة بتيجي في أكياس بلاستيك وعلب ورق وأواني معدنية، وكل دي بتتحول لزبالة بتلوث الأرض والمياه والهواء. البلاستيك بيفضل في التربة لمئات السنين من غير ما يتحلل، وده بيضر بالحيوانات والنباتات والإنسان. لما تاكلي أكل بيتي طازج، بتقللي من كمية الزبالة وبتحافظي على نظافة مدرستك وحيتك وبلدك. كمان الأكل الطازج مش بيحتاج تغليف كتير، فهو أصح لجسمك وأحسن للبيئة في نفس الوقت. فكري في الأمر: كل وجبة سريعة بتاكليها بتخلف ورا ورا أكياس وعلب بتضر بيئتك. إنتي قادرة تحمي نفسك وتحمي كوكبك في نفس الوقت بمجرد اختيار أكل صحي طبيعي. كوني البنت اللي تأثيرها إيجابي على نفسها وعلى العالم من حواليها! 🌍
                </p>
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-center bg-emerald-50/50 rounded-3xl p-8 border border-emerald-100">
              <div className="flex-1">
                <p className="text-slate-700 text-lg leading-relaxed mb-4">
                  يرتبط الغذاء ارتباطاً وثيقاً بالبيئة المحيطة. هل فكرتِ يوماً من أين يأتي طعامك؟
                  رحلة الغذاء تبدأ من الزراعة وحصاد المحاصيل، وتنتهي باستهلاكنا وتخلصنا من المخلفات الذكية.
                </p>
                <div className="bg-white p-4 rounded-xl shadow-sm text-slate-700 border border-emerald-100 inline-block font-medium">
                  🌱 كلما كان اختيارك للغذاء صحياً ومحلياً (مثل الخضار والفواكه والمصادر الطبيعية)، قللنا من الضغط على البيئة وأسهمنا في نظافتها ومكافحة التلوث البيئي الناتج عن نقله وتغليفه!
                </div>
              </div>
              <div className="w-40 h-40 bg-emerald-200 rounded-full flex items-center justify-center text-6xl shadow-inner shrink-0 group hover:bg-emerald-300 transition-colors">
                <span className="group-hover:scale-110 transition-transform">🌍</span>
              </div>
            </div>
            


            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div className="border border-emerald-200 rounded-2xl p-6 hover:shadow-md transition-shadow bg-white hover:-translate-y-1 transform">
                <h4 className="font-bold text-emerald-700 mb-3 text-lg flex items-center gap-2">
                  <CheckCircle2 /> عادات إيجابية مستدامة
                </h4>
                <p className="text-slate-600 leading-relaxed text-sm">
                  الإكثار من الأطعمة الطبيعية والمعدة منزلياً يقلل بشكل كبير من حجم المخلفات، ويحتفظ بقيمته الغذائية العالية. كما أن استخدام زمزمية الماء (القارورة القابلة لإعادة الاستخدام) بدلاً من العبوات البلاستيكية ينقذ آلاف الكائنات البحرية!
                </p>
              </div>
              <div className="border border-rose-200 rounded-2xl p-6 hover:shadow-md transition-shadow bg-white hover:-translate-y-1 transform">
                <h4 className="font-bold text-rose-700 mb-3 text-lg flex items-center gap-2">
                  <AlertCircle /> عادات سلبية مهدرة
                </h4>
                <p className="text-slate-600 leading-relaxed text-sm">
                  الاعتماد التام على الوجبات المغلفة والسريعة يؤدي إلى أطنان من الأكياس والعلب البلاستيكية التي تكدس كوكبنا وتزيد من الانبعاثات الحرارية أثناء تصنيع المواد الحافظة المضافة إليها.
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
            <h2 className="text-3xl font-bold text-slate-800 mb-6 border-r-4 border-emerald-500 pr-4">
              الوجه المظلم للوجبات السريعة على البيئة!
            </h2>
            
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-rose-50 rounded-full blur-3xl"></div>
              
              <p className="text-lg text-slate-700 mb-8 relative z-10 font-medium">
                هل تعلمين أن اختيارك لوجبة واحدة يؤثر مباشرة على البيئة المحيطة بك وبمدرستك؟ تتسبب مخلفات الوجبات السريعة بضرر بالغ على تلوث البيئة المدرسية والمجتمع بصورة عامة ويساهم في ظاهرة التغير المناخي.
              </p>

              <div className="space-y-6 relative z-10">
                <div className="flex gap-4 items-start bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:shadow-md transition-shadow">
                  <div className="bg-rose-100 p-3 rounded-xl text-3xl text-rose-600 shadow-sm">🗑️</div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-lg mb-2">صعوبة التحلل (أزمة البلاستيك)</h4>
                    <p className="text-slate-600 leading-relaxed">مواد التعبئة والتغليف البلاستيكية، والأكواب المغطاة بالبلاستيك المعالج تأخذ من 100 إلى 400 سنة لتتحلل بشكل كامل! هذا يعني أن الكوب الذي تشربين فيه مرة واحدة سيبقى في مكب النفايات لأجيال قادمة، مما يستنزف أراضي مجتمعنا.</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:shadow-md transition-shadow">
                  <div className="bg-amber-100 p-3 rounded-xl text-3xl text-amber-600 shadow-sm">🦟</div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-lg mb-2">تشويه المنظر العام وانتشار الأمراض</h4>
                    <p className="text-slate-600 leading-relaxed">رمي علب الوجبات وبقايا الأطعمة يلوث التربة والمياه ويجذب الحشرات والقوارض الناقلة للأمراض، ما يشوه المظهر الجمالي لبيئتنا ومدرستنا الجميلة، ويجعل ساحة المدرسة غير صحية.</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:shadow-md transition-shadow">
                  <div className="bg-slate-200 p-3 rounded-xl text-3xl text-slate-600 shadow-sm">🏭</div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-lg mb-2">النقل والانبعاثات الغازية</h4>
                    <p className="text-slate-600 leading-relaxed">تستورد مطاعم الوجبات السريعة موادها الأولية عبر الطائرات والسفن لمسافات طويلة جداً. هذا النقل يستهلك كميات هائلة من الوقود الأحفوري الذي يطلق غاز ثاني أكسيد الكربون الضار في الغلاف الجوي.</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-10 p-6 bg-emerald-50 rounded-2xl border border-emerald-200 text-center">
                <p className="font-bold text-emerald-800 text-xl">كوني صديقة للبيئة واحمي مدرستك بتقليل استهلاك هذه المنتجات!</p>
                <p className="text-emerald-700 mt-2">اختيارك للتفاحة اليومية لا يفيد جسمك فحسب، بل يرحم البيئة من أكياس التغليف!</p>
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
              <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl">
                <HelpCircle size={32} />
              </div>
              <h2 className="text-3xl font-bold text-slate-800">
                اختبري معلوماتك البيئية!
              </h2>
            </div>

            <div className="space-y-6">
              {[
                {
                  q: "تقريباً، ما هي المدة التي يحتاجها الكوب البلاستيكي للوجبات السريعة ليتحلل في الأرض؟",
                  ops: ["سنة واحدة فقط", "من 100 إلى 400 سنة", "لا يتحلل أبداً"],
                  ans: 1
                },
                {
                  q: "كيف تساهم الخضراوات المزروعة محلياً في حماية البيئة بشكل أفضل من الوجبات السريعة؟",
                  ops: ["لأنها لا تحتاج لتغليف بلاستيكي معقد ونقل دولي ملوث", "لأنها أغلى ثمناً", "لأنها تنضج في الشتاء فقط"],
                  ans: 0
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
                            ? "bg-emerald-50 border-emerald-500 text-emerald-800 font-bold" 
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
                      <span>{quizAnswers[i] === question.ans ? "رائعة! أنتِ بطلة البيئة!" : "حاولي مرة أخرى وتذكري أثر البلاستيك."}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <button 
              onClick={() => setShowResult(true)}
              className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-lg transition-colors shadow-md"
            >
              عرض النتيجة وتقييم المعلومات
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
