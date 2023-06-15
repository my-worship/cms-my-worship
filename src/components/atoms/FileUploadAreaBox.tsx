import React, { useEffect, useRef, useState } from "react";
import { Btn } from "./Btn";
import axios, { AxiosResponse } from "axios";
import swal from "sweetalert";
import { DriveFolderUpload } from "@mui/icons-material";

export function FileUploadAreaBox(props: IProps) {
  const [preview, setPreview] = useState("");
  const [loadingUpload, setLoadingUpload] = useState<boolean>(false);
  const inputRef: any = useRef();

  useEffect(() => {
    if (props.url) {
      setPreview(props.url);
    }
  }, [props.url]);

  useEffect(() => {
    if (preview) {
      props.onChange(preview);
    } else {
      props.onChange(undefined);
    }
  }, [preview]);

  const uploadProcess = async (files: File) => {
    setLoadingUpload(true);
    const formData: FormData = new FormData();
    if (files !== null) {
      formData.append("file", files);
    } else {
      swal("Gagal", "Format Tidak Di Dukung", "error").then(() => null);
    }
    await axios
      .post(process.env.REACT_APP_BASE_ENDPOINT + "/upload", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res: AxiosResponse) => {
        setLoadingUpload(false);
        setPreview(res.data?.response_data?.url);
      })
      .catch(() => {
        setLoadingUpload(false);
        setLoadingUpload(false);
      });
  };
  return (
    <div className={"flex h-full w-full"}>
      <div
        className={`${
          !props.errorMessage ? "border-slate-500" : " bg-red-50"
        } w-full  h-full  rounded-md p-4 border flex items-center justify-between`}
      >
        <div
          className={"h-full my-auto flex items-center justify-center w-fit "}
        >
          {!preview ? (
            <Btn onClick={() => inputRef?.current?.click()} variant={"text"}>
              <div className={"flex items-center gap-3"}>
                <DriveFolderUpload />
                <div>Upload Image</div>
              </div>
            </Btn>
          ) : (
            <Btn onClick={() => setPreview("")} color={"error"}>
              DELETED
            </Btn>
          )}
        </div>
        {loadingUpload && !preview && <h1>LOADING</h1>}
        {preview && (
          <div className={"relative"}>
            <img className={"h-24 rounded-lg border"} src={preview} alt="" />
          </div>
        )}

        {!preview && (
          <input
            id={props.id}
            onBlur={props.onBlur}
            name={props.name}
            ref={inputRef}
            hidden={true}
            type="file"
            onChange={(e) => {
              if (e.target.files && e.target.files.length) {
                uploadProcess(e.target.files[0]).then();
              }
            }}
          />
        )}
      </div>
      {props.errorMessage && (
        <div className={"text-xs text-red-600 pt-1"}>{props.errorMessage}</div>
      )}
    </div>
  );
}

interface IProps {
  onChange: (e?: string) => void;
  onBlur?: any;
  errorMessage?: any;
  id?: string;
  name?: string;
  url?: string;
}
