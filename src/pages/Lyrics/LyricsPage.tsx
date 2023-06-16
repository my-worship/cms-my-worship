import React, { useEffect } from "react";
import { HeaderLayouts } from "../../components/atoms/HeaderLayouts";
import { Btn } from "../../components/atoms/Btn";
import { Link, useNavigate } from "react-router-dom";
import { StringRoutes } from "../../routes/string-routes";
import { IBreadCrumbList } from "../../utilities/type-utils";
import { InputSearch } from "../../components/atoms/InputSearch";
import { Row } from "../../components/atoms/Row";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { LyricsActions } from "../../redux/actions/lyrics.actions";
import { IResListLyrics } from "../../model/response/IResListLyrics";
import {
  ITableColumnData,
  MainTable,
} from "../../components/molecules/ MainTable";
import { DateHelper } from "../../helper/date-helper";
import { StatusEnum } from "../../enums/statusEnum";
import { Chip } from "@mui/material";
import { IconBtnWithTooltip } from "../../components/atoms/IconBtnWithTooltip";
import { Edit, Info } from "@mui/icons-material";
import { ImagePreview } from "../../components/atoms/ImagePreview";

export function LyricsPage() {
  const stringRoutes = new StringRoutes();
  const lyricActions = new LyricsActions();
  const dateHelper = new DateHelper();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { Lyric } = useAppSelector((state) => state);
  const breadCrumb: IBreadCrumbList[] = [
    { path: stringRoutes.root(), label: "Home" },
    { label: "Lyrics" },
  ];

  const tableColumnData: ITableColumnData[] = [
    {
      key: "image",
      headerTitle: "Image",
      layouts: uiImage,
    },
    {
      key: "title",
      headerTitle: "Title",
      layouts: uiName,
    },
    {
      key: "artis_name",
      headerTitle: "Artist",
      layouts: uiArtist,
    },
    {
      key: "created_by",
      headerTitle: "Created By",
      value: "created_by",
    },
    {
      key: "created_date",
      headerTitle: "Created Date",
      layouts: uiDate,
    },
    {
      key: "status",
      headerTitle: "Status",
      layouts: uiStatus,
    },
    {
      key: "actions",
      headerTitle: "Actions",
      layouts: uiActions,
    },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    dispatch(lyricActions.getListLyricPaginated("all")).then();
  }

  function uiName(e: IResListLyrics) {
    return <div className={"font-semibold"}>{e.title}</div>;
  }

  function uiArtist(e: IResListLyrics) {
    return (
      <Link to={stringRoutes.detailArtist(e.artis_slug)}>{e.artis_name}</Link>
    );
  }

  function uiImage(e: IResListLyrics) {
    return (
      <div>
        <ImagePreview alt={e.title} src={e?.image} />
      </div>
    );
  }

  function uiDate(e: IResListLyrics) {
    return (
      <div>
        {e.created_at
          ? dateHelper.toFormatDate(e.created_at, "yyyy-MM-dd - HH:mm")
          : "-"}
      </div>
    );
  }

  function uiStatus(e: IResListLyrics) {
    if (e.status_enum === StatusEnum.PENDING) {
      return (
        <div className={"w-full flex items-center"}>
          <Chip
            className={"w-full"}
            color={"warning"}
            label={e.status_string.toUpperCase() ?? "-"}
          />
        </div>
      );
    } else if (e.status_enum === StatusEnum.PUBLISH) {
      return (
        <div className={"w-full flex items-center"}>
          <Chip
            className={"w-full"}
            color={"success"}
            label={e.status_string.toUpperCase() ?? "-"}
          />
        </div>
      );
    } else {
      return (
        <div className={"w-full flex items-center"}>
          <Chip
            className={"w-full"}
            label={e.status_string.toUpperCase() ?? "-"}
          />
        </div>
      );
    }
  }

  function uiActions(e: IResListLyrics) {
    return (
      <div>
        <IconBtnWithTooltip
          onClick={() =>
            navigate(
              e.status_enum === StatusEnum.DRAFT
                ? stringRoutes.editArtist(e.slug)
                : stringRoutes.detailArtist(e.slug)
            )
          }
          label={"Details"}
          icon={e.status_enum === StatusEnum.DRAFT ? <Edit /> : <Info />}
        />
      </div>
    );
  }

  return (
    <div className={"grid gap-6"}>
      <HeaderLayouts title={"Lyrics"} breadcrumbData={breadCrumb} />
      <Row itemsAlign={"center"} justify={"space-between"}>
        <InputSearch placeholder={"Search Artist..."} />
        <Btn onClick={() => navigate(stringRoutes.newLyrics())}>New Lyric</Btn>
      </Row>
      <MainTable
        isLoading={Lyric?.listLyric?.loading}
        data={Lyric?.listLyric?.data ?? []}
        column={tableColumnData}
      />
    </div>
  );
}
