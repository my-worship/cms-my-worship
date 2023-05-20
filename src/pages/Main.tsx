import React from "react";
import { Route, Routes } from "react-router-dom";
import { routes } from "../routes/routes";
import { MainLayouts } from "../components/molecules/MainLayouts";
import { NotFoundRoutesPage } from "../components/molecules/NotFoundRoutesPage";
import { MainLoadingDrawer } from "../components/molecules/MainLoadingDrawer";
import { useAppSelector } from "../redux/store";

export default function Main() {
  const { General } = useAppSelector((state) => state);
  return (
    <div className={"w-full"}>
      <MainLoadingDrawer
        open={General.loading !== undefined ? General.loading : false}
      />
      <Routes>
        {routes.map((item, i) => {
          const Page = item.components;
          return (
            <Route
              key={i}
              path={item.path}
              element={
                <MainLayouts>
                  <Page />
                </MainLayouts>
              }
            />
          );
        })}
        <Route path={"*"} element={<NotFoundRoutesPage />} />;
      </Routes>
    </div>
  );
}
