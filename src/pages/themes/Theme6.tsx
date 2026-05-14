import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, AlertCircle, PlayCircle, HelpCircle } from "lucide-react";
import WalkingBenefits from "../../components/Infographics/WalkingBenefits";
import VitaminD from "../../components/Infographics/VitaminD";

export default function Theme6() {
  const [activeTab, setActiveTab] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);

  const tabs = [
    { title: "الغذاء درعك الواقي" },
    { title: "خطوات واقية ومناعة قوية" },
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
                ? "bg-white text-teal-600 shadow-sm border border-teal-100"
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
            className="space-y-10"
          >
            <div className="bg-teal-50 p-8 rounded-3xl border border-teal-100">
              <h2 className="text-3xl font-bold text-teal-800 mb-6 border-r-4 border-teal-500 pr-4">
                ما هي الصحة الوقائية الغذائية؟
              </h2>

              <div className="bg-white rounded-2xl p-6 border border-teal-100 mb-6 shadow-sm">
                <h3 className="text-2xl font-bold text-teal-800 mb-3 flex items-center gap-2">
                  <span>🛡️</span> سادساً: الصحة الوقائية والغذاء
                </h3>
                <p className="text-slate-700 leading-relaxed text-lg">
                  الوقاية خير من العلاج، وأحسن وقاية هي الأكل الصحي من صغرك. التغذية السليمة بتحميكي من أمراض كتير ممكن تأثر على حياتك في المستقبل زي السمنة ومرض السكر والأنيميا وضغط الدم. لما تاكلي خضروات خضرا وبقوليات وفاكهة طازجة، بتديي جسمك الحديد والفيتامينات اللي بتحميه من الأنيميا وضعف التركيز. التقليل من الدهون المشبعة والملح الزيادة بيحمي قلبك وأوعيتك الدموية من دلوقتي وانتي صغيرة. الأطعمة الطبيعية مليانة مضادات أكسدة وفيتامينات بتقوي جهازك المناعي وتخليكي أقل عرضة للمرض. مش لازم تغيري كل حاجة دفعة واحدة، كفاية تبدأي بخطوة صغيرة كل يوم. صحتك مش حظ، هي قرار بتاخديه كل ما تختاري أكلك. اختاري صح عشان تعيشي حياة أحسن وأسعد! 🥦
                </p>
              </div>

              <p className="text-teal-900/80 text-xl leading-relaxed font-medium">
                تُعنى الصحة الوقائية باستخدام <strong className="text-teal-700 bg-teal-200/50 px-2 rounded-lg">الغذاء السليم</strong> كوسيلة أساسية للوقاية من الأمراض. عبر اتباع نمط غذائي متوازن منذ الصغر، فإنك تبنين درعاً يحمي جسمك من الكثير من المشكلات الصحية طوال حياتك!
              </p>
            </div>

            <div className="my-8 rounded-3xl overflow-hidden bg-slate-100 shadow-md flex justify-center">
              <img src="https://i.ibb.co/SXTgnrzz/IMG-6409-jpg.jpg" alt="صحتي في صحني" className="w-full h-auto object-contain max-h-[70vh]" />
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:-translate-y-2 transition-transform">
                <div className="w-16 h-16 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center text-3xl mb-6">🩸</div>
                <h3 className="font-bold text-slate-800 text-xl mb-3">الوقاية من الأنيميا</h3>
                <p className="text-slate-600 text-sm leading-relaxed">تُعد من المشكلات الشائعة خصوصا بين المراهقات. تُعالج بتناول الأغذية الغنية بالحديد (كالورقيات القاتمة واللحوم والبقوليات) مع فيتامين ج (كالليمون) لامتصاص أفضل.</p>
              </div>

              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:-translate-y-2 transition-transform">
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center text-3xl mb-6">🩺</div>
                <h3 className="font-bold text-slate-800 text-xl mb-3">الوقاية من السكري</h3>
                <p className="text-slate-600 text-sm leading-relaxed">الاعتدال في تناول السكريات والنشويات يمنع تذبذب مستوى السكر بالدم، ويقيكِ من إرهاق البنكرياس وخطر الإصابة بمرض السكري من النوع الثاني على المدى الطويل.</p>
              </div>

              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:-translate-y-2 transition-transform">
                <div className="w-16 h-16 bg-yellow-100 text-yellow-600 rounded-2xl flex items-center justify-center text-3xl mb-6">⚖️</div>
                <h3 className="font-bold text-slate-800 text-xl mb-3">الوقاية من السمنة</h3>
                <p className="text-slate-600 text-sm leading-relaxed">الابتعاد عن الوجبات السريعة الغنية بالدهون والسكريات هو خط الدفاع الأول ضد السمنة، والتي تعد المفتاح المباشر ومسبباً لأمراض أخرى كالضغط وأمراض القلب.</p>
              </div>
            </div>

            <VitaminD />

          </motion.div>
        ) : activeTab === 1 ? (
          <motion.div
            key="page2"
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            className="space-y-10"
          >
            <h2 className="text-3xl font-bold text-slate-800 mb-8 border-r-4 border-teal-500 pr-4">
              خطوات عملية نحو مناعة أقوى وحياة صحية
            </h2>
            
            <div className="flex flex-col lg:flex-row gap-6 items-stretch">
               <div className="flex-1 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow">
                 <div className="absolute top-0 left-0 w-2 h-full bg-rose-400"></div>
                 <div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-4">تقليل الدهون المشبعة والملح</h3>
                  <p className="text-slate-600 mb-6 leading-relaxed text-lg">
                    الوجبات السريعة تحتوي على كميات خطيرة من <strong>الملح (الصوديوم) والدهون المشبعة</strong>.
                    الإفراط فيها يضغط على القلب والكلى ويزيد مخاطر الإصابة بالأمراض المزمنة.
                  </p>
                 </div>
                 <div className="bg-rose-50 text-rose-800 p-5 rounded-2xl text-sm font-bold border border-rose-100">
                   💡 بينما يساعد تقليلهما بصورة مستمرة في الحفاظ على ضغط دم منضبط، قلب قوي، وتحسين كفاءة الجسم العامة.
                 </div>
               </div>

               <div className="flex-1 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow">
                 <div className="absolute top-0 left-0 w-2 h-full bg-emerald-400"></div>
                 <div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-4">تعزيز المناعة بالطبيعة</h3>
                  <p className="text-slate-600 mb-6 leading-relaxed text-lg">
                    تسهم الأطعمة الطبيعية غير المصنعة (مثل الفواكه والخضروات الطازجة والمكسرات) في بناء وتدريب جهازك المناعي ليكون في أقوى حالاته.
                  </p>
                 </div>
                 <div className="bg-emerald-50 text-emerald-800 p-5 rounded-2xl text-sm font-bold border border-emerald-100">
                   💡 لاحتوائها على كميات هائلة من الفيتامينات ومضادات الأكسدة التي تساعد خلايا جسمك على مقاومة الفيروسات والعدوى بشكل فعال.
                 </div>
               </div>
            </div>

            <WalkingBenefits />
            
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
              <div className="p-3 bg-teal-100 text-teal-600 rounded-xl">
                <HelpCircle size={32} />
              </div>
              <h2 className="text-3xl font-bold text-slate-800">
                اختبري معلوماتك الوقائية!
              </h2>
            </div>

            <div className="space-y-6">
              {[
                {
                  q: "كيف يمكنني حماية جسمي من الإصابة بالأنيميا (فقر الدم) عن طريق الغذاء؟",
                  ops: ["تقليل السكريات", "الاعتماد على الوجبات السريعة مرة أسبوعياً", "تناول أطعمة غنية بالحديد (مثل السبانخ واللحوم) مع ڤيتامين ج (كالليمون)"],
                  ans: 2
                },
                {
                  q: "ما هو الخطر الرئيسي لاستهلاك كميات عالية جداً من الملح الموجود بكثرة في الوجبات السريعة؟",
                  ops: ["ارتفاع ضغط الدم وإرهاق القلب والكلى", "تسوس الأسنان", "زيادة قوة العضلات"],
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
                            ? "bg-teal-50 border-teal-500 text-teal-800 font-bold" 
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
                      <span>{quizAnswers[i] === question.ans ? "رائع! الغذاء هو خط دفاعك الأول لمناعة أقوى." : "راجعي معلوماتك في القسم الأول، الصحة الوقائية مهمة جداً!"}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <button 
              onClick={() => setShowResult(true)}
              className="w-full py-4 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-bold text-lg transition-colors shadow-md"
            >
              عرض النتيجة وتقييم المعلومات
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
