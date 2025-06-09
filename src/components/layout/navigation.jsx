import { Link } from "@tanstack/react-router";

export function Navigation() {
  return (
    <nav className="flex h-14 items-center gap-2 px-6">
      <Link to="/" className="[&.active]:font-bold">
        Home
      </Link>
      <Link to="/about" className="[&.active]:font-bold">
        About
      </Link>
    </nav>
  );
}
