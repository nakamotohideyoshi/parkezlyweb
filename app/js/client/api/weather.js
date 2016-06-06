import axios from "axios";
import { weatherAPIConfig } from "../utils/api.js";

export const getWeather = (lat, lon) => {
  return axios(
    Object.assign(
      {
        method: "get",
        url: "lat=" + lat + "&lon=" + lon + "&appid=0bf93723659ddf0c03095b6a1ddb3089";
      }, weatherAPIConfig
    )
  );
};


