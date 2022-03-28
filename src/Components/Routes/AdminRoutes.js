import { Routes, Route, Navigate } from "react-router-dom";
import Navigation from "../Views/Public/Navigation";
import Dashboard from "../Views/Private/Admin/Dashboard";
import { useContext } from "react";

export default () => {
  const user = useContext();

  return (
    <Routes>
      <Route exact path="/" element={<Navigation user={user} />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="profile" element={<div>Profile</div>} />
      <Route path="create-book" element={<div>publish books</div>} />
      <Route path="create-offer" element={<div>create an offer</div>} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
