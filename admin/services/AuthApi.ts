import axios from "axios";

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    const response = await axios.post(
      "http://localhost:4000/auth/login",
      {
        email,
        password,
      },
      {
        withCredentials: true,
      },
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function register({
  email,
  password,
  username,
  role,
}: {
  email: string;
  password: string;
  username: string;
  role?: string;
}) {
  try {
    const response = await axios.post(
      "http://localhost:4000/auth/register",
      {
        email,
        password,
        username,
        role,
      },
      {
        withCredentials: true,
      },
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function getDelegateUsers() {
  try {
    const response = await axios.get(
      "http://localhost:4000/auth/delegate-users",
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export const fetchCurrentUser = async () => {
  try {
    const { data } = await axios.get(
      "http://localhost:4000/auth/current-user",
      {
        withCredentials: true,
      },
    );
    return data.user;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export async function updateUserData({
  id,
  username,
  password,
  avatar,
}: {
  id: string;
  username?: string;
  password?: string;
  avatar?: File | null;
}) {
  const formData = new FormData();
  formData.append("username", username || "");
  formData.append("password", password || "");
  if (avatar) {
    formData.append("avatar", avatar);
  }
  const response = await axios.put(
    `http://localhost:4000/auth/update/${id}`,
    formData,
    {
      withCredentials: true,
    },
  );

  return response.data;
}

export async function logout() {
  await axios.post("http://localhost:4000/auth/logout", {
    withCredentials: true,
  });
}

export async function getUsers() {
  const response = await axios.get("http://localhost:4000/auth/users", {
    withCredentials: true,
  });
  return response.data;
}
