import React from 'react';
import { ActivityProvider, useActivity } from './context/ActivityContext';

const App = () => {
  const { activity, activityList, handleAddActivity } = useActivity();

  return (
    <div className="App">
      <header className="App-header">
        <h1>Bored API Activity - UseContext API</h1>
        {activity && (
          <div>
            <h2>{activity.activity}</h2>
            <button onClick={handleAddActivity}>Add Activity</button>
          </div>
        )}

        <h2>Activity List</h2>
        <ul>
          {activityList.map((activityItem, index) => (
            <ActivityListItem key={index} index={index} activity={activityItem} />
          ))}
        </ul>
      </header>
    </div>
  );
};

const ActivityListItem = ({ index, activity }) => {
  const { handleDeleteActivity } = useActivity();

  return (
    <li>
      {activity.activity}
      <button onClick={() => handleDeleteActivity(index)}>Delete</button>
    </li>
  );
};

const AppContext = () => {
  return (
    <ActivityProvider>
      <App />
    </ActivityProvider>
  );
};

export default AppContext;