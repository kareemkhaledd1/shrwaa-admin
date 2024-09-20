"use client";

import Form from "@/ui/Form";
import FormRow from "@/ui/FormRow";
import { useUpdateUser } from "@/hooks/useUpdateUser";
import { useState } from "react";

function UpdateUserForm({
  dataToEdit,
  onCloseModal,
}: {
  dataToEdit?: any;
  onCloseModal?: () => void;
}) {
  const { editUser, isUpdating } = useUpdateUser();

  const [username, setFullName] = useState(dataToEdit.username || "");
  const [avatar, setAvatar] = useState<File | null>(null);

  function onSubmit(e: any) {
    e.preventDefault();
    if (!username) return;
    editUser(
      { id: dataToEdit?.id, username, avatar },
      {
        onSuccess: () => {
          setAvatar(null);
          e.target.reset();
          onCloseModal?.();
        },
      },
    );
  }

  function handleCancel() {
    setFullName(dataToEdit.username || "");
    setAvatar(null);
    onCloseModal?.();
  }

  return (
    <Form onSubmit={onSubmit}>
      <FormRow label="Email address">
        <input
          value={dataToEdit?.email || ""}
          disabled
          className="w-full py-2 px-3 bg-gray-100 rounded-md border border-gray-200 focus:outline-none transition-all duration-200"
        />
      </FormRow>
      <FormRow label="Fullname">
        <input
          type="text"
          defaultValue={dataToEdit?.username || ""}
          onChange={(e) => setFullName(e.target.value)}
          id="username"
          className="w-full py-2 px-3  rounded-md border border-gray-200 focus:outline-none transition-all duration-200"
        />
      </FormRow>
      <FormRow label="Avatar image">
        <input
          type="file"
          id="avatar"
          onChange={(e) => setAvatar(e.target.files?.[0] || null)}
          className="w-full py-2 px-3 rounded-md "
        />
      </FormRow>
      <div className="flex justify-end gap-5">
        <button
          type="reset"
          className="bg-gray-200 text-gray-600 text-sm font-semibold px-3 py-3 rounded-md"
          disabled={isUpdating}
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-green-500 text-white text-sm font-semibold px-5 py-3 rounded-md"
          disabled={isUpdating}
        >
          {isUpdating ? "Updating..." : "Update"}
        </button>
      </div>
    </Form>
  );
}

export default UpdateUserForm;
