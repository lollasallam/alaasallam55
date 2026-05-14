import React, { useEffect, useState, useMemo } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db, auth } from '../lib/firebase';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface Interaction {
  id: string;
  userId: string;
  studentName?: string;
  themeId: string;
  action: string;
  timestamp: any;
}

const THEME_NAMES: Record<string, string> = {
  'system': 'النظام',
  'theme1': 'المحتوى التثقيفي',
  'theme2': 'المواقف الشخصية',
  'theme3': 'الخلفية البيئية',
  'theme4': 'تأثير المجتمع',
  'theme5': 'الحالة النفسية',
  'theme6': 'الصحة الوقائية'
};

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#14b8a6'];

export default function Dashboard() {
  const [interactions, setInteractions] = useState<Interaction[]>([]);
  const [isResearcherAuthenticated, setIsResearcherAuthenticated] = useState(() => localStorage.getItem('isResearcherAuthenticated') === 'true');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isResearcherAuthenticated) {
      fetchInteractions();
    }
  }, [isResearcherAuthenticated]);

  const fetchInteractions = () => {
    const q = query(collection(db, 'interactions'), orderBy('timestamp', 'desc'));
    onSnapshot(q, (snapshot) => {
      const data: Interaction[] = [];
      snapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() } as Interaction);
      });
      setInteractions(data);
    }, (error) => {
      const errObj = {
        error: error instanceof Error ? error.message : String(error),
        operationType: 'LIST',
        path: 'interactions',
        authInfo: {
          userId: auth.currentUser?.uid,
          isAnonymous: auth.currentUser?.isAnonymous
        }
      };
      console.error(JSON.stringify(errObj));
      setError('لا تملك صلاحيات الباحث لعرض هذه البيانات. ' + (error instanceof Error ? error.message : ''));
    });
  };

  const [password, setPassword] = useState('');
  const [authFormError, setAuthFormError] = useState('');

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthFormError('');
    if (password === 'alaa2025') {
       localStorage.setItem('isResearcherAuthenticated', 'true');
       setIsResearcherAuthenticated(true);
    } else {
       setAuthFormError('كلمة المرور غير صحيحة. حاول مرة أخرى.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isResearcherAuthenticated');
    setIsResearcherAuthenticated(false);
  };

  // Derived Statistics & Session Grouping
  const stats = useMemo(() => {
    const uniqueUsers = new Set(interactions.map(i => i.userId)).size;
    const totalInteractions = interactions.length;
    
    // Theme popularity
    const themeCounts: Record<string, number> = {};
    interactions.forEach(i => {
      if (i.themeId && i.themeId !== 'system') {
        themeCounts[i.themeId] = (themeCounts[i.themeId] || 0) + 1;
      }
    });

    const themeChartData = Object.entries(themeCounts).map(([themeId, count]) => ({
      name: THEME_NAMES[themeId] || themeId,
      count
    })).sort((a, b) => b.count - a.count);

    // Group into sessions
    // A new session starts if it's a 'system' 'تسجيل دخول التلميذة' action, or if there's a > 2 hour gap
    const sessionsMap = new Map<string, any>(); // Map of session key to session object

    // Sort ascending to build sessions
    const sortedInteractions = [...interactions].sort((a, b) => {
      const timeA = a.timestamp?.toMillis ? a.timestamp.toMillis() : 0;
      const timeB = b.timestamp?.toMillis ? b.timestamp.toMillis() : 0;
      return timeA - timeB;
    });

    const studentSessions: any[] = [];
    
    sortedInteractions.forEach(item => {
      const timeMs = item.timestamp?.toMillis ? item.timestamp.toMillis() : Date.now();
      
      // Find the latest session for this user
      let currentSession = studentSessions.findLast(s => s.userId === item.userId);
      
      // Create new session if no session, or if this is an explicit login, or if time gap > 2 hours (7200000 ms)
      if (!currentSession || 
          (item.action === 'تسجيل دخول التلميذة' && item.themeId === 'system') ||
          (timeMs - currentSession.lastActivityTime > 7200000)) {
        
        currentSession = {
          id: item.id + '_session',
          userId: item.userId,
          studentName: item.studentName || 'مجهول',
          startTime: timeMs,
          lastActivityTime: timeMs,
          themesVisited: new Set<string>(),
          actions: []
        };
        studentSessions.push(currentSession);
      }

      currentSession.lastActivityTime = timeMs;
      
      if (item.themeId && item.themeId !== 'system') {
        currentSession.themesVisited.add(item.themeId);
      }
      
      if (item.action !== 'تسجيل دخول التلميذة') {
        currentSession.actions.push(item);
      }
    });

    // Sort sessions descending by start time
    studentSessions.sort((a, b) => b.startTime - a.startTime);

    return {
      uniqueUsers,
      totalInteractions,
      themeChartData,
      studentSessions
    };
  }, [interactions]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-800">لوحة بيانات الباحثة</h1>
        {isResearcherAuthenticated ? (
          <button onClick={handleLogout} className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors font-medium">
            تسجيل خروج
          </button>
        ) : null}
      </div>

      {!isResearcherAuthenticated ? (
        <div className="bg-white p-8 rounded-2xl shadow-sm text-center border border-slate-100 max-w-md mx-auto">
          <div className="text-5xl mb-4">🔐</div>
          <h2 className="text-xl font-bold text-slate-800 mb-2">تسجيل الدخول للباحثة</h2>
          <p className="mb-6 text-slate-600 text-sm">أدخلي البريد الإلكتروني وكلمة المرور الخاصة بك للوصول للوحة البيانات.</p>
          
          {authFormError && (
             <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm font-medium">
               {authFormError}
             </div>
          )}

          <form onSubmit={handleAuthSubmit} className="space-y-4">
            <input 
              type="password" 
              placeholder="كلمة المرور المشفرة" 
              className="w-full px-4 py-4 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-slate-800 bg-slate-50 focus:bg-white text-center font-bold tracking-widest text-lg"
              dir="ltr"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <button 
              type="submit"
              className="w-full px-6 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-bold shadow-sm"
            >
              دخول الباحثة
            </button>
          </form>
        </div>
      ) : error ? (
        <div className="p-6 bg-red-50 border border-red-200 text-red-700 rounded-2xl flex items-center gap-4">
          <span className="text-2xl">⚠️</span>
          <div>
            <h3 className="font-bold">خطأ في الصلاحيات</h3>
            <p>{error}</p>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-4">
              <div className="p-4 bg-blue-100 text-blue-600 rounded-2xl text-2xl">👥</div>
              <div>
                <p className="text-slate-500 text-sm font-medium">إجمالي الطالبات</p>
                <p className="text-3xl font-bold text-slate-800">{stats.uniqueUsers}</p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-4">
              <div className="p-4 bg-emerald-100 text-emerald-600 rounded-2xl text-2xl">🖱️</div>
              <div>
                <p className="text-slate-500 text-sm font-medium">إجمالي التفاعلات</p>
                <p className="text-3xl font-bold text-slate-800">{stats.totalInteractions}</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-4">
              <div className="p-4 bg-purple-100 text-purple-600 rounded-2xl text-2xl">📚</div>
              <div>
                <p className="text-slate-500 text-sm font-medium">المحور الأكثر زيارة</p>
                <p className="text-xl font-bold text-slate-800 truncate">
                  {stats.themeChartData.length > 0 ? stats.themeChartData[0].name : '-'}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
              <h3 className="font-bold text-slate-800 mb-6">الزيارات حسب المحاور (رسم بياني)</h3>
              <div className="h-64" dir="ltr">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stats.themeChartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
                    <YAxis allowDecimals={false} tick={{ fill: '#64748b' }} axisLine={false} tickLine={false} />
                    <RechartsTooltip 
                      cursor={{fill: '#f8fafc'}}
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Bar dataKey="count" fill="#3b82f6" radius={[6, 6, 0, 0]} maxBarSize={50} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
               <h3 className="font-bold text-slate-800 mb-6">نسبة الزيارات للمحاور</h3>
               <div className="h-64" dir="ltr">
                 <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={stats.themeChartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="count"
                        stroke="none"
                      >
                        {stats.themeChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <RechartsTooltip 
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      />
                    </PieChart>
                 </ResponsiveContainer>
               </div>
               <div className="flex flex-wrap gap-3 mt-4 justify-center">
                  {stats.themeChartData.map((entry, index) => (
                    <div key={index} className="flex items-center gap-1.5 text-xs text-slate-600">
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
                      {entry.name} ({entry.count})
                    </div>
                  ))}
               </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-sm overflow-hidden border border-slate-100">
            <div className="p-6 border-b border-slate-100">
              <h3 className="font-bold text-slate-800">جلسات دخول الطالبات المفصلة</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-right">
                <thead className="bg-slate-50 text-slate-600 text-sm">
                  <tr>
                    <th className="px-6 py-4 font-medium">وقت الدخول</th>
                    <th className="px-6 py-4 font-medium">اسم الطالبة</th>
                    <th className="px-6 py-4 font-medium">المحاور التي تمت زيارتها</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {stats.studentSessions.map(session => {
                      const displayDate = new Date(session.startTime).toLocaleString('ar-EG');
                      
                      const themesList = Array.from(session.themesVisited).map((tId: any) => THEME_NAMES[tId] || tId);

                      return (
                    <tr key={session.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 text-sm font-mono text-slate-500" dir="ltr">
                        {displayDate}
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-700 bg-slate-50/50">
                        {session.studentName} 
                        <span className="block text-xs text-slate-400 font-mono mt-1" dir="ltr">{session.userId.substring(0, 6)}...</span>
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-700">
                        {themesList.length > 0 ? (
                          <div className="flex flex-wrap gap-2 justify-start">
                            {themesList.map((themeName, idx) => (
                              <span key={idx} className="px-2 py-1 text-xs bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-md">
                                {themeName}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="text-slate-400 text-xs">اكتفت بتسجيل الدخول</span>
                        )}
                      </td>
                    </tr>
                   )})}
                  {stats.studentSessions.length === 0 && (
                    <tr>
                      <td colSpan={3} className="px-6 py-12 text-center text-slate-500">
                        لا يوجد جلسات مسجلة بعد. قومي بمشاركة الرابط مع التلميذات.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
