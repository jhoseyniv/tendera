import axios from '@/lib/axios';

export async function getUsers() {

  const response =
    await axios.get(
      '/users',
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