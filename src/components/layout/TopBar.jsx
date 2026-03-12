import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const TopBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });

    return () => unsubscribe();
  }, []);

  const userFirstLetter = user?.displayName
    ? user.displayName.charAt(0).toUpperCase()
    : "U";
  // const user = auth.currentUser;
  // const userFirstLetter = user?.displayName?.charAt(0).toUpperCase();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <header className="bg-black flex justify-between items-center pr-7">
      <Link to="/" className="w-28 block">
        <img
          src="/images/commons/site-logo.png"
          className="w-full h-full"
          alt="site logo"
        />
      </Link>
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center font-semibold"
        >
          {userFirstLetter}
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 bg-white rounded-md shadow-lg w-32">
            <ul>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                Profile
              </li>

              <li
                onClick={handleLogout}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default TopBar;
