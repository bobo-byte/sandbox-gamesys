import { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import AuthContext from "../Context/AuthContext";
import Navigation from "../Views/Public/Navigation";

export default () => {
  const user = useContext(AuthContext);

  return (
    <Routes>
      <Route exact path="/" element={<Navigation user={user} />}>
        <Route path="profile" element={<div>Profile</div>} />
        <Route path="book/:id" element={<div>publish books</div>} />
        <Route path="cart" element={<div>Current cart</div>} />
        <Route pat="purchase" element={<div>Purchase books from cart</div>} />
        <Route path="books/transactions" element={<div>Books bought</div>} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
