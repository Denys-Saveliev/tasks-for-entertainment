import { Container } from "@mui/material";
import { useState, useEffect } from "react";
import * as Api from "../service/apiService";
import Activities from "../components/Activities";
import SelectedActivities from "../components/SelectedActivities";
import Statistics from "../components/Statistics/";
import CompletedActivities from "../components/CompletedActivities";
import Notiflix from "notiflix";
import MyIdeas from "../components/MyIdeas/MyIdeas";
import ScrollToTop from "react-scroll-to-top";

const MainContent = () => {
  const [activities, setActivities] = useState([]);
  const [userActivities, setUserActivities] = useState([]);

  const selectedActivities = userActivities.filter(
    (activity) => activity.selected
  );

  const completedActivities = userActivities.filter(
    (activity) => activity.completed
  );

  useEffect(() => {
    Api.fetchActivities()
      .then((data) => {
        return data.map((activity) => activity.data);
      })
      .then(setActivities);

    const userActivitiesSaved = JSON.parse(
      localStorage.getItem("my-activities")
    );
    if (userActivitiesSaved) {
      setUserActivities(userActivitiesSaved);
    }
  }, []);

  useEffect(() => {
    if (userActivities.length > 0) {
      localStorage.setItem("my-activities", JSON.stringify(userActivities));
    }
  }, [userActivities]);

  const fetchIdeas = () =>
    Api.fetchActivities()
      .then((data) => {
        return data.map((activity) => activity.data);
      })
      .then(setActivities);

  const onActivityClick = (activity) => {
    const currentActivity = { ...activity };
    currentActivity.selected = true;
    currentActivity.completed = false;
    const currentActivities = [...activities];
    for (let i = 0; i < currentActivities.length; i += 1) {
      if (currentActivities[i].key !== currentActivity.key) {
        continue;
      }
      currentActivities[i].selected = true;
    }
    setActivities([...currentActivities]);
    if (
      userActivities.find((activity) => activity.key === currentActivity.key)
    ) {
      Notiflix.Notify.info("The idea is already on your list");
      return;
    }
    setUserActivities([...userActivities, currentActivity]);
  };

  const onSelectedActivityClick = (activity) => {
    const currentActivity = activity;
    currentActivity.selected = false;
    currentActivity.completed = true;
    currentActivity.date = Date.now();
    setUserActivities([
      ...userActivities.filter((item) => item.key !== currentActivity.key),
      currentActivity,
    ]);

    if (currentActivity._id) {
      Api.updateActivitiesToDB(currentActivity);
    } else {
      return;
    }
  };

  const fetchMyIdeas = () =>
    Api.fetchActivitiesFromDB().then((response) => {
      if (response) {
        setUserActivities(response.data.activities);
      }
      return;
    });

  const saveMyIdeas = () =>
    userActivities.map((activity) =>
      activity._id ? null : Api.postActivitiesToDB(activity)
    );

  return (
    <>
      <MyIdeas onSet={fetchMyIdeas} onSave={saveMyIdeas} />
      <Container>
        <Activities
          data={activities}
          onClick={onActivityClick}
          onFetch={fetchIdeas}
        />
        <SelectedActivities
          data={selectedActivities}
          onClick={onSelectedActivityClick}
        />
        <Statistics data={completedActivities} />
        <CompletedActivities data={completedActivities} />
      </Container>
      <ScrollToTop smooth />
    </>
  );
};

export default MainContent;
