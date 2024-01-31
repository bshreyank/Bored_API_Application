import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const ActivityContext = createContext();

const ActivityProvider = ({ children }) => {
  const [activity, setActivity] = useState(null);
  const [activityList, setActivityList] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://www.boredapi.com/api/activity/');
      setActivity(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleAddActivity = () => {
    if (activity) {
      setActivityList((prevList) => [...prevList, activity]);
      fetchData(); // Fetch a new activity after adding to the list
    }
  };

  const handleDeleteActivity = (index) => {
    setActivityList((prevList) => {
      const newList = [...prevList];
      newList.splice(index, 1);
      return newList;
    });
  };

  return (
    <ActivityContext.Provider
      value={{
        activity,
        activityList,
        handleAddActivity,
        handleDeleteActivity,
      }}
    >
      {children}
    </ActivityContext.Provider>
  );
};

const useActivity = () => {
  const context = useContext(ActivityContext);
  if (!context) {
    throw new Error('useActivity must be used within an ActivityProvider');
  }
  return context;
};

export { ActivityProvider, useActivity };