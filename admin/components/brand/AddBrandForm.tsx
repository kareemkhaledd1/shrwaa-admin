import Form from "@/ui/Form";
import FormRow from "@/ui/FormRow";
import { useForm } from "react-hook-form";
import { useCreateBrand } from "@/hooks/useCreateBrand";
import { useUpdateBrand } from "@/hooks/useUpdateBrand";

interface FormDataProps {
  name: string;
  published: string;
  image: FileList | string;
}

function AddBrandForm({
  onCloseModal,
  dataToEdit,
}: {
  onCloseModal?: () => void;
  dataToEdit?: any;
}) {
  const { id: editId, ...editValues } = dataToEdit || {};
  const isEditSession = Boolean(editId);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    defaultValues: dataToEdit ? { ...editValues, image: undefined } : {},
  });

  const { createBrand, isCreating } = useCreateBrand();
  const { updateBrand, isUpdating } = useUpdateBrand();
  const isWorking = isCreating || isUpdating;

  const onSubmit = (data: FormDataProps) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("published", data.published);
    if (data.image && data.image instanceof FileList) {
      formData.append("image", data.image[0]);
    }

    if (isEditSession && editId !== undefined) {
      updateBrand(
        { newBrandData: formData, id: editId },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
          onError: (error: Error) => {
            console.error("Error updating brand:", error);
          },
        },
      );
    } else {
      createBrand(formData, {
        onSuccess: () => {
          reset();
          onCloseModal?.();
        },
      });
    }
  };

  return (
    <Form
      type={onCloseModal ? "regular" : "modal"}
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormRow label="Brand name" error={errors?.name?.message}>
        <input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", { required: "This field is required" })}
          className="w-full py-1.5 px-3 border rounded border-gray-300  outline-none focus:border-orange-500 transition-all duration-300"
        />
      </FormRow>

      <FormRow label="Published">
        <select
          id="published"
          disabled={isWorking}
          {...register("published")}
          className="w-full py-1.5 text-sm px-3 border rounded border-gray-300 outline-none transition-all duration-300"
        >
          <option value={"true"}>Published</option>
          <option value={"false"}>Not-published</option>
        </select>
      </FormRow>

      <FormRow label="Image" error={errors?.image?.message}>
        <input
          type="file"
          id="image"
          disabled={isWorking}
          {...register("image", {
            required: !isEditSession && "This field is required",
          })}
          className="w-full  rounded  outline-none focus:border-orange-500 transition-all duration-300"
        />
      </FormRow>

      <div className="flex justify-end gap-5 pt-[1.2rem]">
        <button
          onClick={onCloseModal}
          disabled={isWorking}
          className="bg-gray-200 text-gray-600 text-sm font-semibold px-3 py-3 rounded-md"
        >
          Cancel
        </button>
        <button
          className="bg-orange-500 text-sm font-semibold text-white px-5 py-3 rounded-md"
          disabled={isWorking}
        >
          {isEditSession ? "Update" : "Create"}
        </button>
      </div>
    </Form>
  );
}

export default AddBrandForm;
