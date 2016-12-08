// Common resource wrapper remover.


// Request preprocess script for user_id_ref for parked_cars
if (event.request.payload) { 
    delete event.request.payload['id'];
    event.request.payload.user_id_ref = event.request.payload.user_id;
    event.request.payload = {"resource": [event.request.payload]};
}

// Reponse for parked cars.
function filterParkedCars(object) {
  return object.profile_name === "TwpInspector";
}

if(event.response.content.resource) {
    event.response.content.resource.forEach(function(obj) {
        obj.township_users_by_township_code = obj.township_users_by_township_code.filter(filterParkedCars);
    });
}