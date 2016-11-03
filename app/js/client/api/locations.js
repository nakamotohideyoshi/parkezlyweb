import axios from "axios";
import * as Config from "../utils/api.js";

export const getLocations = (user_id) => {
  return axios(
    Object.assign(
      {
        method: "get",
        url: "/pzly01live7/_table/user_locations?filter=user_id="+user_id
      }, Config.APIConfig
    )
  );
};

