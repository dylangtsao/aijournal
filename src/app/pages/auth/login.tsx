import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../../../utils/firebase"; // Updated import path
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
interface User {
  uid: string;
  email?: string | null;
}

interface AuthError {
  code: string;
  message: string;
}

export default function Login(): JSX.Element {
  // Sign in with Google
  const [user, loading] = useAuthState(auth);
  const route = useRouter();
  const googleProvider = new GoogleAuthProvider();

  const GoogleLogin = async (): Promise<void> => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log(result.user);
      route.push("/dashboard");
    } catch (error) {
      const authError = error as AuthError;
      console.log(authError.message);
    }
  };

  useEffect(() => {
    if (user) {
      route.push("/dashboard");
    } else {
      console.log("login");
    }
  }, [user]);

  return (
    <main className="bg-gray-200 w-screen h-screen">
      <div className="bg-white shadow-xl mt-60 p-10 text-gray-700 rounded-lg">
        <h2 className="text-3xl font-medium">Join Today</h2>
        <div className="flex flex-col gap-4 pt-4">
          <button onClick={GoogleLogin} className="flex gap-4">
            <FcGoogle className="text-2xl" /> Sign in with Google
          </button>
        </div>
      </div>
    </main>
  );
}
