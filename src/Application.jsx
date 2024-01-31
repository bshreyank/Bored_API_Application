import React, { useState, useEffect } from "react";
import axios from "axios";

import "./Application.css";

const Application = () => {
  const [activity, setActivity] = useState(null);
  const [activityList, setActivityList] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://www.boredapi.com/api/activity/"
      );
      setActivity(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
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

  const handleDeleteAll =()=>{
    setActivityList([]);
  }

  return (
    <>
      <div className="App">
        <h2>Bored API</h2>
        {activity && (
          <div>
            {/* <h2>{activity.activity}</h2> */}
            <button className="add-button" onClick={handleAddActivity}>Add Activity</button>
          </div>
        )}

        <h2>Activity List</h2>
        <ul>
          {activityList.map((activityItem, index) => (
            <li key={index}>
              {activityItem.activity}
              <button onClick={() => handleDeleteActivity(index)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
        
          <button className="delete-button" onClick={handleDeleteAll}>Delete All</button>
      </div>
    </>
  );
};

export default Application;
