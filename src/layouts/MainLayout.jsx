import { Outlet } from "react-router-dom";
import TopBar from "../components/layout/TopBar";

const MainLayout = () => {
  return (
    <>
      <TopBar />
      <main>
        <div>
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default MainLayout;
