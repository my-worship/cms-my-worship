import React from "react";
import { HeaderLayouts } from "../../components/atoms/HeaderLayouts";
import { InputSearch } from "../../components/atoms/InputSearch";
import { Btn } from "../../components/atoms/Btn";
import { useNavigate } from "react-router-dom";
import { StringRoutes } from "../../routes/string-routes";

export function ArtistPage() {
  const stringRoutes = new StringRoutes();
  const navigate = useNavigate();
  return (
    <div className={"w-full grid gap-5"}>
      <HeaderLayouts title={"Artist"} />
      <div className={"w-full flex items-center justify-between"}>
        <InputSearch />
        <Btn onClick={() => navigate(stringRoutes.requestArtist())}>
          Request New Artist
        </Btn>
      </div>
    </div>
  );
}
