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
import { Edit, Info } from "@mui/icons-material";
import { Paginated } from "../../components/atoms/Paginated";
import {
  defaultPaginatedData,
  IPaginatedParams,
  TypeArtistStatus,
} from "../../utilities/type-utils";
import { IResultPaginatedData } from "../../utilities/base-response";
import { DateHelper } from "../../helper/date-helper";
import QueryParamsHelper from "../../helper/query-params-helper";
import {
  dataListStatus,
  dataListStatusSuperAdmin,
} from "../../constants/StatusListConstants";
import { StatusEnum } from "../../enums/statusEnum";
import { UserRoleEnum } from "../../enums/UserRoleEnums";

export function ArtistPage() {
  const [paginatedData, setPaginatedData] =
    useState<IResultPaginatedData>(defaultPaginatedData);
  const [searchValue, setSearchValue] = useState<string>();
  const [isActiveSearch, setIsActiveSearch] = useState<boolean>(false);

  const stringRoutes = new StringRoutes();
  const artistActions = new ArtistActions();
  const dateHelper = new DateHelper();
  const queryParamsHelper = new QueryParamsHelper();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { Artist, User } = useAppSelector((state) => state);
  const [statusFilter, setStatusFilter] = useState<TypeArtistStatus>("all");

  const statusData =
    User.getMeData?.data?.role !== UserRoleEnum.SUPER_ADMIN
      ? dataListStatus
      : dataListStatusSuperAdmin;

  useEffect(() => {
    fetchDataList("all");
  }, []);

  function fetchDataList(status: TypeArtistStatus, param?: string) {
    dispatch(artistActions.getListArtist(status, param)).then();
  }

  function onSearchFunction(e: string) {
    setSearchValue(e);
    setIsActiveSearch(true);
    const param = queryParamsHelper.getUrlParsingValue({
      search: e,
      ...paginatedData,
    });
    fetchDataList(statusFilter, param);
    navigate({ search: param });
  }

  function onResetSearch() {
    setSearchValue(undefined);
    setIsActiveSearch(false);
  }

  useEffect(() => {
    if (Artist?.listArtist?.paginated_data) {
      setPaginatedData(Artist?.listArtist?.paginated_data);
    }
  }, [Artist.listArtist]);

  function onClickChipsStatus(e: TypeArtistStatus) {
    setStatusFilter(e);
    fetchDataList(e);
    setSearchValue("");
    setIsActiveSearch(false);
    navigate({ search: "" });
  }

  function onChangePagination(e: IPaginatedParams) {
    const param = queryParamsHelper.getUrlParsingValue(e);
    fetchDataList(statusFilter, param);
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
          icon={e.status_enum === StatusEnum.DRAFT ? <Edit /> : <Info />}
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
      <div className={"w-full flex items-center"}>
        {e.status_enum === "PENDING" && (
          <Chip
            className={"w-full"}
            color={"warning"}
            label={e.status_string.toUpperCase() ?? "-"}
          />
        )}
        {e.status_enum === "REJECT" && (
          <Chip
            className={"w-full"}
            color={"error"}
            label={e.status_string.toUpperCase() ?? "-"}
          />
        )}
        {e.status_enum === "NEED_REVISION" && (
          <Chip
            className={"w-full"}
            color={"secondary"}
            label={e.status_string.toUpperCase() ?? "-"}
          />
        )}
        {e.status_enum === "PUBLISH" && (
          <Chip
            className={"w-full"}
            color={"success"}
            label={e.status_string.toUpperCase() ?? "-"}
          />
        )}
        {e.status_enum === "DRAFT" && (
          <Chip
            className={"w-full"}
            color={"default"}
            label={e.status_string.toUpperCase() ?? "-"}
          />
        )}
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

  function chipsListStatus() {
    return (
      <div className={"flex items-center gap-3"}>
        {statusData.map((item, i) => (
          <div key={i}>
            <Chip
              color={item.value === statusFilter ? "primary" : undefined}
              variant={item.value === statusFilter ? "outlined" : "filled"}
              label={item.label}
              onClick={() => onClickChipsStatus(item.value)}
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={"w-full grid gap-5"}>
      <HeaderLayouts title={"Artist"} />
      <div className={"w-full flex items-center justify-between"}>
        <InputSearch
          values={searchValue}
          isActiveSearch={isActiveSearch}
          onReset={onResetSearch}
          onSearch={onSearchFunction}
          placeholder={"Search Artist Name.."}
        />
        <Btn onClick={() => navigate(stringRoutes.requestArtist())}>
          Request New Artist
        </Btn>
      </div>

      {chipsListStatus()}
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
