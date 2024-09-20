import Form from "@/ui/Form";
import FormRow from "@/ui/FormRow";
import { useForm } from "react-hook-form";
import { useGetAllBrands } from "@/hooks/useGetAllBrands";
import { useCreatePhone } from "@/hooks/useCreatePhone";
import { useUpdatePhone } from "@/hooks/useUpdatePhone";

interface FormDataProps {
  name: string;
  goodPrice: number;
  fairPrice: number;
  img: FileList | string;
  brand: string;
}

function AddPhoneForm({
  dataToEdit,
  onCloseModal,
}: {
  dataToEdit?: any;
  onCloseModal?: () => void;
}) {
  const { id: editId, brand: editBrand, ...editValues } = dataToEdit || {};
  const isEditSession = Boolean(editId);
  const { brands } = useGetAllBrands();

  const { createPhone, isCreating } = useCreatePhone();
  const { updatePhone, isUpdating } = useUpdatePhone();
  const isWorking = isCreating || isUpdating;

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    defaultValues: dataToEdit
      ? { ...editValues, img: undefined, brand: editBrand._id }
      : {},
  });

  const onSubmit = (data: FormDataProps) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("goodPrice", String(data.goodPrice));
    formData.append("fairPrice", String(data.fairPrice));
    formData.append("brand", data.brand);
    if (data.img && data.img instanceof FileList) {
      formData.append("image", data.img[0]);
    }

    if (isEditSession && editId !== undefined) {
      updatePhone(
        { updatedData: formData, id: editId },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
          onError: (error: Error) => {
            console.error("Error updating phone:", error);
          },
        },
      );
    } else {
      createPhone(formData, {
        onSuccess: () => {
          reset();
          onCloseModal?.();
        },
        onError: (error: Error) => {
          console.error("Error creating phone:", error);
        },
      });
    }
  };

  return (
    <Form type={"regular"} onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Phone name" error={errors?.name?.message}>
        <input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", { required: "This field is required" })}
          className="w-full py-1.5 px-3 border rounded border-gray-300  outline-none focus:border-orange-500 transition-all duration-300"
        />
      </FormRow>

      <FormRow label="Good Price" error={errors?.name?.message}>
        <input
          type="number"
          id="goodPrice"
          disabled={isWorking}
          {...register("goodPrice", { required: "This field is required" })}
          className="w-full py-1.5 px-3 border rounded border-gray-300  outline-none focus:border-orange-500 transition-all duration-300"
        />
      </FormRow>

      <FormRow label="Fair price" error={errors?.name?.message}>
        <input
          type="number"
          id="fairPrice"
          disabled={isWorking}
          {...register("fairPrice", { required: "This field is required" })}
          className="w-full py-1.5 px-3 border rounded border-gray-300  outline-none focus:border-orange-500 transition-all duration-300"
        />
      </FormRow>

      <FormRow label="Brand" error={errors?.name?.message}>
        <select
          id="brand"
          disabled={isWorking}
          {...register("brand")}
          className="w-full py-1.5 px-3 border rounded border-gray-300  outline-none focus:border-orange-500 transition-all duration-300"
        >
          <option value="">Select a brand</option>
          {brands.map((brand: any) => (
            <option key={brand.id} value={brand.id}>
              {brand.name}
            </option>
          ))}
        </select>
      </FormRow>

      <FormRow label="Image" error={errors?.name?.message}>
        <input
          type="file"
          id="image"
          disabled={isWorking}
          {...register("img", {
            required: !isEditSession && "This field is required",
          })}
          className="w-full py-1.5 px-3 outline-none"
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

export default AddPhoneForm;
