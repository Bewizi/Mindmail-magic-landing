import axios from "axios";

export const httpClient = axios.create({
  baseURL: "https://mindmailaiimagegenerator.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
  // withCredentials: true,
});

export const audioClient = axios.create({
  baseURL: "https://mindmail-audio-bot.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});
