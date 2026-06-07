import axios from '@/lib/axios';

export async function getPermissions() {

  const response =
    await axios.get(
      '/permissions',
    );

  return response.data;
}

export async function getRolePermissions(
  roleId: string,
) {

  const response =
    await axios.get(
      `/roles/${roleId}/permissions`,
    );

  return response.data;
}

export async function assignPermission(
  roleId: string,
  pagePermissionId: string,
) {

  const response =
    await axios.post(
      `/roles/${roleId}/permissions`,
      {
        pagePermissionId,
      },
    );

  return response.data;
}

export async function removePermission(
  roleId: string,
  pagePermissionId: string,
) {

  const response =
    await axios.delete(
      `/roles/${roleId}/permissions/${pagePermissionId}`,
    );

  return response.data;
}