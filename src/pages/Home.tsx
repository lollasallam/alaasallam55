import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { themesInfo } from "../data/themes";
import ExtraInformation from "../components/ExtraInformation";

export default function Home() {
  return (
    <div className="space-y-12 pb-20">
      <section className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-primary-500 to-secondary-500 text-white p-8 md:p-12 lg:p-16 shadow-xl">
        <div className="absolute top-0 right-0 w-full h-full opacity-10 mix-blend-overlay border-[40px] border-white blur-2xl"></div>
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-white/20 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block py-1 px-4 rounded-full bg-white/20 backdrop-blur-md text-sm font-medium mb-6">
              متعة التعلم والصحة
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
              صحتي في غذائي <br/> 
              <span className="text-yellow-200">وسر طاقتي!</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed max-w-2xl">
              مرحباً بكِ في هذا البرنامج التثقيفي الممتع! اكتشفي أسرار الغذاء الصحي، وكيف تحافظين على نشاطك وجمالك وتركيزك بالابتعاد عن مخاطر الوجبات السريعة.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="mt-8 mb-16">
        <div className="w-full max-w-4xl mx-auto bg-white rounded-3xl p-4 md:p-6 shadow-sm border border-slate-100">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-slate-800">مقدمة البرنامج</h2>
            <p className="text-slate-500 mt-2">شاهدي هذا الفيديو التعريفي الممتع لمعرفة المزيد</p>
          </div>
          <div className="relative w-full overflow-hidden rounded-2xl" style={{ paddingTop: '56.25%' }}>
            <iframe 
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/xyQY8a-ng6g" 
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              referrerPolicy="strict-origin-when-cross-origin" 
              allowFullScreen>
            </iframe>
          </div>
        </div>
      </section>

      <section>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">محاور البرنامج</h2>
          <p className="text-slate-500 max-w-2xl mx-auto">
            تعرفي على أهم المواضيع التي ستساعدك في بناء عادات صحية سليمة مدى الحياة.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {themesInfo.map((theme, idx) => (
            <motion.div
              key={theme.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
            >
              <Link 
                to={`/theme/${theme.id}`}
                className="group block h-full bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 hover:-translate-y-1 relative overflow-hidden"
              >
                <div className={`absolute top-0 right-0 w-full h-2 bg-gradient-to-r ${theme.gradient} opacity-0 group-hover:opacity-100 transition-opacity`}></div>
                
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-sm transition-transform group-hover:scale-110 group-hover:rotate-3 ${theme.color}`}>
                  <theme.icon size={32} />
                </div>
                
                <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-primary-600 transition-colors">
                  {theme.title}
                </h3>
                
                <p className="text-slate-600 leading-relaxed mb-6">
                  {theme.description}
                </p>

                <div className="flex items-center text-sm font-bold text-primary-500 group-hover:translate-x-[-8px] transition-transform w-fit">
                  <span>ابدئي الرحلة</span>
                  <svg className="w-5 h-5 ml-2 mr-1 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Extra Info Section */}
      <ExtraInformation />
    </div>
  );
}
