import { HeaderLayouts } from "../../components/atoms/HeaderLayouts";
import React, { useEffect, useState } from "react";
import { IBreadCrumbList } from "../../utilities/type-utils";
import { StringRoutes } from "../../routes/string-routes";
import { Check, Close, Edit } from "@mui/icons-material";
import Tooltip from "@mui/material/Tooltip";
import { Button } from "@mui/material";
import { Row } from "../../components/atoms/Row";
import { Col } from "../../components/atoms/Col";
import { MainCard } from "../../components/atoms/MainCard";
import { InlineColText } from "../../components/atoms/InlineColText";
import { ArtistActions } from "../../redux/actions/artist.actions";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { useParams } from "react-router-dom";
import { IResDetailArtist } from "../../model/response/IResDetailArtist";
import { LoadingCard } from "../../components/atoms/LoadingCard";
import { checkMappingData } from "../../helper/utils-helper";
import { DateHelper } from "../../helper/date-helper";
import { FormatDateConstants } from "../../constants/formatDateConstants";

export function DetailArtistPage() {
  const [dataDetail, setDataDetail] = useState<IResDetailArtist | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const stringRoutes = new StringRoutes();
  const artistActions = new ArtistActions();
  const dateHelper = new DateHelper();

  const dispatch = useAppDispatch();
  const { Artist } = useAppSelector((state) => state);
  const params = useParams();
  const slug = params?.slug;

  useEffect(() => {
    if (slug) {
      dispatch(artistActions.getDetailArtistBySlug(slug));
    }
  }, [slug]);

  useEffect(() => {
    if (Artist?.detailArtist?.loading && !dataDetail) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [Artist?.detailArtist?.loading, dataDetail]);

  useEffect(() => {
    if (Artist.detailArtist?.data) {
      setDataDetail(Artist?.detailArtist?.data);
    }
  }, [Artist.detailArtist]);

  const breadCrumbData: IBreadCrumbList[] = [
    { path: stringRoutes.root(), label: "Home" },
    { path: stringRoutes.artist(), label: "Artist" },
    { label: "Artist Name" },
  ];

  function rightContentHeader() {
    return (
      <Row itemsAlign={"center"} gap={"sm"}>
        <Tooltip arrow={true} title={"Reject"}>
          <Button color={"error"} variant={"outlined"}>
            <Close />
          </Button>
        </Tooltip>
        <Tooltip arrow={true} title={"Revise"}>
          <Button color={"info"} variant={"outlined"}>
            <Edit />
          </Button>
        </Tooltip>
        <Tooltip arrow={true} title={"Approve"}>
          <Button color={"success"} variant={"outlined"}>
            <Check />
          </Button>
        </Tooltip>
      </Row>
    );
  }

  return (
    <Col gap={"lg"}>
      <HeaderLayouts
        rightContent={rightContentHeader()}
        breadcrumbData={breadCrumbData}
        title={"Artist Detail"}
      />
      {isLoading ? (
        <LoadingCard />
      ) : (
        <div className={"flex  justify-between gap-4"}>
          <MainCard className={"w-1/2"}>
            <h1>{checkMappingData(dataDetail?.name)}</h1>
            <div className={"content_html mt-3"}>
              <div
                dangerouslySetInnerHTML={{
                  __html: checkMappingData(dataDetail?.description),
                }}
              />
            </div>
          </MainCard>
          <MainCard className={"w-1/2"}>
            <Row gap={"lg"}>
              {dataDetail?.image && (
                <img alt={"name"} className={"w-1/2"} src={dataDetail?.image} />
              )}
              <Col gap={"lg"} className={"flex-1"}>
                <InlineColText
                  isBorderBottom
                  label={"Request By"}
                  value={checkMappingData(dataDetail?.created_by)}
                />
                <InlineColText
                  isBorderBottom
                  label={"Request Date"}
                  value={
                    dataDetail?.created_date
                      ? dateHelper.toFormatDate(
                          new Date(dataDetail?.created_date),
                          FormatDateConstants.yyyy_MM_dd_dot_HH_mm
                        )
                      : "-"
                  }
                />
                <InlineColText
                  label={"Request Notes"}
                  value={checkMappingData(dataDetail?.request_note)}
                />
              </Col>
            </Row>
          </MainCard>
        </div>
      )}
    </Col>
  );
}
