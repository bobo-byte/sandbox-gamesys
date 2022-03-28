import { Route, Routes } from "react-router-dom";
import Navigation from "../Views/Public/Navigation";
import Index from "../Views/Public/Index";
import SignUp from "../Views/Public/SignUp";
import SignIn from "../Views/Public/SignIn";

export default () => {
  return (
    <Routes>
      <Route exact path="/" element={<Navigation />}>
        {
          //index a page to make it the main component rendered from navigation
        }
        <Route index element={<Index />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="signin" element={<SignIn />} />
      </Route>
    </Routes>
  );
};
