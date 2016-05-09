import axios from "axios";
import * as Config from "../utils/api.js";

export const addPlate = (plateInfo) => {
  const { plate_no, registered_state, user_id } = plateInfo;
  return axios(
    Object.assign(
      {
        method: "post",
        url: "/pzly01live7/_table/user_vehicles",
        data : {
          plate_no: plate_no,
          registered_state: registered_state,
          user_id: user_id,
          date_time: ""
        }
      }, Config.APIConfig
    )
  );
};

export const getVehicles = (userId) => {
  const user_id = userId;
  return axios(
    Object.assign(
      {
        method: "get",
        url: "/pzly01live7/_table/user_vehicles?filter=user_id="+user_id
      }, Config.APIConfig
    )
  );
};

export const saveVehicle = (plateInfo) => {
  const { plate_no, registered_state, id } = plateInfo;
  return axios(
    Object.assign(
      {
        method: "put",
        url: "/pzly01live7/_table/user_vehicles",
        data : {
          plate_no: plate_no,
          registered_state: registered_state,
          id: id
        }
      }, Config.APIConfig
    )
  );
};
