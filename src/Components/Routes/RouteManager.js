import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import PublisherRoutes from "./PublisherRoutes";
import BuyerRoutes from "./BuyerRoutes";
import AdminRoutes from "./AdminRoutes";
import LoggedOutRoutes from "./LoggedOutRoutes";
import { auth, db } from "../../Config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import AuthContext from "../Context/AuthContext";

export default () => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  // function handleOnAuthStateChanged(user) {
  //   setUser(user);
  //   if (initialising) setInitialising(false);
  // }

  // useEffect(() => {
  //   const auth = getAuth();
  //   const unsubscribe = onAuthStateChanged(auth, handleOnAuthStateChanged);

  //   return unsubscribe;
  // }, []);

  useAuthState(auth, {
    onUserChanged: async (user) => {
      const docRef = doc(db, "user", user.uid);
      const docSnap = await getDoc(docRef);

      const userRole = docSnap.data().role;

      if (!userRole) return;
      else {
        setRole(userRole);
        setUser({
          ...user,
          role: userRole
        });
      }

      if (!docSnap.exists()) userRole(null);
    }
  });

  return (
    <BrowserRouter>
      {(() => {
        if (!role) {
          return <LoggedOutRoutes user={user} />;
        } else {
          return (
            <AuthContext.Provider value={user}>
              {(() => {
                if (role === "publisher") return <PublisherRoutes />;
                if (role === "buyer") return <BuyerRoutes />;
                if (role === "admin") return <AdminRoutes />;
              })()}
            </AuthContext.Provider>
          );
        }
      })()}
    </BrowserRouter>
  );
};
