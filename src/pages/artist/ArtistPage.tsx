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
import { Avatar, Chip } from "@mui/material";
import { IconBtnWithTooltip } from "../../components/atoms/IconBtnWithTooltip";
import { Info } from "@mui/icons-material";
import { Paginated } from "../../components/atoms/Paginated";
import {
  defaultPaginatedData,
  IPaginatedParams,
} from "../../utilities/type-utils";
import { IResultPaginatedData } from "../../utilities/base-response";
import { DateHelper } from "../../helper/date-helper";
import QueryParamsHelper from "../../helper/query-params-helper";

export function ArtistPage() {
  const [paginatedData, setPaginatedData] =
    useState<IResultPaginatedData>(defaultPaginatedData);

  const stringRoutes = new StringRoutes();
  const artistActions = new ArtistActions();
  const dateHelper = new DateHelper();
  const queryParamsHelper = new QueryParamsHelper();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { Artist } = useAppSelector((state) => state);

  useEffect(() => {
    fetchDataList();
  }, []);

  function fetchDataList(param?: string) {
    dispatch(artistActions.getListArtist("all", param)).then();
  }

  useEffect(() => {
    if (Artist?.listArtist?.paginated_data) {
      setPaginatedData(Artist?.listArtist?.paginated_data);
    }
  }, [Artist.listArtist]);

  function onChangePagination(e: IPaginatedParams) {
    const param = queryParamsHelper.getUrlParsingValue(e);
    fetchDataList(param);
    navigate({ search: param });
  }

  const tableColumnData: ITableColumnData[] = [
    {
      key: "Image",
      headerTitle: "Image",
      layouts: uiImage,
      headerClassName: "w-[5%]",
    },
    { key: "title", headerTitle: "Title", layouts: uiTitle },
    { key: "created_at", headerTitle: "Created Date", layouts: uiDate },
    {
      key: "status",
      headerTitle: "Status",
      layouts: uiStatus,
      headerClassName: "w-[10%]",
    },
    {
      key: "actions",
      headerTitle: "Actions",
      layouts: uiActions,
      headerClassName: "w-[5%]",
    },
  ];

  function uiActions(e: IResListArtist) {
    return (
      <div>
        <IconBtnWithTooltip
          onClick={() => navigate(stringRoutes.detailArtist(e.slug))}
          label={"Details"}
          icon={<Info />}
        />
      </div>
    );
  }

  function uiDate(e: IResListArtist) {
    return (
      <div>
        {e.created_at
          ? dateHelper.toFormatDate(e.created_at, "yyyy-MM-dd - HH:mm")
          : "-"}
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
        <Avatar src={e?.image} />
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
          isLoading={Artist?.listArtist?.loading}
          data={Artist?.listArtist?.data ?? []}
          column={tableColumnData}
        />
        <Paginated
          onChange={(e) => onChangePagination(e)}
          dataPaginated={paginatedData}
        />
      </div>
    </div>
  );
}
