import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from './firebase';

export async function logInteraction(themeId: string, action: string) {
  let userId = localStorage.getItem("deviceUserId");
  if (!userId) {
    userId = 'user_' + Math.random().toString(36).substring(2, 15);
    localStorage.setItem("deviceUserId", userId);
  }
  
  const studentName = localStorage.getItem("studentName") || "مستخدم مجهول";

  try {
    const data = {
      userId,
      studentName,
      themeId,
      action,
      timestamp: serverTimestamp()
    };
    await addDoc(collection(db, 'interactions'), data);
  } catch (error) {
    const errObj = {
      error: error instanceof Error ? error.message : String(error),
      operationType: 'CREATE',
      path: 'interactions',
      authInfo: {
        userId: auth.currentUser?.uid,
        isAnonymous: auth.currentUser?.isAnonymous
      }
    };
    console.error("Failed to log interaction", JSON.stringify(errObj));
    throw new Error(JSON.stringify(errObj));
  }
}
