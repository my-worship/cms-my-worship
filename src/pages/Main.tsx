import React from "react";
import { Route, Routes } from "react-router-dom";
import { routes } from "../routes/routes";
import { MainLayouts } from "../components/molecules/MainLayouts";
import { NotFoundRoutesPage } from "../components/molecules/NotFoundRoutesPage";

export default function Main() {
  return (
    <div className={"w-full"}>
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
