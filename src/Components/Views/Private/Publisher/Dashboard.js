import { Outlet, Link } from "react-router-dom";

export default () => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Dashboard</Link>
          </li>
          <li>
            <Link to="/book/:id">Book</Link>
          </li>
          <li>
            <Link to="/create-book">Publish a book</Link>
          </li>
          <li>
            <Link to="/sign-out">Sign out</Link>
          </li>
        </ul>
      </nav>

      <hr />
      <Outlet />
    </div>
  );
};
