// components/Layout.tsx
import Navbar from "./Navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <Navbar />
      <main className="p-4">{children}</main>
    </div>
  );
};

export default Layout;
