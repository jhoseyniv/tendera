import axios from '@/lib/axios';

export async function getUsers() {

  console.log(
    'Calling /users',
  );

  const response =
    await axios.get(
      '/users',
    );

  console.log(
    'Users response:',
    response,
  );

  return response.data;
}

export async function getUser(
  id: string,
) {

  const response =
    await axios.get(
      `/users/${id}`,
    );

  return response.data;
}

export async function createUser(
  data: {

    tenant_id: string;

    firstName?: string;

    lastName?: string;

    email: string;

    passwordHash?: string;
  },
) {

  const response =
    await axios.post(
      '/users',
      data,
    );

  return response.data;
}

export async function updateUser(

  id: string,

  data: {

    firstName?: string;

    lastName?: string;

    email?: string;
  },
) {

  const response =
    await axios.patch(

      `/users/${id}`,

      data,
    );

  return response.data;
}

export async function deleteUser(
  id: string,
) {

  const response =
    await axios.delete(
      `/users/${id}`,
    );

  return response.data;
}

export async function getRoleUsers(
  roleId: string,
) {

  const response =
    await axios.get(
      `/roles/${roleId}/users`,
    );

  return response.data;
}

export async function getUserRoles(
  userId: string,
) {

  const response =
    await axios.get(
      `/users/${userId}/roles`,
    );

  return response.data;
}

export async function assignUserToRole(

  roleId: string,

  userId: string,
) {

  const response =
    await axios.post(

      `/roles/${roleId}/users`,

      {
        userId,
      },
    );

  return response.data;
}

export async function removeUserFromRole(

  roleId: string,

  userId: string,
) {

  const response =
    await axios.delete(

      `/roles/${roleId}/users/${userId}`,
    );

  return response.data;
}

export async function getUserWorkspaces(
  userId: string,
) {

  const response =
    await axios.get(
      `/users/${userId}/workspaces`,
    );

  return response.data;
}

export async function assignWorkspaceToUser(

  userId: string,

  workspaceId: string,
) {

  const response =
    await axios.post(

      `/users/${userId}/workspaces`,

      {
        workspaceId,
      },
    );

  return response.data;
}

export async function removeWorkspaceFromUser(

  userId: string,

  workspaceId: string,
) {

  const response =
    await axios.delete(

      `/users/${userId}/workspaces/${workspaceId}`,
    );

  return response.data;
}