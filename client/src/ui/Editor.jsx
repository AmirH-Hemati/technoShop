import { Controller } from "react-hook-form";

import "froala-editor/js/languages/fa.js";
import "froala-editor/js/plugins.pkgd.min.js";
import FroalaEditorComponent from "react-froala-wysiwyg";

import axiosInstance from "../services/axiosInstance";

import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/css/froala_style.min.css";

function Editor({ name, error, control, rules }) {
  const config = {
    heightMin: 300,
    heightMax: 400,
    placeholderText: "توضیحات محصول را وارد بکنید .",
    direction: "rtl",
    language: "fa",
    imageUploadURL: "http://localhost:3000/api/v1/uploads/froala",
    imageUploadMethod: "POST",
    events: {
      "image.removed": async function (img) {
        const imagePath = img[0].src;
        try {
          await axiosInstance.delete(`/uploads/froala/`, {
            data: { url: imagePath },
          });
          console.log("تصویر با موفقیت حذف شد");
        } catch (error) {
          console.log(error);
        }
      },
    },
  };
  return (
    <div className="w-full">
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <FroalaEditorComponent
            model={field.value || ""}
            onModelChange={(content) => field.onChange(content)}
            tag="textarea"
            config={config}
          />
        )}
      />

      {error && <p className="text-sm font-semibold text-red-600">{error}</p>}
    </div>
  );
}

export default Editor;
