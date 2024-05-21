import React, { useState } from "react";
import { ReactComponent as RightIcon } from "../assest/right.svg";
import { ReactComponent as WrongIcon } from "../assest/wrong.svg";
import bin from "../assest/bin.svg"

function Component() {
  const [goals, setGoals] = useState([
    { id: 1, title: "Improve Credit Score", isMain: true, subgoals: [] },
  ]);
  const [newGoalTitle, setNewGoalTitle] = useState("");

  const handleNewGoal = () => {
    if (newGoalTitle.trim() === "") return; // Prevent adding empty goal

    const newGoal = {
      id: goals.length + 1,
      title: newGoalTitle,
      isMain: false,
      subgoals: [],
    };
    setGoals([...goals, newGoal]);
    setNewGoalTitle(""); // Clear the text area
  };

  const handleRemoveGoal = (id) => {
    setGoals(goals.filter((goal) => goal.id !== id));
  };

  const handleAddSubgoal = (goalId) => {
    setGoals(
      goals.map((goal) => {
        if (goal.id === goalId) {
          const newSubgoal = {
            id: goal.subgoals.length + 1,
            title: `Subgoal ${goal.subgoals.length + 1}`,
          };
          return { ...goal, subgoals: [...goal.subgoals, newSubgoal] };
        }
        return goal;
      })
    );
  };

  const handleRemoveSubgoal = (goalId, subgoalId) => {
    setGoals(
      goals.map((goal) => {
        if (goal.id === goalId) {
          return {
            ...goal,
            subgoals: goal.subgoals.filter(
              (subgoal) => subgoal.id !== subgoalId
            ),
          };
        }
        return goal;
      })
    );
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <aside className="w-full md:w-64 bg-white p-6">
        <div className="mb-10">
          <h1 className="text-2xl font-bold">Let's Endeavor</h1>
        </div>
        <nav className="space-y-2 mb-6">
          <a
            className="flex items-center space-x-3 text-sm font-medium text-gray-700"
            href="#"
          >
            <LayoutDashboardIcon className="h-5 w-5" />
            <span>Dashboard</span>
          </a>
          <a
            className="flex items-center space-x-3 text-sm font-medium text-gray-700"
            href="#"
          >
            <GoalIcon className="h-5 w-5" />
            <span>My Goals</span>
            <ChevronDownIcon className="h-4 w-4" />
          </a>
          <a
            className="flex items-center space-x-3 text-sm font-medium text-gray-700"
            href="#"
          >
            <UsersIcon className="h-5 w-5" />
            <span>Forums</span>
          </a>
        </nav>
        <div className="space-y-4">
          <textarea
            className="w-full h-24 p-2 border rounded"
            placeholder="Enter your new goal..."
            value={newGoalTitle}
            onChange={(e) => setNewGoalTitle(e.target.value)}
          ></textarea>
          <button
            onClick={handleNewGoal}
            className="w-full bg-[#3ABF8F] text-white py-2 rounded"
          >
            Set a New Goal
          </button>
        </div>
      </aside>
      <main className="flex-grow p-6">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold">Buy a house for $400k</h1>
          <button className="flex items-center space-x-2" variant="outline">
            <span>Complete Goal</span>
            <CheckIcon className="h-5 w-5" />
          </button>
        </div>
        <div className="relative flex flex-col items-center">
          {goals
            .reduce((rows, goal, index) => {
              if (index % 3 === 0) {
                rows.push([]);
              }
              rows[rows.length - 1].push(goal);
              return rows;
            }, [])
            .map((row, rowIndex) => (
              <div
                key={rowIndex}
                className="flex flex-wrap justify-center w-full mb-10"
              >
                {row.map((goal) => (
                  <div key={goal.id} className="mb-10 w-60 h-60 mx-4">
                    <div
                      className={`relative w-full h-full rounded-full ${
                        goal.isMain ? "bg-[#F1F5F9]" : "bg-[#E7E7E7]"
                      } flex items-center justify-center shadow-lg mb-10`}
                    >
                      <div className="text-center">
                        <h2 className="text-lg font-bold">{goal.title}</h2>
                      </div>
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <button className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center">
                          <RightIcon className="w-6 h-6" />
                        </button>
                      </div>
                      <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
                        <button
                          onClick={() => handleRemoveGoal(goal.id)}
                          className="w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center"
                        >
                          <WrongIcon className="w-6 h-6" />
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col md:flex-row justify-around items-end mt-10 space-y-6 md:space-y-0 md:space-x-6">
                      {goal.subgoals.map((subgoal, subgoalIndex) => (
                        <div
                          key={subgoal.id}
                          className="relative w-24 h-24 rounded-full bg-[#E7E7E7] flex items-center justify-center shadow-lg"
                        >
                          <div className="text-center">
                            <h3 className="text-[14px] font-semibold">
                              {subgoal.title}
                            </h3>
                            <p className="mt-2 text-[10px] text-[#FFB967]">
                              Calculate
                            </p>
                          </div>
                          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                            <button className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center">
                              <RightIcon className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
                            <button
                              onClick={() =>
                                handleRemoveSubgoal(goal.id, subgoal.id)
                              }
                              className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center"
                            >
                              <WrongIcon className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                      {goal.subgoals.length < 4 && (
                        <button
                          onClick={() => handleAddSubgoal(goal.id)}
                          className="self-start bg-transparent border border-gray-400 text-gray-700 px-4 py-2 rounded"
                        >
                          + Add Subgoal
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ))}
        </div>
        <div className="flex justify-between items-center mt-[100px] p-6 bg-[#FDE4B2] rounded-lg shadow">
          <p className="text-sm">
            20,000 Users are trying to reach a similar goal. Track their
            progress or share your own!
          </p>
          <button className="bg-[#3ABF8F] text-white px-4 py-2 rounded">
            Join The Forum
          </button>
        </div>
      </main>
    </div>
  );
}

function CheckIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function ChevronDownIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function GoalIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 13V2l8 4-8 4" />
      <path d="M20.561 10.222a9 9 0 1 1-12.55-5.29" />
      <path d="M8.002 9.997a5 5 0 1 0 8.9 2.02" />
    </svg>
  );
}

function LayoutDashboardIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="7" height="9" x="3" y="3" rx="1" />
      <rect width="7" height="5" x="14" y="3" rx="1" />
      <rect width="7" height="9" x="14" y="12" rx="1" />
      <rect width="7" height="5" x="3" y="16" rx="1" />
    </svg>
  );
}

function UsersIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

export default Component;
