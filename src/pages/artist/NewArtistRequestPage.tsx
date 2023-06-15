import React, { useEffect, useState } from "react";
import { HeaderLayouts } from "../../components/atoms/HeaderLayouts";
import { IBreadCrumbList } from "../../utilities/type-utils";
import { StringRoutes } from "../../routes/string-routes";
import { MainCard } from "../../components/atoms/MainCard";
import { InputText } from "../../components/atoms/InputText";
import { InputTextarea } from "../../components/atoms/InputTextArea";
import { EditorCustoms } from "../../components/atoms/EditorCustoms";
import { Btn } from "../../components/atoms/Btn";
import { IRequestNewArtist } from "../../model/request/IRequestNewArtist";
import { useFormik } from "formik";
import * as yup from "yup";
import { FileUploadAreaBox } from "../../components/atoms/FileUploadAreaBox";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { ArtistActions } from "../../redux/actions/artist.actions";
import { UiServices } from "../../services/UiServices";
import { useNavigate, useParams } from "react-router-dom";
import { IResDetailArtist } from "../../model/response/IResDetailArtist";

export function NewArtistRequestPage() {
  const [saveDraft, setSaveDraf] = useState<boolean>(false);
  const [slug, setSlug] = useState<string | undefined>();
  const [dataDetail, setDataDetail] = useState<IResDetailArtist | undefined>(
    undefined
  );
  const dispatch = useAppDispatch();
  const { Artist } = useAppSelector((state) => state);
  const artistActions = new ArtistActions();
  const uiService = new UiServices();
  const navigate = useNavigate();
  const stringRoutes = new StringRoutes();
  const params = useParams();
  const initValueCreate: IRequestNewArtist = {
    name: "",
    notes: "",
    description: "",
    image: "",
  };
  const formik = useFormik({
    initialValues: initValueCreate,
    validationSchema: yup.object({
      name: yup.string().required(),
      notes: yup.string(),
      description: yup.string().required(),
    }),
    onSubmit: (value) => {
      const data: IRequestNewArtist = {
        name: value.name,
        notes: value.notes ? value.notes : undefined,
        description: value.description,
        image: value?.image ? value?.image : undefined,
      };
      setTimeout(() => {
        if (saveDraft) {
          dispatch(artistActions.saveDraftArtist(data)).then();
        } else if (slug) {
          dispatch(artistActions.editArtist(slug, data)).then();
        } else {
          dispatch(artistActions.createArtist(data)).then();
        }
      }, 200);
    },
  });

  useEffect(() => {
    if (params?.slug) {
      setSlug(params?.slug);
    }
  }, [params]);

  useEffect(() => {
    if (Artist?.detailArtist?.data) {
      setDataDetail(Artist?.detailArtist?.data);
    } else {
      setDataDetail(undefined);
    }
  }, [Artist?.detailArtist?.data]);

  useEffect(() => {
    if (slug) {
      dispatch(artistActions.getDetailArtistBySlug(slug)).then();
    }
  }, [slug]);

  useEffect(() => {
    if (dataDetail) {
      formik.setFieldValue("name", dataDetail.name);
      formik.setFieldValue("notes", dataDetail.request_note);
      formik.setFieldValue("description", dataDetail.description);
      formik.setFieldValue("image", dataDetail.image);
    } else {
      formik.setFieldValue("name", "");
      formik.setFieldValue("notes", "");
      formik.setFieldValue("description", "");
      formik.setFieldValue("image", "");
    }
  }, [dataDetail]);

  useEffect(() => {
    if (Artist.createArtist?.data) {
      uiService.handleSnackbarSuccess("Artist Success Requested");
      navigate(stringRoutes.artist());
      dispatch(artistActions.resetArtistReducers()).then();
    } else if (Artist.approveArtist?.data) {
      uiService.handleSnackbarSuccess("Save Artist Draft Success");
      navigate(stringRoutes.artist());
      dispatch(artistActions.resetArtistReducers()).then();
    } else if (Artist.editArtist?.data) {
      dispatch(artistActions.resetArtistReducers()).then(() => {
        uiService.handleSnackbarSuccess("Artist Edit Success");
        navigate(stringRoutes.artist());
      });
    }
  }, [Artist.createArtist, Artist.approveArtist, Artist.editArtist]);

  const breadcrumb: IBreadCrumbList[] = [
    { path: stringRoutes.artist(), label: "Artist" },
    { label: slug ? "Edit" : "New" },
  ];

  function rightContent() {
    return (
      <Btn
        variant={"outlined"}
        color={"info"}
        onClick={() => {
          setSaveDraf(true);
          formik.handleSubmit();
        }}
      >
        Save Draft
      </Btn>
    );
  }

  return (
    <div className={"grid gap-6"}>
      <HeaderLayouts
        rightContent={
          (!slug || dataDetail?.status === "DRAFT") && rightContent()
        }
        title={slug ? "Edit Artist" : "Request New Artist"}
        breadcrumbData={breadcrumb}
      />
      <MainCard>
        <div className={"max-w-3xl mx-auto grid gap-10 text-center"}>
          <div>
            <h1>Please fill in the artist data you requested</h1>
            <p className={"text-slate-400 max-w-xl mx-auto"}>
              please fill in complete data for validation purposes so that there
              is no unclear data for our platform
            </p>
          </div>
          <div className={"grid gap-6"}>
            <div className={"w-full h-40"}>
              <FileUploadAreaBox
                url={formik.values.image}
                onChange={(e) => formik.setFieldValue("image", e)}
              />
            </div>
            <InputText
              label={"Artist Name"}
              required={true}
              name={"name"}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              id={"name"}
              errorMessage={formik.touched.name && formik.errors.name}
            />
            <InputTextarea
              value={formik.values.notes}
              label={"Request Note (optional)"}
              name={"notes"}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id={"notes"}
              errorMessage={formik.touched.notes && formik.errors.notes}
            />
            <EditorCustoms
              value={formik.values.description}
              onChange={(e) => formik.setFieldValue("description", e)}
              placeholder={"Artist Description"}
            />
            <Btn onClick={() => formik.handleSubmit()}>Submit</Btn>
          </div>
        </div>
      </MainCard>
    </div>
  );
}
