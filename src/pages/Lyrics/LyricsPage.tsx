import React from "react";
import { HeaderLayouts } from "../../components/atoms/HeaderLayouts";
import { Btn } from "../../components/atoms/Btn";
import { MainCard } from "../../components/atoms/MainCard";
import { useNavigate } from "react-router-dom";
import { StringRoutes } from "../../routes/string-routes";

export function LyricsPage() {
  const navigate = useNavigate();
  const stringRoutes = new StringRoutes();

  return (
    <>
      <HeaderLayouts title={"Lyrics"} />
      <Btn onClick={() => navigate(stringRoutes.newLyrics())}>Submit</Btn>
      <MainCard className={"mt-10"}>
        <h1>HELLO EVERY BODY</h1>
      </MainCard>
    </>
  );
}
