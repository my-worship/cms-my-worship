import React from "react";
import { HeaderLayouts } from "../../components/atoms/HeaderLayouts";
import { Btn } from "../../components/atoms/Btn";
import { MainCard } from "../../components/atoms/MainCard";

export function LyricsPage() {
  return (
    <>
      <HeaderLayouts title={"Lyrics"} />
      <Btn>Submit</Btn>
      <MainCard className={"mt-10"}>
        <h1>HELLO EVERY BODY</h1>
      </MainCard>
    </>
  );
}
