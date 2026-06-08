import axios from '@/lib/axios';


export async function
getPermissionUsers(
  permissionId: string,
) {

  const response =
    await axios.get(
      `/permissions/${permissionId}/users`,
    );

  return response.data;
}

export async function
getPermissionRoles(
  permissionId: string,
) {

  const response =
    await axios.get(
      `/permissions/${permissionId}/roles`,
    );

  return response.data;
}


export async function getPermissions() {

  const response =
    await axios.get(
      '/permissions',
    );

  return response.data;
}

export async function getPermissionById(
  id: string,
) {

  const response =
    await axios.get(
      `/permissions/${id}`,
    );

  return response.data;
}

export async function createPermission(
  data: any,
) {

  const response =
    await axios.post(
      '/permissions',
      data,
    );

  return response.data;
}

export async function updatePermission(

  id: string,

  data: any,
) {

  const response =
    await axios.patch(
      `/permissions/${id}`,
      data,
    );

  return response.data;
}

export async function deletePermission(
  id: string,
) {

  const response =
    await axios.delete(
      `/permissions/${id}`,
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

export async function
assignRoleToPermission(

  permissionId: string,

  roleId: string,
) {

  const response =
    await axios.post(

      `/permissions/${permissionId}/roles`,

      {
        roleId,
      },
    );

  return response.data;
}

export async function
removeRoleFromPermission(

  permissionId: string,

  roleId: string,
) {

  const response =
    await axios.delete(

      `/permissions/${permissionId}/roles/${roleId}`,
    );

  return response.data;
}