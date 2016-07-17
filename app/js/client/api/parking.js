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

export const getParkingRules = (city) => {
  return axios(
    Object.assign(
      {
        method: "get",
        url: "/pzly01live7/_table/parking_rules?filter=City="+city
      }, APIConfig
    )
  );
};

export const getParkingLot = (locationCode) => {

  return axios(
    Object.assign(
      {
        method: "post",
        url: "pzly01live7/_proc/managed_lot_status?&order=lot_row%20ASC%2C%20lot_number%20ASC",
        data : {
          "params": [{
            "name": "in_location_code",
            "value": locationCode
          }]
        }
      }, APIConfig
    )
  );
};

export const parkingWayPointUpdate = (waypointData) => {
console.log(waypointData);
  return axios(
    Object.assign(
      {
        method: "post",
        url: "pzly01live7/_table/waypoints",
        data : waypointData
      }, APIConfig
    )
  );
};

export const makePoivRequest = (poivData) => {
  return axios(
    Object.assign(
      {
        method: "post",
        url: "pzly01live7/_table/poiv2",
        data : poivData
      }, APIConfig
    )
  );
};

export const getTownshipCode = (location_code) => {
  return axios(
    Object.assign(
      {
        method: "get",
        url: "pzly01live7/_table/manage_locations?filter=location_code="+location_code
      }, APIConfig
    )
  );
};

export const getExtraFees = (township_code) => {
  return axios(
    Object.assign(
      {
        method: "get",
        url: "pzly01live7/_table/service_charges?filter=manager_id="+township_code
      }, APIConfig
    )
  );
};