
import React, { useState, useEffect, useCallback } from 'react';
import { SURVEY_DIMENSIONS } from './constants';
import { SurveyState, StudentResponse, Submission, DimensionScore } from './types';
import { db, ensureAuthentication, loginAsResearcher, logout, auth, handleFirestoreError, OperationType } from './firebase';
import { collection, onSnapshot, addDoc, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const App: React.FC = () => {
  const [mode, setMode] = useState<'selection' | 'student' | 'researcher_login' | 'researcher'>('selection');
  const [step, setStep] = useState<'intro' | 'info' | 'survey' | 'summary'>('intro');
  const [activeDimension, setActiveDimension] = useState(0);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isResearcherUser, setIsResearcherUser] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginPass, setLoginPass] = useState('');
  const [loginError, setLoginError] = useState(false);
  
  const [formData, setFormData] = useState<SurveyState>({
    studentName: '',
    grade: '',
    school: '',
    responses: {}
  });

  useEffect(() => {
    ensureAuthentication();

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      const isResearcher = user && user.email === 'lollasallam@gmail.com';
      setIsResearcherUser(!!isResearcher);
      
      if (isResearcher) {
        setMode('researcher');
      }
    });

    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    if (!isResearcherUser) return;
    
    // Only researcher can listen to all submissions
    const q = query(collection(db, 'submissions'), orderBy('createdAt', 'desc'));
    const unsubscribeSnapshot = onSnapshot(q, (snapshot) => {
      const data: Submission[] = [];
      snapshot.forEach(doc => {
        data.push({ id: doc.id, ...doc.data() } as Submission);
      });
      setSubmissions(data);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'submissions');
    });

    return () => unsubscribeSnapshot();
  }, [isResearcherUser]);

  const resetToHome = () => {
    if (isResearcherUser) {
      setMode('researcher');
    } else {
      setMode('selection');
    }
    setStep('intro');
    setActiveDimension(0);
    setFormData({ studentName: '', grade: '', school: '', responses: {} });
    setLoginPass('');
    setLoginError(false);
  };

  const handleGlobalBack = () => {
    if (mode === 'researcher_login') {
      resetToHome();
    } else if (mode === 'student') {
      if (step === 'intro') resetToHome();
      else if (step === 'info') setStep('intro');
      else if (step === 'survey') {
        if (activeDimension > 0) setActiveDimension(activeDimension - 1);
        else setStep('info');
      } else if (step === 'summary') resetToHome();
    }
  };

  const calculateResults = (): Omit<Submission, 'id'> => {
    let totalScore = 0;
    let maxTotalScore = 0;
    const dimensionResults: DimensionScore[] = SURVEY_DIMENSIONS.map(dim => {
      let dimScore = 0;
      let dimMax = dim.questions.length * 2;
      dim.questions.forEach(q => {
        const resp = formData.responses[q.id];
        let val = 0;
        if (resp === 'always') val = q.isNegative ? 0 : 2;
        else if (resp === 'sometimes') val = 1;
        else if (resp === 'never') val = q.isNegative ? 2 : 0;
        dimScore += val;
      });
      totalScore += dimScore;
      maxTotalScore += dimMax;
      return {
        title: dim.title,
        score: dimScore,
        maxScore: dimMax,
        percentage: Math.round((dimScore / dimMax) * 100)
      };
    });

    return {
      timestamp: new Date().toLocaleString('ar-EG'),
      studentName: formData.studentName || 'غير معروف',
      grade: formData.grade || 'غير معروف',
      school: formData.school || 'غير معروف',
      totalScore,
      maxTotalScore,
      dimensionScores: dimensionResults,
      responses: { ...formData.responses }
    } as any;
  };

  const handleFinishSurvey = async () => {
    const newResult = calculateResults();
    
    try {
      if (!auth.currentUser) await ensureAuthentication();
      
      const submissionData = {
        userId: auth.currentUser?.uid || 'anonymous',
        studentName: newResult.studentName,
        school: newResult.school,
        grade: newResult.grade,
        timestamp: newResult.timestamp,
        totalScore: newResult.totalScore,
        maxTotalScore: newResult.maxTotalScore,
        dimensionScores: newResult.dimensionScores,
        createdAt: serverTimestamp()
      };
      
      await addDoc(collection(db, 'submissions'), submissionData);
      setStep('summary');
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, 'submissions');
    }
  };

  const handleLoginSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsLoggingIn(true);
    setLoginError(false);
    try {
      await loginAsResearcher(loginPass);
      setLoginPass('');
    } catch (err) {
      console.error(err);
      setLoginError(true);
      setTimeout(() => setLoginError(false), 3000);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const exportToExcel = () => {
    const dimensionHeaders = SURVEY_DIMENSIONS.map(d => d.title);
    const headers = ['الاسم', 'المدرسة', 'الصف', 'التوقيت', 'الدرجة الكلية', 'النسبة المئوية', ...dimensionHeaders];
    
    const rows = submissions.map(s => {
      const dimScores = (s.dimensionScores || SURVEY_DIMENSIONS.map(d => ({ score: 0, maxScore: 0, percentage: 0, title: d.title }))).map(ds => 
        ds.maxScore > 0 ? `${ds.score}/${ds.maxScore} (${ds.percentage}%)` : 'غير متوفر'
      );
      return [
        s.studentName, s.school, s.grade, s.timestamp, s.totalScore, 
        `${Math.round((s.totalScore / (s.maxTotalScore || 1)) * 100)}%`,
        ...dimScores
      ];
    });
    
    const escapeCSV = (val: any) => {
      const stringVal = String(val);
      if (stringVal.includes(',') || stringVal.includes('"') || stringVal.includes('\n')) {
        return `"${stringVal.replace(/"/g, '""')}"`;
      }
      return stringVal;
    };

    const csvContent = "\uFEFF" + [headers, ...rows]
      .map(row => row.map(escapeCSV).join(","))
      .join("\n");
      
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `نتائج_مقياس_السلوك_الصحي_آلاء_السيد_${new Date().toLocaleDateString('ar-EG')}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (mode === 'selection') {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 md:p-6 animate-fade-in overflow-x-hidden">
        <div className="text-center mb-8 px-2">
          <h1 className="text-2xl md:text-4xl font-bold mb-2 text-teal-900 academic-font leading-tight">مقياس السلوك الصحي لتلميذات المرحلة الثانية من التعليم الأساسي</h1>
          <p className="text-base md:text-xl text-slate-700 font-semibold mb-6">جامعة طنطا - كلية علوم الرياضة</p>
          
          <div className="space-y-4">
            <div className="inline-block bg-teal-50 px-6 py-2 rounded-xl border border-teal-100 shadow-sm">
              <p className="text-teal-900 font-bold text-sm md:text-base">إعداد الباحثة</p>
              <p className="text-teal-700 text-lg md:text-xl font-black">آلاء السيد سلام</p>
            </div>
            
            <div className="bg-white p-4 md:p-6 rounded-2xl md:rounded-[2rem] border border-slate-100 shadow-sm max-w-sm md:max-w-xl mx-auto">
              <p className="text-slate-400 font-bold text-[10px] md:text-sm mb-3 tracking-widest uppercase">تحت إشراف</p>
              <div className="space-y-2 md:space-y-3">
                <p className="text-slate-800 font-bold text-sm md:text-lg">أ.د / مسعود كمال غرابة</p>
                <p className="text-slate-800 font-bold text-sm md:text-lg">أ.م.د / عايدة أبو السعود نصر</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 w-full max-w-2xl mb-8">
          <button 
            onClick={() => { setMode('student'); setStep('intro'); }}
            className="bg-white p-6 md:p-10 rounded-2xl md:rounded-3xl shadow-lg hover:shadow-xl transition-all border-b-4 md:border-b-8 border-teal-500 group text-center"
          >
            <div className="w-12 h-12 md:w-20 md:h-20 bg-teal-50 rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-6 group-hover:bg-teal-500 group-hover:text-white transition-colors">
              <svg className="w-6 h-6 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/></svg>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-slate-800">دخول الطالبة</h3>
          </button>

          <button 
            onClick={() => setMode('researcher_login')}
            className="bg-white p-6 md:p-10 rounded-2xl md:rounded-3xl shadow-lg hover:shadow-xl transition-all border-b-4 md:border-b-8 border-slate-700 group text-center"
          >
            <div className="w-12 h-12 md:w-20 md:h-20 bg-slate-50 rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-6 group-hover:bg-slate-700 group-hover:text-white transition-colors">
              <svg className="w-6 h-6 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-slate-800">لوحة الباحثة</h3>
          </button>
        </div>

        {isResearcherUser && (
          <div className="bg-teal-100/80 px-4 py-2 rounded-full text-teal-800 text-[10px] md:text-sm font-bold flex items-center gap-2 mb-4">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            أهلاً بك يا آلاء - تم الدخول
          </div>
        )}

        <div className="bg-slate-200/50 px-4 py-2 rounded-full text-slate-600 text-[10px] md:text-sm font-bold flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          الحالات المسجلة: {submissions.length} طالبة
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-white border-b border-slate-200 py-3 md:py-4 shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <button 
              onClick={handleGlobalBack}
              className="p-2 -mr-2 bg-slate-50 rounded-full hover:bg-slate-100 transition-colors text-slate-600"
              title="رجوع"
            >
              <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"/>
              </svg>
            </button>
            <h1 className="font-bold text-teal-900 text-xs md:text-base">جامعة طنطا - كلية علوم الرياضة</h1>
          </div>
          <div className="text-right">
            <h2 className="text-[10px] md:text-sm font-bold text-slate-700">الباحثة: آلاء السيد سلام</h2>
            <p className="text-[8px] md:text-xs text-teal-600 font-bold uppercase tracking-tighter">Health Research System</p>
          </div>
        </div>
      </header>

      <main className="flex-1 py-6 md:py-10 px-4 md:px-6">
        {mode === 'researcher_login' && (
          <div className="flex items-center justify-center h-full animate-fade-in">
            <div className="bg-white w-full max-w-md p-6 md:p-10 rounded-3xl md:rounded-[2.5rem] shadow-2xl border-t-8 border-slate-800 text-center">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-slate-100 rounded-2xl md:rounded-3xl flex items-center justify-center mx-auto mb-6 md:mb-8 text-slate-600">
                <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-2">دخول الباحثة</h3>
              <p className="text-sm md:text-base text-slate-500 mb-6 md:mb-8">يرجى إدخال كلمة المرور</p>
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <input autoFocus type="password" placeholder="••••••••" className={`w-full p-4 border-2 rounded-xl md:rounded-2xl text-center text-xl md:text-2xl outline-none transition-all ${loginError ? 'border-red-500 bg-red-50' : 'border-slate-100 focus:border-slate-800'}`} value={loginPass} onChange={e => setLoginPass(e.target.value)} />
                {loginError && <p className="text-red-500 font-bold text-xs md:text-sm">كلمة المرور غير صحيحة، أو لم يتم تفعيل الحساب بعد.</p>}
                <div className="flex gap-3 md:gap-4 pt-4">
                  <button type="submit" disabled={isLoggingIn} className="flex-1 bg-slate-800 hover:bg-black text-white py-3 md:py-4 rounded-xl md:rounded-2xl font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-50">
                    {isLoggingIn ? 'جاري الدخول...' : 'دخول'}
                  </button>
                  <button type="button" onClick={handleGlobalBack} className="flex-1 bg-slate-100 text-slate-600 py-3 md:py-4 rounded-xl md:rounded-2xl font-bold">إلغاء</button>
                </div>
              </form>
            </div>
          </div>
        )}
        {mode === 'student' && (
          <div className="max-w-7xl mx-auto h-full">
            {step === 'intro' && <IntroView onNext={() => setStep('info')} />}
            {step === 'info' && <InfoForm formData={formData} setFormData={setFormData} onNext={() => setStep('survey')} onBack={handleGlobalBack} />}
            {step === 'survey' && <SurveyRunner activeDimension={activeDimension} formData={formData} handleResponseChange={(id, val) => setFormData(p => ({...p, responses: {...p.responses, [id]: val}}))} onNext={() => {
              const dim = SURVEY_DIMENSIONS[activeDimension];
              if (!dim.questions.every(q => formData.responses[q.id])) return alert('يرجى إجابة جميع الأسئلة للمتابعة');
              if (activeDimension < SURVEY_DIMENSIONS.length - 1) { setActiveDimension(d => d + 1); window.scrollTo(0,0); } else handleFinishSurvey();
            }} onBack={handleGlobalBack} />}
            {step === 'summary' && <SuccessView submission={calculateResults()} studentName={formData.studentName} onFinish={resetToHome} />}
          </div>
        )}
        {mode === 'researcher' && (
          <ResearcherDashboard submissions={submissions} exportToExcel={exportToExcel} onExit={async () => { await logout(); resetToHome(); }} selectedSubmission={selectedSubmission} setSelectedSubmission={setSelectedSubmission} />
        )}
      </main>
      
      <footer className="py-6 text-center text-slate-400 text-[10px] md:text-sm border-t border-slate-100">
        <p>© {new Date().getFullYear()} جامعة طنطا - مقياس الباحثة آلاء السيد سلام</p>
      </footer>
      <style>{`
        @keyframes fade-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fade-in 0.4s ease-out forwards; }
      `}</style>
    </div>
  );
};

// --- Researcher Dashboard ---
const ResearcherDashboard = ({ submissions, exportToExcel, onExit, selectedSubmission, setSelectedSubmission }: any) => (
  <div className="max-w-7xl mx-auto animate-fade-in px-2">
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-slate-800">لوحة التحكم</h2>
        <div className="flex items-center gap-3 mt-1">
          <p className="text-sm md:text-base text-slate-500 font-bold">المشاركات: {submissions.length}</p>
        </div>
      </div>
      <div className="flex w-full md:w-auto gap-3">
        <button onClick={exportToExcel} disabled={submissions.length === 0} className="flex-1 md:flex-none bg-green-600 hover:bg-green-700 text-white px-4 md:px-8 py-3 rounded-xl md:rounded-2xl font-bold text-sm md:text-base flex items-center justify-center gap-2 shadow-lg whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed">
          <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
          تصدير Excel
        </button>
        <button onClick={onExit} className="flex-1 md:flex-none bg-white text-slate-600 border px-4 md:px-8 py-3 rounded-xl md:rounded-2xl font-bold text-sm md:text-base">خروج</button>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8 mb-8">
      <div className="bg-white p-6 md:p-8 rounded-2xl md:rounded-[2rem] shadow-lg border-r-8 border-teal-500 flex flex-col justify-center">
        <h4 className="text-slate-400 font-bold text-xs md:text-sm mb-2 uppercase tracking-wide">متوسط وعي المجموعة</h4>
        <p className="text-4xl md:text-6xl font-black text-slate-800">{submissions.length > 0 ? Math.round(submissions.reduce((acc: any, s: any) => acc + (s.totalScore / s.maxTotalScore), 0) / submissions.length * 100) : 0}%</p>
      </div>
      
      <div className="lg:col-span-2 bg-white rounded-2xl md:rounded-[2rem] shadow-lg overflow-hidden border">
        <div className="p-4 md:p-6 bg-slate-50 border-b font-bold text-sm md:text-base">سجل الطالبات</div>
        
        {/* Desktop View Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-right">
            <thead>
              <tr className="text-slate-400 text-xs border-b uppercase">
                <th className="p-4">الاسم</th>
                <th className="p-4">المدرسة</th>
                <th className="p-4 text-center">الدرجة</th>
                <th className="p-4 text-center">النسبة</th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((s: any) => (
                <tr key={s.id} className="border-b last:border-0 hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-bold">{s.studentName}</td>
                  <td className="p-4 text-slate-500 text-sm">{s.school}</td>
                  <td className="p-4 text-center font-bold text-teal-600">{s.totalScore}</td>
                  <td className="p-4 text-center font-bold">{Math.round((s.totalScore/s.maxTotalScore)*100)}%</td>
                  <td className="p-4"><button onClick={() => setSelectedSubmission(s)} className="text-blue-600 font-bold hover:underline">التفاصيل</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile View Cards */}
        <div className="block md:hidden divide-y divide-slate-100">
          {submissions.map((s: any) => (
            <div key={s.id} className="p-4 flex justify-between items-center" onClick={() => setSelectedSubmission(s)}>
              <div className="flex-1">
                <p className="font-bold text-slate-800">{s.studentName}</p>
                <p className="text-[10px] text-slate-400">{s.school}</p>
              </div>
              <div className="text-left flex items-center gap-3">
                <div className="text-center">
                  <p className="text-xs font-black text-teal-600">{Math.round((s.totalScore/s.maxTotalScore)*100)}%</p>
                  <p className="text-[8px] text-slate-400">النسبة</p>
                </div>
                <svg className="w-4 h-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
              </div>
            </div>
          ))}
          {submissions.length === 0 && <div className="p-10 text-center text-slate-300 font-bold text-sm">لا يوجد بيانات مسجلة</div>}
        </div>
      </div>
    </div>

    {/* Details Modal */}
    {selectedSubmission && (
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-fade-in">
          <div className="p-5 md:p-8 border-b flex justify-between items-center bg-slate-50">
            <div className="text-right">
              <h3 className="text-lg md:text-2xl font-bold text-slate-800">{selectedSubmission.studentName}</h3>
              <p className="text-xs md:text-sm text-slate-500">{selectedSubmission.school} - {selectedSubmission.grade}</p>
            </div>
            <button onClick={() => setSelectedSubmission(null)} className="p-2 text-slate-400 hover:text-slate-800">
              <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>
          <div className="p-4 md:p-10 overflow-y-auto space-y-6 md:space-y-8 text-right">
             <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                <div className="bg-teal-50 p-4 md:p-6 rounded-2xl md:rounded-3xl text-center">
                  <p className="text-teal-600 text-[10px] md:text-xs font-bold uppercase">الدرجة</p>
                  <p className="text-xl md:text-2xl font-black">{selectedSubmission.totalScore}</p>
                </div>
                <div className="bg-blue-50 p-4 md:p-6 rounded-2xl md:rounded-3xl text-center">
                  <p className="text-blue-600 text-[10px] md:text-xs font-bold uppercase">النسبة</p>
                  <p className="text-xl md:text-2xl font-black">{Math.round((selectedSubmission.totalScore/selectedSubmission.maxTotalScore)*100)}%</p>
                </div>
                <div className="bg-slate-50 p-4 md:p-6 rounded-2xl md:rounded-3xl col-span-2 text-center">
                  <p className="text-slate-400 text-[10px] md:text-xs font-bold uppercase">تاريخ المشاركة</p>
                  <p className="text-sm md:text-lg font-bold">{selectedSubmission.timestamp}</p>
                </div>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {selectedSubmission.dimensionScores.map((ds: any, i: number) => (
                  <div key={i} className="border border-slate-100 p-4 rounded-xl md:rounded-2xl">
                    <div className="flex justify-between mb-2 font-bold text-xs md:text-base">
                      <span>{ds.title}</span>
                      <span className="text-teal-600">{ds.percentage}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-1.5 md:h-2 rounded-full overflow-hidden">
                      <div className="bg-teal-500 h-full transition-all" style={{ width: `${ds.percentage}%` }}></div>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </div>
    )}
  </div>
);

// --- Student Components ---
const IntroView = ({ onNext }: any) => (
  <div className="max-w-2xl mx-auto h-full flex items-center justify-center animate-fade-in">
    <div className="bg-white p-6 md:p-12 rounded-3xl md:rounded-[3.5rem] shadow-xl border-t-[8px] md:border-t-[12px] border-teal-600 w-full">
      <h2 className="text-xl md:text-3xl font-bold text-teal-900 mb-6 md:mb-8 academic-font text-center">تعليمات المقياس</h2>
      <div className="text-right space-y-4 md:space-y-6 text-slate-600 mb-8 md:mb-12 text-sm md:text-lg">
        <p className="font-bold text-teal-800 text-base md:text-xl">عزيزتي الطالبة،</p>
        <p>هذا المقياس مصمم للتعرف على عاداتك الصحية بصدق، يرجى قراءة كل عبارة بعناية واختيار الإجابة التي تصف حالك فعلاً.</p>
        <div className="bg-teal-50/50 p-4 md:p-6 rounded-2xl md:rounded-3xl border-r-4 md:border-r-8 border-teal-500">
          <p className="mb-2">✓ لا توجد إجابات خاطئة، إجابتك الصادقة هي الأهم.</p>
          <p>✓ جميع إجاباتك تُعامل بسرية تامة وتُستخدم لأغراض البحث فقط.</p>
        </div>
      </div>
      <button onClick={onNext} className="w-full bg-teal-600 hover:bg-teal-700 text-white py-4 md:py-6 rounded-xl md:rounded-[2.5rem] font-bold text-lg md:text-2xl shadow-xl transition-all">ابدئي الآن</button>
    </div>
  </div>
);

const InfoForm = ({ formData, setFormData, onNext, onBack }: any) => (
  <div className="max-w-xl mx-auto h-full flex items-center justify-center animate-fade-in">
    <div className="bg-white p-6 md:p-10 rounded-3xl shadow-xl w-full">
      <h3 className="text-xl md:text-2xl font-bold mb-6 md:mb-8 text-center">بيانات الطالبة</h3>
      <div className="space-y-4 md:space-y-6 text-right">
        <div><label className="block text-sm font-bold mb-2">الاسم الرباعي:</label><input type="text" className="w-full p-4 border rounded-xl bg-slate-50 focus:border-teal-500 outline-none text-right" value={formData.studentName} onChange={e => setFormData({...formData, studentName: e.target.value})} placeholder="اكتبي اسمك هنا..." /></div>
        <div><label className="block text-sm font-bold mb-2">المدرسة:</label><input type="text" className="w-full p-4 border rounded-xl bg-slate-50 focus:border-teal-500 outline-none text-right" value={formData.school} onChange={e => setFormData({...formData, school: e.target.value})} placeholder="اسم مدرستك..." /></div>
        <div><label className="block text-sm font-bold mb-2">الصف الدراسي:</label><input type="text" className="w-full p-4 border rounded-xl bg-slate-50 focus:border-teal-500 outline-none text-right" value={formData.grade} onChange={e => setFormData({...formData, grade: e.target.value})} placeholder="الصف..." /></div>
      </div>
      <div className="flex flex-col gap-3 mt-8 md:mt-10">
        <button onClick={onNext} disabled={!formData.studentName || !formData.school} className="bg-teal-600 hover:bg-teal-700 text-white py-4 md:py-5 rounded-xl font-bold text-lg md:text-xl shadow-lg disabled:opacity-30">استمرار للمقياس</button>
        <button onClick={onBack} className="text-slate-400 font-bold text-sm">رجوع</button>
      </div>
    </div>
  </div>
);

const SurveyRunner = ({ activeDimension, formData, handleResponseChange, onNext, onBack }: any) => {
  const dim = SURVEY_DIMENSIONS[activeDimension];
  const progress = ((activeDimension + 1) / SURVEY_DIMENSIONS.length) * 100;

  return (
    <div className="max-w-4xl mx-auto animate-fade-in pb-24">
      <div className="bg-white rounded-2xl md:rounded-[2.5rem] shadow-xl overflow-hidden border border-slate-100">
        <div className="bg-teal-600 p-5 md:p-8 text-white sticky top-0 md:relative z-30">
          <div className="flex justify-between items-end mb-4">
            <h3 className="text-lg md:text-2xl font-bold leading-tight flex-1 ml-4">{dim.title}</h3>
            <span className="bg-white/20 px-3 py-1 rounded-full text-[10px] md:text-sm font-bold">بُعد {activeDimension + 1} من 6</span>
          </div>
          <div className="w-full bg-black/10 h-2 md:h-3 rounded-full overflow-hidden">
            <div className="bg-white h-full transition-all duration-700" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
        
        {/* Modern Mobile Question Cards */}
        <div className="p-4 md:p-10 space-y-6">
          {dim.questions.map((q, idx) => (
            <div key={q.id} className="bg-slate-50 p-4 md:p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-teal-300 transition-all group">
              <div className="flex gap-3 mb-4">
                <span className="flex-shrink-0 w-8 h-8 bg-teal-100 text-teal-600 rounded-lg flex items-center justify-center font-black text-sm">{q.id}</span>
                <p className="text-base md:text-xl font-bold text-slate-800 leading-relaxed">{q.text}</p>
              </div>
              
              <div className="grid grid-cols-3 gap-2 md:gap-4">
                {[
                  { id: 'always', label: 'دائماً', color: 'teal' },
                  { id: 'sometimes', label: 'أحياناً', color: 'slate' },
                  { id: 'never', label: 'أبداً', color: 'red' }
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => handleResponseChange(q.id, opt.id)}
                    className={`py-3 md:py-4 px-2 rounded-xl text-xs md:text-base font-bold transition-all border-2 ${
                      formData.responses[q.id] === opt.id 
                      ? (opt.color === 'teal' ? 'bg-teal-600 border-teal-600 text-white shadow-md scale-105' : 
                         opt.color === 'red' ? 'bg-red-500 border-red-500 text-white shadow-md scale-105' : 
                         'bg-slate-700 border-slate-700 text-white shadow-md scale-105')
                      : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 md:p-10 bg-slate-50 border-t flex justify-between items-center sticky bottom-0 z-30">
          <button 
            onClick={onNext} 
            className="flex-1 bg-teal-600 hover:bg-teal-700 text-white py-4 md:py-5 rounded-xl md:rounded-2xl font-bold text-base md:text-xl shadow-lg transition-all"
          >
            {activeDimension === 5 ? 'إرسال النتائج النهائية' : 'البُعد التالي'}
          </button>
          <button 
            onClick={onBack} 
            disabled={activeDimension === 0} 
            className="px-6 md:px-10 text-slate-400 font-bold disabled:opacity-0 text-sm md:text-base"
          >
            السابق
          </button>
        </div>
      </div>
    </div>
  );
};

const SuccessView = ({ submission, studentName, onFinish }: any) => (
  <div className="max-w-2xl mx-auto h-full flex items-center justify-center animate-fade-in">
    <div className="bg-white p-6 md:p-12 rounded-3xl md:rounded-[3.5rem] shadow-2xl border-t-[8px] md:border-t-[12px] border-teal-500 w-full text-center">
      <div className="w-16 h-16 md:w-24 md:h-24 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mx-auto mb-6 md:mb-8">
        <svg className="w-8 h-8 md:w-12 md:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
      </div>
      <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">انتهيتِ بنجاح!</h2>
      <p className="text-slate-500 mb-8 md:mb-10 text-sm md:text-lg px-4">شكراً لكِ يا <span className="font-bold text-slate-800">{studentName}</span>، لقد تمت عملية التقييم وحفظ نتائجك.</p>
      
      <div className="bg-teal-50 p-6 md:p-10 rounded-2xl md:rounded-[2.5rem] mb-8 md:mb-10">
        <p className="text-teal-600 font-bold mb-2 text-xs md:text-base tracking-widest uppercase">درجة وعيك الصحي الرقمي</p>
        <div className="flex items-center justify-center gap-2">
           <span className="text-4xl md:text-7xl font-black text-teal-800">{Math.round((submission.totalScore/submission.maxTotalScore)*100)}</span>
           <span className="text-2xl md:text-4xl font-bold text-teal-600">%</span>
        </div>
      </div>
      
      <button onClick={onFinish} className="w-full md:w-auto bg-slate-800 hover:bg-black text-white px-12 py-4 md:py-5 rounded-xl md:rounded-2xl font-bold text-lg md:text-xl shadow-lg">العودة للرئيسية</button>
    </div>
  </div>
);

export default App;