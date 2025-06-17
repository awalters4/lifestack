// components/Navbar.tsx
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-white shadow p-4 flex justify-between">
      <Link href="/" className="font-bold text-lg">
        LifeStack
      </Link>
      <div className="space-x-4">
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/login">Login</Link>
      </div>
    </nav>
  );
};

export default Navbar;
