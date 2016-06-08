import axios from "axios";
import * as Config from "../utils/api.js";

export const getWalletTransactions = (user_id) => {
  return axios(
    Object.assign(
      {
        method: "get",
        url: "/pzly01live7/_table/user_wallet?filter=user_id="+user_id+"&order=date_time%20DESC"
      }, Config.APIConfig
    )
  );
};


