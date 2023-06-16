import { HeaderLayouts } from "../../components/atoms/HeaderLayouts";
import { IBreadCrumbList, ILabelValue } from "../../utilities/type-utils";
import { StringRoutes } from "../../routes/string-routes";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import React from "react";
import { ArtistActions } from "../../redux/actions/artist.actions";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { MainCard } from "../../components/atoms/MainCard";
import { FileUploadAreaBox } from "../../components/atoms/FileUploadAreaBox";
import { IReqCreateNewLyrics } from "../../model/request/IReqCreateNewLyrics";
import * as yup from "yup";
import { useFormik } from "formik";
import { InputText } from "../../components/atoms/InputText";
import { InputTextarea } from "../../components/atoms/InputTextArea";
import InputAutoComplete from "../../components/atoms/InputAutoComplete";
import InputMultipleAutoComplete from "../../components/atoms/InputMultipleAutoComplete";
import { EditorCustoms } from "../../components/atoms/EditorCustoms";

export function NewEditLyricPage() {
  const [slug, setSlug] = useState<string>("");
  const [dataListArtist, setDataListArtist] = useState<ILabelValue<string>[]>(
    []
  );

  const stringRoutes = new StringRoutes();
  const artistActions = new ArtistActions();

  const dispatch = useAppDispatch();
  const params = useParams();
  const { Artist } = useAppSelector((state) => state);
  const initValueCreate: IReqCreateNewLyrics = {
    lyric: "",
    notes: "",
    image: "",
    description: "",
    title: "",
    artist_slug: "",
    categories_id: [],
  };

  const validationScheme = yup.object({
    lyric: yup.string().required(),
    notes: yup.string(),
    image: yup.string(),
    description: yup.string().required(),
    title: yup.string().required(),
    artist_slug: yup.string().required(),
    categories_id: yup.array().required(),
  });

  const formik = useFormik({
    initialValues: initValueCreate,
    validationSchema: validationScheme,
    onSubmit: (values) => {
      console.table(values);
    },
  });

  const breadcrumb: IBreadCrumbList[] = [
    { path: stringRoutes.root(), label: "Home" },
    { path: stringRoutes.lyrics(), label: "Lyrics" },
    { label: slug ? "Edit" : "New" },
  ];

  useEffect(() => {
    dispatch(artistActions.getListArtistSelect()).then();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      formik.setFieldValue("artist_slug", "artist-from-admin");
    }, 1000);
  }, []);

  useEffect(() => {
    if (Artist.listArtistSelect?.data) {
      const data: ILabelValue<string>[] = Artist.listArtistSelect.data.map(
        (item) => {
          return {
            label: item.name,
            value: item.slug,
          };
        }
      );
      setDataListArtist(data);
    }
  }, [Artist.listArtistSelect]);

  useEffect(() => {
    if (params?.slug) {
      setSlug(params?.slug);
    }
  }, [params]);

  return (
    <div className={"grid gap-6"}>
      <HeaderLayouts title={"New Lyric"} breadcrumbData={breadcrumb} />
      <MainCard className={"flex"}>
        <div className={"max-w-3xl mx-auto grid gap-10 text-center"}>
          <div>
            <div>
              <h1>Please fill in the lyric data you requested</h1>
              <p className={"text-slate-400 max-w-xl mx-auto"}>
                please fill in complete data for validation purposes so that
                there is no unclear data for our platform
              </p>
            </div>
            <div className={"grid gap-6 mt-6"}>
              <div className={"w-full h-40"}>
                <FileUploadAreaBox
                  url={formik.values.image}
                  onChange={(e) => formik.setFieldValue("image", e)}
                />
              </div>
              <InputText
                label={"Title"}
                required={true}
                name={"title"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.title}
                id={"title"}
                placeholder={"insert lyric title"}
                errorMessage={formik.touched.title && formik.errors.title}
              />
              <InputTextarea
                label={"Request Notes"}
                name={"notes"}
                placeholder={"Insert request notes"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.notes}
                id={"notes"}
                errorMessage={formik.touched.notes && formik.errors.notes}
              />
              <InputAutoComplete
                value={formik.values.artist_slug}
                onChange={(e) => {
                  formik.setFieldValue("artist_slug", e ?? "");
                }}
                id={"artist"}
                placeholder={"Select Artist"}
                label={"Artist"}
                loading={Artist.listArtistSelect?.loading}
                options={dataListArtist}
              />
              <InputMultipleAutoComplete />

              <EditorCustoms
                value={formik.values.description}
                onChange={(e) => formik.setFieldValue("description", e)}
                placeholder={"Lyric Description"}
              />
              <EditorCustoms
                value={formik.values.description}
                onChange={(e) => formik.setFieldValue("description", e)}
                placeholder={"Lyrics"}
              />
            </div>
          </div>
        </div>
      </MainCard>
    </div>
  );
}
