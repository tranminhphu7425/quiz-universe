import { NavLink } from "react-router-dom";

export default function Test() {
  return (
    <nav className="flex gap-4 p-4 bg-gray-800">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? "text-emerald-400 font-bold" : "text-gray-200"
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/about"
        className={({ isActive }) =>
          isActive ? "text-emerald-400 font-bold" : "text-gray-200"
        }
      >
        About
      </NavLink>
    </nav>
  );
}
