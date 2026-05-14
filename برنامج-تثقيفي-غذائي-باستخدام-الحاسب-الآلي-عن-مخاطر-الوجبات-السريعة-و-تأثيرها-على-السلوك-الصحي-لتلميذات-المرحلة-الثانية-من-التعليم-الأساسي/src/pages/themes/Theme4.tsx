import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, AlertCircle, PlayCircle, HelpCircle } from "lucide-react";

export default function Theme4() {
  const [activeTab, setActiveTab] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);

  const tabs = [
    { title: "الغذاء والمجتمع" },
    { title: "تأثير الأصدقاء" },
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
                ? "bg-white text-blue-600 shadow-sm border border-blue-100"
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
             <h2 className="text-3xl font-bold text-slate-800 mb-6 border-r-4 border-blue-500 pr-4">
               تأثير المجتمع على عاداتنا الغذائية
            </h2>

            <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100 mb-6">
                <h3 className="text-2xl font-bold text-blue-800 mb-3 flex items-center gap-2">
                  <span>👫</span> رابعاً: الغذاء وصحة المجتمع
                </h3>
                <p className="text-slate-700 leading-relaxed text-lg">
                  الأكل مش مجرد إحساس جوع وشبع، هو سلوك اجتماعي بيتأثر بالناس من حواليكي كل يوم. في المدرسة وأوقات الفسحة، كتير من التلاميذ بياكلوا نفس اللي أصحابهم بياكلوه عشان يحسوا إنهم جزء من المجموعة. بس المشكلة إن الاختيار ده أحياناً بيكون وجبات سريعة مضرة بصحتهم من غير ما يفكروا. إنتي الشاطرة اللي تعرفي إن صحتك أهم من رأي أي حد، وإن قولة "لأ" للأكل الضار شجاعة مش ضعف. لما تختاري الأكل الصحي قدام أصحابك، بتديهم مثال حلو يقدروا يقتدوا بيه من غير ما تحسي. العادات الغذائية الصحية بتنعكس على شخصيتك وعلاقاتك وطريقة تعاملك مع الناس. مجتمع صحي بيبدأ من أفراد واعيين بيختاروا صح. كوني جزء من التغيير الإيجابي وابدأي من طبقك! 😊
                </p>
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-3xl p-8 border border-blue-100">
              <p className="text-slate-700 text-lg leading-relaxed mb-6 font-medium">
                نحن لا نأكل بمفردنا! الغذاء جزء مهم من ثقافتنا واحتفالاتنا وتجمعاتنا الأسرية. 
                ولكن، كيف تؤثر التجمعات والأصدقاء على ما نختاره لنأكله بكل تأكيد؟
              </p>
              


              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex items-start gap-4">
                  <div className="text-3xl bg-blue-100 p-2 rounded-xl text-blue-600">📺</div>
                  <div>
                    <h4 className="font-bold text-blue-700 mb-2 text-lg">الإعلانات والميديا</h4>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      الشركات تصمم إعلانات جذابة وتستخدم شخصيات مشهورة لإقناعك بشراء الوجبات السريعة رغم ضررها. تذكري أن هدفهم الربح، وليس صحتك!
                    </p>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex items-start gap-4">
                  <div className="text-3xl bg-cyan-100 p-2 rounded-xl text-cyan-600">👨‍👩‍👧‍👦</div>
                  <div>
                    <h4 className="font-bold text-cyan-700 mb-2 text-lg">الأسرة والمدرسة</h4>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      العادات التي نتعلمها في المنزل تبني أساسيات قوية لتغذية جيدة والمشاركة الإيجابية على مائدة المنزل هي أول خطوة لحياة صحية.
                    </p>
                  </div>
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
            <h2 className="text-3xl font-bold text-slate-800 mb-6 border-r-4 border-blue-500 pr-4">
              احذري من "ضغط الأقران" في الوجبات!
            </h2>
            
            <p className="text-slate-600 leading-relaxed text-lg pb-4 font-medium">
              هل حدث وأن طلبتِ وجبة سريعة فقط لأن صديقاتك فعلن ذلك؟ هذا ما يسمى بـ "ضغط الأقران". 
              من المهم أن تكون لكِ شخصية قوية وتتخذي قرارات صحيحة تفيد جسدك وصحتك، حتى لو كانت مختلفة.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-3xl p-8 border hover:-translate-y-1 transition-transform border-slate-200">
                <h3 className="font-bold text-slate-800 text-xl flex items-center gap-3 mb-4">
                  <span className="bg-rose-100 text-rose-600 p-2 rounded-xl">❌</span>
                  المجاراة العمياء
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  الخروج مع الأصدقاء ممتع جداً، ولكن الاعتماد الدائم على مطاعم الوجبات السريعة كطريقة وحيدة للقاء والتجمع يبني عادات سيئة قد تلازمك مدى الحياة. حاولي اقتراح بدائل أصح لقضاء الوقت معهن.
                </p>
              </div>

              <div className="bg-white rounded-3xl p-8 border hover:-translate-y-1 transition-transform border-slate-200">
                <h3 className="font-bold text-slate-800 text-xl flex items-center gap-3 mb-4">
                  <span className="bg-emerald-100 text-emerald-600 p-2 rounded-xl">✅</span>
                  الريادة الإيجابية
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  كوني أنتِ المؤثرة الإيجابية! بدل الخروج لمطعم وجبات سريعة، اقترحي إحضار أطباق صحية معدة منزلياً والجلوس في حديقة، أو اختيار مطاعم تقدم أطعمة مشوية وسلطات طازجة.
                </p>
              </div>
            </div>

            <div className="bg-blue-600 text-white p-8 rounded-3xl shadow-lg text-center mt-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/4"></div>
              <p className="font-bold text-xl relative z-10 leading-relaxed">
                "صحتك هي مسؤوليتك الشخصية وليست مرهونة برغبات الآخرين. 
                اختاري ما يبنيك، لا ما يناسب المجموعة فقط!"
              </p>
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
              <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
                <HelpCircle size={32} />
              </div>
              <h2 className="text-3xl font-bold text-slate-800">
                اختبري قراراتك المجتمعية!
              </h2>
            </div>

            <div className="space-y-6">
              {[
                {
                  q: "إذا قررت زميلاتك الذهاب لمطعم وجبات سريعة للاحتفال، ماذا يمكنكِ أن تفعلي لتحافظي على صحتك؟",
                  ops: ["أمتنع عن الذهاب معهن تماماً لكي لا أأكل منها", "أذهب وأشاركهم نفس الوجبة حتى لا أكون غريبة", "أذهب للاحتفال واختار من القائمة السلطة أو المشويات أو أكتفي بعصير طازج"],
                  ans: 2
                },
                {
                  q: "ماذا يقصد بـ ضغط الأقران فيما يخص الغذاء؟",
                  ops: ["أن أتناول طعاماً ضاراً بسبب رغبة من حولي وليس لاحتياجي له", "أن يضغط الطعام على معدتي", "أن أقوم بشراء الطعام بسرعة"],
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
                            ? "bg-blue-50 border-blue-500 text-blue-800 font-bold" 
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
                      <span>{quizAnswers[i] === question.ans ? "إجابة ممتازة! أنتِ تتحكمين في قراراتك برجاحة عقل." : "تذكري أن دورك هو أخذ الخيار الصحيح والمناسب لك دون خجل."}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <button 
              onClick={() => setShowResult(true)}
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-lg transition-colors shadow-md"
            >
              عرض النتيجة وتقييم المعلومات
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
