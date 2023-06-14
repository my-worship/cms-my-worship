import { HeaderLayouts } from "../../components/atoms/HeaderLayouts";
import React, { useEffect, useState } from "react";
import { IBreadCrumbList, TypeArtistStatus } from "../../utilities/type-utils";
import { StringRoutes } from "../../routes/string-routes";
import { Check, Close, Edit } from "@mui/icons-material";
import Tooltip from "@mui/material/Tooltip";
import { Alert, Button } from "@mui/material";
import { Row } from "../../components/atoms/Row";
import { Col } from "../../components/atoms/Col";
import { MainCard } from "../../components/atoms/MainCard";
import { InlineColText } from "../../components/atoms/InlineColText";
import { ArtistActions } from "../../redux/actions/artist.actions";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { useNavigate, useParams } from "react-router-dom";
import { IResDetailArtist } from "../../model/response/IResDetailArtist";
import { LoadingCard } from "../../components/atoms/LoadingCard";
import { checkMappingData } from "../../helper/utils-helper";
import { DateHelper } from "../../helper/date-helper";
import { FormatDateConstants } from "../../constants/formatDateConstants";
import { PopupModal } from "../../components/atoms/PopupModal";
import { assets } from "../../constants/assets";
import { PopupContent } from "../../components/atoms/PopupContent";
import { UiServices } from "../../services/UiServices";
import { UserRoleEnum } from "../../enums/UserRoleEnums";
import { InputTextarea } from "../../components/atoms/InputTextArea";
import { useFormik } from "formik";
import * as yup from "yup";
import { IReqRejectReviseArtist } from "../../model/request/IReqRejectReviseArtist";

export function DetailArtistPage() {
  const [dataDetail, setDataDetail] = useState<IResDetailArtist | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isOpenModalApprove, setIsOpenModalApprove] = useState<boolean>(false);
  const [isOpenModalReject, setIsOpenModalReject] = useState<boolean>(false);
  const stringRoutes = new StringRoutes();
  const artistActions = new ArtistActions();
  const dateHelper = new DateHelper();
  const uiService = new UiServices();
  const dispatch = useAppDispatch();
  const { Artist, User } = useAppSelector((state) => state);
  const params = useParams();
  const slug = params?.slug;
  const navigate = useNavigate();

  const formikReason = useFormik({
    initialValues: {
      reason: "",
    },
    validationSchema: yup.object({
      reason: yup.string().required(),
    }),
    onSubmit: (values) => {
      const data: IReqRejectReviseArtist = {
        reason: values.reason,
      };
      if (slug) {
        dispatch(artistActions.rejectArtist(slug, data)).then();
      }
    },
  });

  useEffect(() => {
    if (slug) {
      dispatch(artistActions.getDetailArtistBySlug(slug)).then();
    }
  }, [slug]);

  useEffect(() => {
    if (Artist?.detailArtist?.loading) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [Artist?.detailArtist?.loading, dataDetail]);

  useEffect(() => {
    if (Artist.detailArtist?.data) {
      setDataDetail(Artist?.detailArtist?.data);
    }
    if (Artist?.approveArtist?.data) {
      dispatch(artistActions.resetArtistReducers()).then(() => {
        navigate(stringRoutes.artist());
        uiService.handleSnackbarSuccess("Artist Success Approved");
      });
    } else if (Artist?.rejectArtist?.data) {
      dispatch(artistActions.resetArtistReducers()).then(() => {
        navigate(stringRoutes.artist());
        uiService.handleSnackbarSuccess("Artist Success Approved");
      });
    }
  }, [Artist]);

  const breadCrumbData: IBreadCrumbList[] = [
    { path: stringRoutes.root(), label: "Home" },
    { path: stringRoutes.artist(), label: "Artist" },
    { label: "Artist Name" },
  ];

  function onClickActionsArtist(type: TypeArtistStatus) {
    if (slug) {
      if (type === "publish") {
        dispatch(artistActions.approveArtist(slug)).then();
      } else if (type === "reject") {
        formikReason.handleSubmit();
      }
    }
  }

  function onCloseModal() {
    setIsOpenModalApprove(false);
    setIsOpenModalReject(false);
  }

  function rightContentHeader() {
    return (
      <Row itemsAlign={"center"} gap={"sm"}>
        <Tooltip arrow={true} title={"Reject"}>
          <Button
            onClick={() => setIsOpenModalReject(true)}
            color={"error"}
            variant={"outlined"}
          >
            <Close />
          </Button>
        </Tooltip>
        <Tooltip arrow={true} title={"Revise"}>
          <Button color={"info"} variant={"outlined"}>
            <Edit />
          </Button>
        </Tooltip>
        <Tooltip arrow={true} title={"Approve"}>
          <Button
            onClick={() => setIsOpenModalApprove(true)}
            color={"success"}
            variant={"outlined"}
          >
            <Check />
          </Button>
        </Tooltip>
      </Row>
    );
  }

  function componentModalApprove() {
    return (
      <div className={""}>
        <PopupContent
          isLoading={Artist?.approveArtist?.loading}
          title={"Approve Artist"}
          subTitle={"Have you checked the data clearly?"}
          image={assets.illustration.il_question}
        />
      </div>
    );
  }

  function componentModalReject() {
    return (
      <div className={"grid gap-2"}>
        <h3 className={"text-gray-600"}>Reject Artist</h3>
        <InputTextarea
          label={"Reject Reason"}
          required={true}
          name={"reason"}
          placeholder={"Enter your reasons for rejecting this artist data"}
          onChange={formikReason.handleChange}
          onBlur={formikReason.handleBlur}
          id={"reject_reason"}
          value={formikReason.values.reason}
          errorMessage={
            formikReason.touched.reason && formikReason.errors.reason
          }
        />
      </div>
    );
  }

  return (
    <Col gap={"lg"}>
      <PopupModal
        isOpen={isOpenModalApprove}
        onClose={onCloseModal}
        onCancel={onCloseModal}
        components={componentModalApprove()}
        onSubmit={() => onClickActionsArtist("publish")}
      />
      <PopupModal
        isOpen={isOpenModalReject}
        onClose={onCloseModal}
        onCancel={onCloseModal}
        components={componentModalReject()}
        onSubmit={() => onClickActionsArtist("reject")}
      />
      <HeaderLayouts
        rightContent={
          dataDetail?.status === "PENDING" &&
          User?.getMeData?.data?.role &&
          User?.getMeData?.data?.role === UserRoleEnum.SUPER_ADMIN &&
          rightContentHeader()
        }
        breadcrumbData={breadCrumbData}
        title={"Artist Detail"}
      />
      {isLoading ? (
        <LoadingCard />
      ) : (
        <div className={"flex  justify-between gap-4"}>
          <MainCard className={"w-1/2"}>
            {dataDetail?.status === "NEED_REVISION" && (
              <div className={"mb-3"}>
                <Alert severity="info">
                  <div className={"font-semibold"}>Need Revision</div>
                  <p>{checkMappingData(dataDetail?.revision_notes)}</p>
                </Alert>
              </div>
            )}
            {dataDetail?.status === "REJECT" && (
              <div className={"mb-3"}>
                <Alert severity="error">
                  <div className={"font-semibold"}>Rejected</div>
                  <p>{checkMappingData(dataDetail?.reject_reason)}</p>
                </Alert>
              </div>
            )}
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
