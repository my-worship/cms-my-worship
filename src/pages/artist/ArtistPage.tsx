import React, { useEffect, useState } from "react";
import { HeaderLayouts } from "../../components/atoms/HeaderLayouts";
import { InputSearch } from "../../components/atoms/InputSearch";
import { Btn } from "../../components/atoms/Btn";
import { useNavigate } from "react-router-dom";
import { StringRoutes } from "../../routes/string-routes";
import {
  ITableColumnData,
  MainTable,
} from "../../components/molecules/ MainTable";
import { ArtistActions } from "../../redux/actions/artist.actions";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { IResListArtist } from "../../model/response/IResListArtist";
import { fakeImage } from "../../helper/fake-data-helper";
import { Chip } from "@mui/material";
import { IconBtnWithTooltip } from "../../components/atoms/IconBtnWithTooltip";
import { Info } from "@mui/icons-material";
import { Paginated } from "../../components/atoms/Paginated";
import { defaultPaginatedData } from "../../utilities/type-utils";
import { IResultPaginatedData } from "../../utilities/base-response";

export function ArtistPage() {
  const [paginatedData, setPaginatedData] =
    useState<IResultPaginatedData>(defaultPaginatedData);

  const stringRoutes = new StringRoutes();
  const navigate = useNavigate();
  const artistActions = new ArtistActions();
  const dispatch = useAppDispatch();
  const { Artist } = useAppSelector((state) => state);

  useEffect(() => {
    dispatch(artistActions.getListArtist("all")).then();
  }, []);

  useEffect(() => {
    if (Artist?.listArtist?.paginated_data) {
      setPaginatedData(Artist?.listArtist?.paginated_data);
    }
  }, [Artist.listArtist]);

  const tableColumnData: ITableColumnData[] = [
    { key: "Image", headerTitle: "Image", layouts: uiImage },
    { key: "title", headerTitle: "Title", layouts: uiTitle },
    { key: "status", headerTitle: "Status", layouts: uiStatus },
    { key: "actions", headerTitle: "Actions", layouts: uiActions },
  ];

  function uiActions() {
    return (
      <div>
        <IconBtnWithTooltip label={"Details"} icon={<Info />} />
      </div>
    );
  }

  function uiStatus(e: IResListArtist) {
    return (
      <div>
        <Chip color={"warning"} label={e.status_enum ?? "-"} />
      </div>
    );
  }

  function uiImage(e: IResListArtist) {
    return (
      <div>
        <img
          style={{ width: 100, height: 100, objectFit: "cover" }}
          src={fakeImage(400, 600)}
          alt={e.name}
        />
      </div>
    );
  }

  function uiTitle(e: IResListArtist) {
    return (
      <div>
        <div className={"font-semibold text-gray-700"}>{e?.name ?? "-"}</div>
      </div>
    );
  }

  return (
    <div className={"w-full grid gap-5"}>
      <HeaderLayouts title={"Artist"} />
      <div className={"w-full flex items-center justify-between"}>
        <InputSearch placeholder={"Search Artist Name.."} />
        <Btn onClick={() => navigate(stringRoutes.requestArtist())}>
          Request New Artist
        </Btn>
      </div>

      <div>
        <MainTable
          data={Artist?.listArtist?.data ?? []}
          column={tableColumnData}
        />
        <Paginated
          onChange={(e) => console.log("ini e paginated", e)}
          dataPaginated={paginatedData}
        />
      </div>
    </div>
  );
}
