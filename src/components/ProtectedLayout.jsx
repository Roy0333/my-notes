import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import TopBar from "../components/layout/TopBar";

function ProtectedLayout() {
  const [user, setUser] = useState(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // While checking auth state
  if (loading) {
    return <div>Loading...</div>;
  }

  // If not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <TopBar />
      <main className="md:p-6 p-4 bg-gray-300 h-[calc(100vh-80px)]">
        <div className="bg-white rounded-xl md:p-6 p-3 h-full overflow-auto">
          <Outlet />
        </div>
      </main>
    </>
  );
}

export default ProtectedLayout;
