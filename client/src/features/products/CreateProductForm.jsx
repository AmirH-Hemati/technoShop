import { useEffect } from "react";
import { useForm } from "react-hook-form";

import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import SelectForm from "../../ui/Select";
import SelectColor from "../../ui/SelectColor";
import FileInput from "../../ui/FileInput";
import Editor from "../../ui/Editor";

import { useCreateProduct } from "./useCreateProduct";
import { useUpdateProduct } from "./useUpdateProduct";

import { useCategories } from "../categories/useCategories";
import { brands } from "../../data/brands";

import SelectCategory from "../../ui/SelectCategory";
import AddFeatures from "./AddFeatures";
function CreateProductForm({ onCloseModal, product = {} }) {
  const { createProduct, isCreateing } = useCreateProduct();
  const { updateProduct, isUpdating } = useUpdateProduct();

  const { categories, isLoading } = useCategories();
  const { _id: editId, ...editValues } = product;

  const isWorking = isCreateing || isUpdating;

  const isEditSessions = Boolean(editId);
  const { register, formState, getValues, handleSubmit, reset, control } =
    useForm({
      defaultValues: isEditSessions
        ? { ...editValues, category: editValues?.category?._id || "" }
        : {},
    });

  const { errors } = formState;

  useEffect(() => {
    if (!isLoading && editId) {
      reset({
        ...editValues,
        category: editValues?.category?._id || "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  if (isLoading) return <p>isLoading</p>;

  function onSubmit(data) {
    const formData = new FormData();
    const image =
      typeof data.imageCover === "string"
        ? data.imageCover
        : data.imageCover[0];

    for (const key in data) {
      if (key === "imageCover") {
        formData.append("imageCover", image);
      } else if (key === "colors") {
        data.colors.forEach((color) => formData.append("colors", color));
      } else if (key === "features") {
        data.features.forEach((feature, index) => {
          formData.append(`features[${index}][key]`, feature.key);
          formData.append(`features[${index}][value]`, feature.value);
        });
      } else {
        formData.append(key, data[key]);
      }
    }

    if (isEditSessions) {
      updateProduct(
        { newProductData: formData, id: editId },
        {
          onSuccess: function () {
            reset?.();
            onCloseModal?.();
          },
        },
      );
    } else {
      console.log(data);
      createProduct(formData, {
        onSuccess: function () {
          reset?.();
          onCloseModal?.();
        },
      });
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="border-grey-300 flex flex-col gap-6 rounded-md border bg-white p-2 lg:p-8"
    >
      <FormRow label={`نام محصول`} error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name", { required: "این فیلد ضروری است" })}
        />
      </FormRow>
      <FormRow label={`قیمت محصول`} error={errors?.price?.message}>
        <Input
          type="number"
          id="price"
          {...register("price", {
            required: "این فیلد ضروری است",
            min: { value: 1, message: "قیمت باید بیشتر 10 هزار تومان باشد" },
          })}
        />
      </FormRow>
      <FormRow label={`تخفیف محصول`} error={errors?.priceDiscount?.message}>
        <Input
          type="number"
          id="priceDiscount"
          {...register("priceDiscount", {
            validate: (value) =>
              value < getValues().price || "تخفیف باید کمتر از قیمت باشد",
          })}
        />
      </FormRow>

      <FormRow label="عکس کاور محصول" error={errors?.imageCover?.message}>
        <FileInput
          id="imageCover"
          {...register("imageCover", {
            required: isEditSessions ? false : "این فیلد ضروری است",
          })}
        />
      </FormRow>

      <FormRow error={errors?.colors?.message} label=" رنگ محصول">
        <SelectColor control={control} />
      </FormRow>

      <FormRow error={errors?.brand?.message} label="برند  محصول">
        <SelectForm
          name="brand"
          placeholder="انتخاب برند"
          rules={{ required: "این فیلد ضروری است" }}
          control={control}
          options={brands}
        />
      </FormRow>
      <FormRow error={errors?.category?.message} label="دسته بندی محصول">
        <SelectCategory control={control} categories={categories} />
      </FormRow>

      <Editor
        control={control}
        name="description"
        error={errors?.description?.message}
        rules={{ required: "این فیلد ضروری است" }}
      />
      <AddFeatures register={register} control={control} name="features" />
      <div className="mr-auto flex items-center gap-2">
        <Button
          onClick={() => {
            reset();
            onCloseModal?.();
          }}
          variation="secondary"
          type="reset"
        >
          لغو
        </Button>
        <Button>اضافه کردن</Button>
      </div>
    </form>
  );
}

export default CreateProductForm;
