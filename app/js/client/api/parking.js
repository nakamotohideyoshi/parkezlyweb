import axios from "axios";
import { APIConfig, placesAPIConfig } from "../utils/api.js";

export const getNearByParking = (position) => {
  const { lat, lng } = position;

  return axios(
    Object.assign(
      {
        method: "post",
        url: "pzly01live7/_proc/find_parking_nearby",
        data : {
          params:
          [
            {
              "name": "in_lat",
              "value": lat
            },
            {
              "name": "in_lng",
              "value": lng
            }
          ]
        }
      }, APIConfig
    )
  );
};