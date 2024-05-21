import React from 'react';
import './SubgoalOverlay.css';

function SubgoalOverlay({ goal, onClose }) {
  return (
    <div className="overlay">
      <div className="overlay-content">
        <button className="close-btn" onClick={onClose}>X</button>
        <h2>{goal.title}</h2>
        <ul>
          {goal.subgoals.map(subgoal => (
            <li key={subgoal.id}>{subgoal.title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SubgoalOverlay;
