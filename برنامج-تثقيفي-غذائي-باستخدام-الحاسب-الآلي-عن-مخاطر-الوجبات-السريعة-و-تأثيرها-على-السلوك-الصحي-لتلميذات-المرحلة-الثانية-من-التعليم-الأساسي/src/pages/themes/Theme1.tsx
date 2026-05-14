import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import FoodPyramid from "../../components/Infographics/FoodPyramid";
import BrainSports from "../../components/Infographics/BrainSports";
import { CheckCircle2, AlertCircle, PlayCircle, HelpCircle } from "lucide-react";

export default function Theme1() {
  const [activeTab, setActiveTab] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);

  const tabs = [
    { title: "التغذية والنشاط" },
    { title: "أضرار الوجبات السريعة" },
    { title: "اختبري معلوماتك" }
  ];

  const handleQuizAnswer = (qIndex: number, aIndex: number) => {
    const newAnswers = [...quizAnswers];
    newAnswers[qIndex] = aIndex;
    setQuizAnswers(newAnswers);
  };

  return (
    <div className="space-y-8">
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-8 bg-slate-50 p-2 rounded-2xl w-fit">
        {tabs.map((tab, idx) => (
          <button
            key={idx}
            onClick={() => setActiveTab(idx)}
            className={`px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-medium transition-all text-sm sm:text-base ${
              activeTab === idx
                ? "bg-white text-pink-600 shadow-sm border border-pink-100"
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
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-10"
          >
            <div className="prose prose-lg max-w-none prose-slate">
              <h2 className="text-3xl font-bold text-slate-800 mb-6 border-r-4 border-pink-500 pr-4">
                العلاقة بين التغذية السليمة والنشاط البدني
              </h2>
              
              <div className="bg-pink-50 rounded-2xl p-6 border border-pink-100 mb-6">
                <h3 className="text-2xl font-bold text-pink-800 mb-3 flex items-center gap-2">
                  <span>🥗</span> أولاً: الصحة الغذائية
                </h3>
                <p className="text-slate-700 leading-relaxed text-lg">
                  الأكل الصحي هو الوقود الحقيقي اللي جسمك محتاجه كل يوم عشان يشتغل بكفاءة وقوة. لما تاكلي وجبات متوازنة فيها خضروات وفاكهة وبروتين وكربوهيدرات صحية، جسمك بيحصل على الطاقة اللازمة للحركة والتعلم والنشاط. الأكل الصحي بيساعد عضلاتك تكبر وعظامك تتقوى وعقلك يصحى ويركز. على العكس، الوجبات السريعة المليانة دهون وسكر بتدي جسمك طاقة وهمية بتخلصها بسرعة وتحسي بتعب وخمول. كمان الأكل غير الصحي بيأثر على تركيزك في الدراسة وأدائك في النشاط البدني. الفرق بين التلميذة النشيطة والتلميذة المتعبة أحياناً بيبدأ من طبقها على المائدة. اختاري كل يوم وجبة صحية واحدة على الأقل وهتحسي بالفرق بنفسك. صحتك هي أغلى حاجة عندك، فاهتمي بيها من دلوقتي! 💪
                </p>
              </div>

              <p className="text-slate-600 leading-relaxed text-lg">
                تُعد التغذية السليمة أساساً مهماً لممارسة النشاط البدني بكفاءة. فالغذاء هو الوقود الذي يمد جسمك بالطاقة اللازمة للحركة والنمو المستمر!
                كما تساعد العناصر الغذائية المتوازنة على تحسين أداء العضلات وزيادة رغبتك في التحمل واللعب لفترات أطول.
              </p>
              
              <div className="my-8 rounded-3xl overflow-hidden bg-slate-100 shadow-md">
                <img src="https://i.ibb.co/pBZzDSSY/16409-F42-DEDF-4966-988-F-07-CA9-C232-FAB-jpg.jpg" alt="اليوم الرياضي" className="w-full h-auto object-contain max-h-[70vh]" />
              </div>

              <h3 className="text-2xl font-bold text-slate-700 mt-8 mb-4">ما هي العناصر الغذائية الدقيقة والكبيرة؟</h3>
              <div className="grid md:grid-cols-2 gap-6 pb-6">
                <div className="bg-white border text-center border-slate-200 p-6 rounded-2xl shadow-sm">
                  <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">ك</div>
                  <h4 className="font-bold text-lg mb-2">العناصر الكبيرة (Macronutrients)</h4>
                  <p className="text-slate-600 text-sm">وهي الكربوهيدرات (مصدر الطاقة الأول)، البروتينات (لبناء العضلات والأنسجة)، والدهون الصحية (لامتصاص الفيتامينات).</p>
                </div>
                <div className="bg-white border text-center border-slate-200 p-6 rounded-2xl shadow-sm">
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">د</div>
                  <h4 className="font-bold text-lg mb-2">العناصر الدقيقة (Micronutrients)</h4>
                  <p className="text-slate-600 text-sm">مثل الفيتامينات والمعادن كالكالسيوم للطول وقوة العظام، والحديد لمنع فقر الدم والدوخة أثناء المذاكرة.</p>
                </div>
              </div>

              <div className="bg-pink-50 border border-pink-100 rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute -right-4 -top-4 text-pink-200 w-24 h-24">
                  <AlertCircle className="w-full h-full" />
                </div>
                <p className="font-medium text-pink-800 m-0 relative z-10 text-lg">
                  <strong className="text-xl block mb-2">هل تعلمين؟</strong>
                  إن تناول وجبة إفطار متوازنة تحتوي على الشوفان والفواكه يمنحك طاقة مستقرة تستمر لـ 4 ساعات، في حين أن الإفطار المكون من حلويات مصنعة يرفع طاقتك بسرعة ثم يجعلك تشعرين بالنعاس المُفاجئ في منتصف اليوم الدراسي!
                </p>
              </div>
            </div>

            <FoodPyramid />
            <BrainSports />
          </motion.div>
        ) : activeTab === 1 ? (
          <motion.div
            key="page2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <h2 className="text-3xl font-bold text-slate-800 mb-6 border-r-4 border-pink-500 pr-4">
              ماذا تفعل الوجبات السريعة بأجسامنا؟
            </h2>
            
            <p className="text-slate-600 leading-relaxed text-lg pb-4">
              الوجبات السريعة مثل مقليات الدجاج، البرجر المجهز مسبقاً، والبطاطس المقلية بالزيوت المهدرجة، 
              تعتبر قنابل موقوتة مليئة بالسعرات الحرارية <span className="font-bold text-slate-800">الفارغة</span>. 
              هذا يعني أنها تعطيك طاقة مؤقتة ضارة بدون أي فيتامينات أو معادن مفيدة.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-rose-50 rounded-2xl p-6 border border-rose-100 hover:-translate-y-1 transition-transform">
                <div className="w-16 h-16 bg-rose-200 rounded-xl flex items-center justify-center text-4xl mb-6 shadow-sm">🥱</div>
                <h3 className="font-bold text-rose-800 text-xl mb-3">تأثيرها على الخمول (السكر الكاذب)</h3>
                <p className="text-rose-700/80 text-sm leading-relaxed">
                  الإفراط في تناول الوجبات السريعة المليئة بالدهون والسكريات المعالجة يرفع نسبة السكر في الدم سريعاً، ثم يخفضه فجأة مما يسبب "انهيار الطاقة" والشعور بالتعب والكسل والخمول المفاجئ.
                </p>
              </div>

              <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100 hover:-translate-y-1 transition-transform">
                <div className="w-16 h-16 bg-amber-200 rounded-xl flex items-center justify-center text-4xl mb-6 shadow-sm">😵‍💫</div>
                <h3 className="font-bold text-amber-800 text-xl mb-3">ضعف التركيز والذاكرة</h3>
                <p className="text-amber-700/80 text-sm leading-relaxed">
                  الدهون المتحولة (Trans fats) تسد الشرايين الدقيقة التي توصل الدم للمخ. نقص تدفق الدم يجعلك تواجهين صعوبة في الحفظ وتشتت الانتباه وضعف التركيز أثناء الحصص الدراسية أو حل الواجبات.
                </p>
              </div>

              <div className="bg-slate-100 rounded-2xl p-6 border border-slate-200 hover:-translate-y-1 transition-transform">
                <div className="w-16 h-16 bg-slate-300 rounded-xl flex items-center justify-center text-4xl mb-6 shadow-sm">📉</div>
                <h3 className="font-bold text-slate-800 text-xl mb-3">قلة اللياقة البدنية والهشاشة</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  الاعتماد عليها يسبب زيادة الوزن وفي نفس الوقت سوء تغذية (نقص كالسيوم وحديد)، مما يضعف قوة العضلات ويجعلك غير قادرة على مجاراة زميلاتك في حصة التربية الرياضية.
                </p>
              </div>
            </div>

            <div className="mt-8 bg-white border border-slate-200 p-6 rounded-3xl">
              <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <AlertCircle className="text-rose-500" />
                تأثير الصوديوم (الملح الخفي)
              </h3>
              <p className="text-slate-600">
                تحتوي الوجبات السريعة على نسب عالية جداً من الصوديوم لتحسين النكهة وحفظها. هذا الصوديوم الزائد يؤدي إلى احتباس السوائل في الجسم، الشعور الدائم بالانتفاخ، ويرفع ضغط الدم بشكل غير صحي حتى في الأعمار الصغيرة!
              </p>
            </div>

            <div className="bg-gradient-to-r from-pink-500 to-rose-400 rounded-3xl p-8 text-white mt-10 text-center shadow-lg transform hover:scale-[1.01] transition-transform">
              <h3 className="text-2xl font-bold mb-4">نصيحة ذهبية ✨</h3>
              <p className="opacity-95 max-w-2xl mx-auto text-lg leading-relaxed">
                استبدلي رقائق البطاطس المقلية والحلويات بوجبة خفيفة من المكسرات والفواكه الطازجة (مثل التفاح أو الموز) قبل أداء التمارين الرياضية أو المذاكرة لتكوني في قمة نشاطك وقدراتك العقلية!
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
              <div className="p-3 bg-pink-100 text-pink-600 rounded-xl">
                <HelpCircle size={32} />
              </div>
              <h2 className="text-3xl font-bold text-slate-800">
                اختبري معلوماتك!
              </h2>
            </div>

            <div className="space-y-6">
              {[
                {
                  q: "ماذا يسمى الوقود الأساسي الذي يمد أجسامنا بالطاقة؟",
                  ops: ["الدهون المتحولة", "الكربوهيدرات (النشويات المعقدة)", "الفيتامينات"],
                  ans: 1
                },
                {
                  q: "لماذا نشعر بالخمول بعد تناول الوجبات السريعة مباشرة؟",
                  ops: ["لأنها تهضم ببطء شديد وتأخذ طاقة الجسم", "لأنها تحتوي على فيتامينات تسبب النعاس", "لأنها ترفع السكر فجأة ثم ينخفض فجأة"],
                  ans: 2
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
                            ? "bg-pink-50 border-pink-500 text-pink-800 font-bold" 
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
                      <span>{quizAnswers[i] === question.ans ? "إجابة صحيحة! أحسنتِ!" : "إجابة خاطئة، حاولي التذكر مما قرأتِ."}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <button 
              onClick={() => setShowResult(true)}
              className="w-full py-4 bg-pink-600 hover:bg-pink-700 text-white rounded-xl font-bold text-lg transition-colors shadow-md"
            >
              عرض النتيجة وتقييم المعلومات
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
