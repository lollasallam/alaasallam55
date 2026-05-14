import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, AlertCircle, PlayCircle, HelpCircle } from "lucide-react";

export default function Theme2() {
  const [activeTab, setActiveTab] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);

  const tabs = [
    { title: "الغذاء وجمالك" },
    { title: "احذري هذه المخاطر!" },
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
                ? "bg-white text-purple-600 shadow-sm border border-purple-100"
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
             <h2 className="text-3xl font-bold text-slate-800 mb-6 border-r-4 border-purple-500 pr-4">
               الغذاء السليم كسرّ لجمالك ونظافتك الشخصية
            </h2>

            <div className="bg-purple-50 rounded-2xl p-6 border border-purple-100 mb-6">
                <h3 className="text-2xl font-bold text-purple-800 mb-3 flex items-center gap-2">
                  <span>𪐥</span> ثانياً: السلوك الشخصي الغذائي
                </h3>
                <p className="text-slate-700 leading-relaxed text-lg">
                  عاداتك اليومية في الأكل بتبني جسمك وشكلك وصحتك من جوه وبره. الأكل الصحي المتوازن بيخلي جلدك نضيف وشعرك قوي وأسنانك سليمة وهضمك تمام. لما تاكلي أكل طازج وطبيعي، جسمك بيتخلص من السموم ويحس براحة وخفة. أما الوجبات السريعة المليانة سكر ودهون ومواد حافظة، بتعمل تسوس في الأسنان وآلام في المعدة وانتفاخ مزعج. كمان الإفراط في السكر بيأثر على وزنك ويرفعه من غير ما تحسي. صحتك الشخصية مسؤوليتك إنتي، ومحدش غيرك هيقرر عنك إيه اللي تاكليه. ابدأي بخطوات صغيرة زي إنك تشربي مية أكتر وتاكلي فاكهة بدل الشيبسي. العادات الصحية اللي بتبدأيها دلوقتي هتفضل معاكي طول عمرك! 🌟
                </p>
            </div>

            <div className="bg-gradient-to-r from-purple-100/50 to-indigo-100/50 rounded-3xl p-8 border border-purple-100">
              <p className="text-slate-700 text-lg leading-relaxed mb-6 font-medium">
                يُسهم الغذاء المتوازن بفعالية في الحفاظ على صحة جسمك العامة ونظافته. الغذاء الصحي لا ينعكس فقط على طاقتك بل يمتد أثره لجمال شعرك، نضارة بشرتك، وحتى نعومة أظافرك وصحة أسنانك بشكل مباشر!
              </p>
              
              <div className="my-8 rounded-3xl overflow-hidden bg-slate-100 shadow-md">
                <img src="https://i.ibb.co/39ZVr9g2/IMG-6411-jpg.jpg" alt="غذاؤك سر ثقتك بجمالك وقوتك" className="w-full h-auto object-contain max-h-[70vh]" />
              </div>

              <h3 className="text-2xl font-bold text-slate-800 mt-8 mb-4">انعكاس الغذاء على مظهرك الخارجي:</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="font-bold text-purple-600 mb-3 flex items-center gap-2 text-lg">
                    <span className="text-3xl">✨</span> بشرة نضرة وشعر صحي
                  </h4>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    الأطعمة الطبيعية الغنية بالفيتامينات مثل (فيتامين C الموجود في البرتقال والفراولة) تعزز إنتاج الكولاجين، بينما الحديد والزنك (في اللحوم والمكسرات) يعطيك شعراً قوياً ولامعاً يمنع تساقطه المزعج.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="font-bold text-indigo-600 mb-3 flex items-center gap-2 text-lg">
                    <span className="text-3xl">🛡️</span> مناعة قوية ونظافة من الداخل
                  </h4>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    شرب الماء بكميات كافية وتناول الخضراوات الورقية يعمل كغسول طبيعي للجسم، حيث يخلصه من السموم المتراكمة التي قد تسبب رائحة عرق غير محببة أو إفرازات دهنية زائدة.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ) : activeTab === 1 ? (
          <motion.div
            key="page2"
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <h2 className="text-3xl font-bold text-slate-800 mb-6 border-r-4 border-purple-500 pr-4">
              احذري! مخاطر خفية للوجبات السريعة
            </h2>
            
            <p className="text-slate-600 leading-relaxed text-lg pb-4">
              قد تبدو الوجبة السريعة مغرية وشكلها شهي، لكنها تخبئ في طياتها تأثيرات مدمرة على المدى الطويل على مظهرك وصحتك وسلوكك اليومي.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-red-50 rounded-2xl p-6 border border-red-100 hover:-translate-y-1 transition-transform">
                <div className="w-16 h-16 bg-red-200 rounded-xl flex items-center justify-center text-4xl mb-6 shadow-sm">🦷</div>
                <h3 className="font-bold text-red-800 mb-2 text-xl">تسوس الأسنان واصفرارها</h3>
                <p className="text-red-700/80 text-sm leading-relaxed">
                  السكريات المخفية بكثرة في الصلصات (كالكاتشب) والمشروبات الغازية المرافقة للوجبات السريعة تُعد بيئة خصبة للبكتيريا، مما يسبب تآكل مينا الأسنان، اصفرارها، ورائحة فم كريهة مهما قمتي بتنظيفها.
                </p>
              </div>

              <div className="bg-orange-50 rounded-2xl p-6 border border-orange-100 hover:-translate-y-1 transition-transform">
                <div className="w-16 h-16 bg-orange-200 rounded-xl flex items-center justify-center text-4xl mb-6 shadow-sm">⚖️</div>
                <h3 className="font-bold text-orange-800 mb-2 text-xl">تراكم الدهون المتمركزة</h3>
                <p className="text-orange-700/80 text-sm leading-relaxed">
                  عكس الدهون الصحية، تتخزن الدهون المهدرجة في الوجبات السريعة في مناطق مزعجة في الجسم ويصعب حرقها، مما يؤدي للبدانة المفرطة التي تؤثر على حركتك وثقتك بمظهرك الخارجي.
                </p>
              </div>

              <div className="bg-yellow-50 rounded-2xl p-6 border border-yellow-100 hover:-translate-y-1 transition-transform">
                <div className="w-16 h-16 bg-yellow-200 rounded-xl flex items-center justify-center text-4xl mb-6 shadow-sm">🤢</div>
                <h3 className="font-bold text-yellow-800 mb-2 text-xl">مشاكل الهضم والبشرة</h3>
                <p className="text-yellow-700/80 text-sm leading-relaxed">
                  افتقارها للألياف يُبطئ عملية الهضم، مما يسبب الانتفاخ والإمساك. بالإضافة للزيوت المهدرجة التي تسبب ظهور حب الشباب والبثور بشكل مستمر على بشرتك الرقيقة.
                </p>
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
              <div className="p-3 bg-purple-100 text-purple-600 rounded-xl">
                <HelpCircle size={32} />
              </div>
              <h2 className="text-3xl font-bold text-slate-800">
                اختبري معلوماتك!
              </h2>
            </div>

            <div className="space-y-6">
              {[
                {
                  q: "ما هو الفيتامين المساعد بقوة في تكوين الكولاجين لنضارة البشرة؟",
                  ops: ["فيتامين C", "الصوديوم", "الدهون المتحولة"],
                  ans: 0
                },
                {
                  q: "لماذا تسبب الوجبات السريعة ظهور حب الشباب بكثرة؟",
                  ops: ["لأنها ساخنة جداً", "بسبب احتوائها على دهون مهدرجة عالية وزيوت مقلية مكررة", "لأنها لا تحتوي على الملح"],
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
                            ? "bg-purple-50 border-purple-500 text-purple-800 font-bold" 
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
                      <span>{quizAnswers[i] === question.ans ? "إجابة صحيحة! الجمال الحقيقي يبدأ من الداخل!" : "إجابة خاطئة، راجعي قسم جمالك وغذائك."}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <button 
              onClick={() => setShowResult(true)}
              className="w-full py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold text-lg transition-colors shadow-md"
            >
              عرض النتيجة وتقييم المعلومات
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
