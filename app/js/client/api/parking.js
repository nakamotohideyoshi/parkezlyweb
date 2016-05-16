import axios from "axios";
import * as Config from "../utils/api.js";

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
              "name":"in_lat",
              "value":"40.7346687317"
            },
            {
              "name":"in_lng",
              "value":"-73.4461441040"
            }
          ]
        }
      }, Config.APIConfig
    )
  );
};