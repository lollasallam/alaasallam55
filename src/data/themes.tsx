import { Activity, UserCheck, Sprout, Users, Brain, ShieldCheck } from "lucide-react";
import Theme1 from "../pages/themes/Theme1";
import Theme2 from "../pages/themes/Theme2";
import Theme3 from "../pages/themes/Theme3";
import Theme4 from "../pages/themes/Theme4";
import Theme5 from "../pages/themes/Theme5";
import Theme6 from "../pages/themes/Theme6";

export const themesInfo = [
  {
    id: "nutritional-health",
    title: "الصحة الغذائية للتلاميذ",
    shortTitle: "الصحة الغذائية للتلاميذ",
    description: "اكتشفي كيف يمنحك الغذاء الصحي الطاقة للعب والتركيز، وكيف تؤثر الوجبات السريعة على نشاطك.",
    icon: Activity,
    color: "bg-emerald-100 text-emerald-700",
    gradient: "from-emerald-500 to-emerald-600",
    component: Theme1,
  },
  {
    id: "personal-behavior",
    title: "السلوك الشخصي الغذائي للتلاميذ",
    shortTitle: "السلوك الشخصي الغذائي للتلاميذ",
    description: "تعرفي على أهمية العادات الصحية لجمال شعرك وبشرتك وأسنانك، وابتعدي عن أضرار الوجبات السريعة.",
    icon: UserCheck,
    color: "bg-teal-100 text-teal-700",
    gradient: "from-teal-500 to-teal-600",
    component: Theme2,
  },
  {
    id: "environmental-health",
    title: "الصحة البيئية الغذائية للتلاميذ",
    shortTitle: "الصحة البيئية الغذائية للتلاميذ",
    description: "كيف نحمي كوكبنا الجميل من خلال اختياراتنا الغذائية؟ دورنا في تقليل المخلفات.",
    icon: Sprout,
    color: "bg-emerald-100 text-emerald-700",
    gradient: "from-emerald-600 to-emerald-700",
    component: Theme3,
  },
  {
    id: "community-health",
    title: "الغذاء وصحة المجتمع للتلاميذ",
    shortTitle: "الغذاء وصحة المجتمع للتلاميذ",
    description: "هل نأكل معاً؟ كيف تؤثر العادات الاجتماعية والأصدقاء على اختياراتنا الغذائية.",
    icon: Users,
    color: "bg-teal-100 text-teal-700",
    gradient: "from-teal-600 to-teal-700",
    component: Theme4,
  },
  {
    id: "psychological-health",
    title: "الغذاء و الصحة النفسية للتلاميذ",
    shortTitle: "الغذاء و الصحة النفسية للتلاميذ",
    description: "هل تعلمين أن ما تأكلينه يؤثر على مزاجك وسعادتك؟ اكتشفي سر السعادة في الغذاء.",
    icon: Brain,
    color: "bg-emerald-50 text-emerald-700",
    gradient: "from-emerald-500 to-teal-600",
    component: Theme5,
  },
  {
    id: "preventive-health",
    title: "الصحة الوقائية و الغذاء للتلاميذ",
    shortTitle: "الصحة الوقائية و الغذاء للتلاميذ",
    description: "الغذاء هو درعك الواقي! كيف تحمين نفسك من الأمراض وتقوين مناعتك بطرق طبيعية وممتعة.",
    icon: ShieldCheck,
    color: "bg-teal-50 text-teal-700",
    gradient: "from-teal-500 to-emerald-600",
    component: Theme6,
  }
];
