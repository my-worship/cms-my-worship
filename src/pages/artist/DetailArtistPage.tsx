import { HeaderLayouts } from "../../components/atoms/HeaderLayouts";
import React, { useEffect, useState } from "react";
import { IBreadCrumbList, TypeArtistStatus } from "../../utilities/type-utils";
import { StringRoutes } from "../../routes/string-routes";
import { Check, Close, Edit, QuestionMark } from "@mui/icons-material";
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
import { Btn } from "../../components/atoms/Btn";

export function DetailArtistPage() {
  const [dataDetail, setDataDetail] = useState<IResDetailArtist | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isOpenModalApprove, setIsOpenModalApprove] = useState<boolean>(false);
  const [isOpenModalReject, setIsOpenModalReject] = useState<boolean>(false);
  const [isOpenModalRevision, setIsOpenModalRevision] =
    useState<boolean>(false);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState<boolean>(false);
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
        if (isOpenModalReject) {
          dispatch(artistActions.rejectArtist(slug, data)).then();
        } else if (isOpenModalRevision) {
          dispatch(artistActions.revisionArtist(slug, data)).then();
        }
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
    } else if (Artist?.reviseArtist?.data) {
      dispatch(artistActions.resetArtistReducers()).then(() => {
        navigate(stringRoutes.artist());
        uiService.handleSnackbarSuccess("Artist Send Ned Revision Success");
      });
    } else if (Artist?.deleteArtist?.data) {
      dispatch(artistActions.resetArtistReducers()).then(() => {
        navigate(stringRoutes.artist());
        uiService.handleSnackbarSuccess("Artist delete Success");
      });
    }
  }, [Artist]);

  const breadCrumbData: IBreadCrumbList[] = [
    { path: stringRoutes.root(), label: "Home" },
    { path: stringRoutes.artist(), label: "Artist" },
    { label: "Artist Name" },
  ];

  function onClickActionsArtist(type: TypeArtistStatus | "delete") {
    if (slug) {
      if (type === "publish") {
        dispatch(artistActions.approveArtist(slug)).then();
      } else if (type === "reject") {
        formikReason.handleSubmit();
      } else if (type === "need-revision") {
        formikReason.handleSubmit();
      } else if (type === "delete") {
        dispatch(artistActions.deleteArtist(slug)).then();
      }
    }
  }

  function onCloseModal() {
    setIsOpenModalApprove(false);
    setIsOpenModalReject(false);
    setIsOpenModalRevision(false);
    setIsOpenModalDelete(false);
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
        <Tooltip
          arrow={true}
          title={"Revise"}
          onClick={() => setIsOpenModalRevision(true)}
        >
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

  function componentModalApproveDelete(type: "approve" | "delete") {
    return (
      <div className={""}>
        <PopupContent
          isLoading={
            Artist?.approveArtist?.loading || Artist?.deleteArtist?.loading
          }
          title={type === "approve" ? "Approve Artist" : "Delete Artist"}
          subTitle={"Have you checked the data clearly?"}
          image={assets.illustration.il_question}
        />
      </div>
    );
  }

  function componentModalRevisionReject(type: TypeArtistStatus) {
    return (
      <div className={"grid gap-2"}>
        <h3 className={"text-gray-600"}>
          {type === "reject" ? "Reject Artist" : "Revision Artist"}
        </h3>
        <InputTextarea
          label={type === "reject" ? "Reject Reason" : "Revision reason"}
          required={true}
          name={"reason"}
          placeholder={`Enter your reasons for ${
            type === "reject" ? "rejecting" : "revision"
          } this artist data`}
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
        components={componentModalApproveDelete("approve")}
        onSubmit={() => onClickActionsArtist("publish")}
      />
      <PopupModal
        isOpen={isOpenModalDelete}
        onClose={onCloseModal}
        onCancel={onCloseModal}
        components={componentModalApproveDelete("delete")}
        onSubmit={() => onClickActionsArtist("delete")}
      />
      <PopupModal
        isOpen={isOpenModalReject}
        onClose={onCloseModal}
        onCancel={onCloseModal}
        components={componentModalRevisionReject("reject")}
        onSubmit={() => onClickActionsArtist("reject")}
      />
      <PopupModal
        isOpen={isOpenModalRevision}
        onClose={onCloseModal}
        onCancel={onCloseModal}
        components={componentModalRevisionReject("need-revision")}
        onSubmit={() => onClickActionsArtist("need-revision")}
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
          <MainCard className={"w-1/2 grid gap-4 h-fit"}>
            <MainCard className={"h-fit"}>
              <Row justify={"space-between"} itemsAlign={"center"} gap={"sm"}>
                <div className={"text-slate-400"}>
                  <QuestionMark color={"inherit"} />
                </div>
                <Row fitContent itemsAlign={"center"} gap={"sm"}>
                  <Btn
                    variant={"outlined"}
                    color={"error"}
                    onClick={() => setIsOpenModalDelete(true)}
                  >
                    Delete
                  </Btn>
                  <Btn
                    onClick={() =>
                      navigate(stringRoutes.editArtist(slug ?? ""))
                    }
                    variant={"outlined"}
                  >
                    Edit
                  </Btn>
                </Row>
              </Row>
            </MainCard>
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
