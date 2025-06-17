import { useState } from "react";
import Button from "./Button"; // adjust the import path if needed

const HabitTracker = () => {
  const [habits, setHabits] = useState({
    read: false,
    water: false,
    workout: false,
    journal: false,
  });

  const toggleHabit = (habit: keyof typeof habits) => {
    setHabits((prev) => ({ ...prev, [habit]: !prev[habit] }));
  };

  const handleSave = () => {
    console.log("Saved habits:", habits);
    // Later: integrate with Supabase here
  };

  return (
    <div className="bg-white p-4 rounded shadow w-full max-w-md mx-auto">
      <h2 className="text-lg font-semibold mb-4 text-center">Today's Habits</h2>
      <form className="space-y-3">
        {Object.entries(habits).map(([key, value]) => (
          <label key={key} className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={value}
              onChange={() => toggleHabit(key as keyof typeof habits)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="capitalize text-gray-800">{key}</span>
          </label>
        ))}
      </form>

      {/* ✅ Add Save Button here */}
      <div className="mt-6 text-center">
        <Button label="Save" onClick={handleSave} />
      </div>
    </div>
  );
};

export default HabitTracker;
