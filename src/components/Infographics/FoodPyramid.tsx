import { motion } from "motion/react";

export default function FoodPyramid() {
  const levels = [
    {
      title: "الزيوت والحلويات",
      desc: "استعملي كميات قليلة جداً",
      color: "bg-rose-500",
      width: "w-[20%]",
      items: ["زبدة", "حلويات", "مشروبات غازية"]
    },
    {
      title: "الحليب واللبن والجبن",
      desc: "2-3 حصص",
      color: "bg-blue-500",
      width: "w-[40%]",
      items: ["حليب", "أجبان", "زبادي"]
    },
    {
      title: "اللحوم والدواجن والأسماك",
      desc: "2-3 حصص",
      color: "bg-purple-500",
      width: "w-[60%]",
      items: ["أسماك", "دجاج", "بيض", "لحوم"]
    },
    {
      title: "الخضروات والفواكه",
      desc: "3-5 حصص خضار، 2-4 حصص فواكه",
      color: "bg-green-500",
      width: "w-[80%]",
      items: ["تفاح", "موز", "جزر", "طماطم", "ورقيات"]
    },
    {
      title: "الخبز والحبوب والأرز والمكرونة",
      desc: "6-11 حصة (ويفضل الحبوب الكاملة)",
      color: "bg-amber-600",
      width: "w-[100%]",
      items: ["خبز أسمر", "شوفان", "أرز", "مكرونة"]
    }
  ];

  return (
    <div className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-slate-100 flex flex-col items-center">
      <div className="text-center mb-10 w-full">
        <h3 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-orange-500 mb-3">
          الهرم الغذائي السليم
        </h3>
        <p className="text-slate-600 max-w-lg mx-auto">
          يوضح الهرم الغذائي المجموعات الغذائية وكمياتها المناسبة لبناء جسم قوي وصحي.
        </p>
      </div>

      <div className="w-full max-w-2xl flex flex-col items-center gap-2">
        {levels.map((level, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
            className={`${level.width} ${level.color} rounded-lg p-3 md:p-4 text-white text-center shadow-lg relative overflow-hidden group min-h-[80px] flex flex-col justify-center`}
          >
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <h4 className="font-bold text-sm md:text-base lg:text-lg mb-1">{level.title}</h4>
            <p className="text-white/80 text-xs md:text-sm mb-2">{level.desc}</p>
            <div className="flex flex-wrap justify-center gap-1 md:gap-2">
              {level.items.map((item, i) => (
                <span key={i} className="text-[10px] md:text-xs bg-black/20 px-2 py-1 rounded-full backdrop-blur-sm">
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="w-full bg-slate-800 text-white rounded-lg p-4 text-center mt-2 shadow-lg"
        >
          <p className="font-bold">القاعدة الأساسية: تمارين يومية وشرب الماء بكميات كافية</p>
        </motion.div>
      </div>
    </div>
  );
}
