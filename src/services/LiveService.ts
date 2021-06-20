import axios from "axios";
import keys from "../config/AuthKeys";

const instance = axios.create({
  baseURL: keys.apiVideoUrl,
});

export const createLiveStream = async (name: string) => {
  const token = await getToken();
  const result = await instance.post(
    "/live-streams",
    { name, record: false },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return result?.data?.liveStreamId;
};

export const getToken = async () => {
  const result = await instance.post("/auth/api-key", {
    apiKey: process.env.API_VIDEO_API_KEY,
  });
  return result?.data?.access_token;
};
