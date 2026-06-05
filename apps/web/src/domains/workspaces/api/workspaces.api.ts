import axios from '@/lib/axios';

export async function getMyWorkspaces() {
  const response = await axios.get('/workspaces');
  return response.data;
}