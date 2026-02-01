import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router";

const Layout = () => {
  return (
    <div className="flex flex-col ">
      <Header />
      <main className="grow h-full px-4 py-6">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
