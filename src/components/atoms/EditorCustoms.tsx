import React from "react";

import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";

export function EditorCustoms(props: IProps) {
  return (
    <div>
      <div className={props.errorMessage ? "editor_ck_customs_errors" : ""}>
        <CKEditor
          // @ts-ignore
          onChange={(event, editor: ClassicEditor) => {
            const data = editor.getData();
            if (data && props.onChange) {
              props.onChange(data);
            }
          }}
          onBlur={props.onBlur}
          // @ts-ignore
          editor={ClassicEditor}
          config={{
            placeholder: props.placeholder ?? "",
          }}
          data={props.value ?? ""}
        />
        {props.errorMessage && (
          <div className={"text-xs text-start pl-2 text-red-600 pt-1"}>
            {props.errorMessage}
          </div>
        )}
      </div>
    </div>
  );
}

interface IProps {
  onChange?: (e?: string) => void;
  onBlur?: any;
  errorMessage?: any;
  placeholder?: string;
  value?: string;
}
