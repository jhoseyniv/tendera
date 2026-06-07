import axios from '@/lib/axios';

export async function getRoles() {

  const response =
    await axios.get(
      '/roles',
    );

  return response.data;
}

export async function createRole(
  data: {
    tenant_id: string;
    name: string;
    code: string;
    description?: string;
  },
) {

  const response =
    await axios.post(
      '/roles',
      data,
    );

  return response.data;
}

export async function updateRole(
  id: string,
  data: {
    name?: string;
    code?: string;
    description?: string;
  },
) {

  const response =
    await axios.patch(
      `/roles/${id}`,
      data,
    );

  return response.data;
}

export async function deleteRole(
  id: string,
) {

  const response =
    await axios.delete(
      `/roles/${id}`,
    );

  return response.data;
}
export async function getRoleById(
  id: string,
) {

  const response =
    await axios.get(
      `/roles/${id}`,
    );

  return response.data;
}