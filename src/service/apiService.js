import axios from "axios";
import Notiflix from "notiflix";

const URL = "http://www.boredapi.com/api/activity/";
const URL_DB = "https://my-achievment.herokuapp.com/api/activities/";

async function fetchActivitiesWithErrorHandling(url) {
  try {
    const response = await axios.get(url);
    return response;
  } catch (error) {
    return new Error("Not found");
  }
}

export async function fetchActivities() {
  let promises = [];
  for (let i = 0; i < 4; i += 1) {
    promises.push(fetchActivitiesWithErrorHandling(URL));
  }
  return await Promise.all(promises);
}

export async function fetchActivitiesFromDB() {
  return await fetchActivitiesWithErrorHandling(URL_DB);
}

export async function postActivitiesToDB({
  key,
  activity,
  type,
  selected,
  completed,
  date,
}) {
  axios
    .post(URL_DB, {
      key,
      activity,
      type,
      selected,
      completed,
      date,
    })
    .then((response) => {
      if (response.status === 201) {
        Notiflix.Notify.info("Ideas added to your database");
      }
    });
}

export async function updateActivitiesToDB({ _id, selected, completed, date }) {
  axios.patch(`${URL_DB}${_id}`, {
    selected,
    completed,
    date,
  });
}
