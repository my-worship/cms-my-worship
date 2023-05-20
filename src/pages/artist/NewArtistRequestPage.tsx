import React, { useEffect } from "react";
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
import { useNavigate } from "react-router-dom";

export function NewArtistRequestPage() {
  const dispatch = useAppDispatch();
  const { Artist } = useAppSelector((state) => state);
  const artistActions = new ArtistActions();
  const uiService = new UiServices();
  const navigate = useNavigate();
  const stringRoutes = new StringRoutes();

  useEffect(() => {
    console.log(Artist.createArtist);
    if (Artist.createArtist) {
      uiService.handleSnackbarSuccess("Artist Success Requested");
      navigate(stringRoutes.artist());
      dispatch(artistActions.resetArtistReducers()).then();
    }
  }, [Artist.createArtist]);

  const initValueCreate: IRequestNewArtist = {
    name: "",
    notes: "",
    description: "",
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
      };
      dispatch(artistActions.createArtist(data)).then();
    },
  });
  const breadcrumb: IBreadCrumbList[] = [
    { path: stringRoutes.artist(), label: "Artist" },
    { label: "New" },
  ];
  return (
    <div className={"grid gap-6"}>
      <HeaderLayouts title={"Request New Artist"} breadcrumbData={breadcrumb} />
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
              <FileUploadAreaBox onChange={(e) => console.log(e)} />
            </div>
            <InputText
              label={"Artist Name"}
              required={true}
              name={"name"}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id={"name"}
              errorMessage={formik.touched.name && formik.errors.name}
            />
            <InputTextarea
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
