import { Route, Routes, Navigate } from "react-router-dom";
import Navigation from "../Views/Public/Navigation";
import Dashboard from "../Views/Private/Publisher/Dashboard";
import { useContext } from "react";
import AuthContext from "../Context/AuthContext";

export default () => {
  const user = useContext(AuthContext);

  return (
    <Routes>
      <Route exact path="/" element={<Navigation user={user} />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="profile" element={<div>Profile</div>} />
        <Route path="create-book" element={<div>publish books</div>} />
        <Route path="create-offer" element={<div>create an offer</div>} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
