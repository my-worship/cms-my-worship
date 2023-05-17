import { Route, Routes } from "react-router-dom";
import { routes } from "../routes/routes";
import { MainLayouts } from "../components/molecules/MainLayouts";

export default function Main() {
  return (
    <div className={"w-full"}>
      <MainLayouts>
        <Routes>
          {routes.map((item, i) => {
            const Page = item.components;
            return <Route key={i} path={item.path} element={<Page />} />;
          })}
        </Routes>
      </MainLayouts>
    </div>
  );
}
