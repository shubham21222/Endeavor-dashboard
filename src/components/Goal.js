import React from 'react';
import './Goal.css';

function Goal({ goal, onClick }) {
  return (
    <div className="goal" onClick={onClick}>
      <h3>{goal.title}</h3>
      <button className="calculate-btn">Calculate</button>
      <div className="subgoals">
        {goal.subgoals.map(subgoal => (
          <div key={subgoal.id} className="subgoal">
            {subgoal.title}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Goal;
