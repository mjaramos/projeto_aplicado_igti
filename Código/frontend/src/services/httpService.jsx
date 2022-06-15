import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3333',
  timeout: 10000,
});

export async function read(url) {
  const { data } = await axiosInstance.get(url);
  return data;
}

export async function create(url, dado) {
  const {data} = await axiosInstance.post(url, dado);
  return data;
}
