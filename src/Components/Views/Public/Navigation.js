import { Outlet, Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../Context/AuthContext";

export default ({ user }) => {
  if (user) return;

  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/signup">Sign up</Link>
          </li>
          <li>
            <Link to="/signin">Sign in</Link>
          </li>
        </ul>
      </nav>

      <hr />
      <Outlet />
    </div>
  );
};
