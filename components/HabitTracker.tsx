import { useEffect, useState } from "react";
import Button from "./Button";

type Props = {
  selectedDate: string;
};

type HabitsState = {
  read: boolean;
  water: boolean;
  workout: boolean;
  journal: boolean;
};

type DailyEntry = {
  habits?: HabitsState;
  mood?: string;
  notes?: string;
};

const STORAGE_KEY = "lifestack_data";

const HabitTracker = ({ selectedDate }: Props) => {
  const [habits, setHabits] = useState<HabitsState>({
    read: false,
    water: false,
    workout: false,
    journal: false,
  });

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const data = JSON.parse(raw) as Record<string, DailyEntry>;
      const entry = data[selectedDate];
      if (entry?.habits) setHabits(entry.habits);
      else {
        // Reset form if no habits exist for selected date
        setHabits({ read: false, water: false, workout: false, journal: false });
      }
    } catch (err) {
      console.error("Failed to load habits", err);
    }
  }, [selectedDate]);

  const toggleHabit = (habit: keyof HabitsState) => {
    setHabits((prev) => ({ ...prev, [habit]: !prev[habit] }));
  };

  const handleSave = () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const data = raw ? JSON.parse(raw) : {};
      const existing = data[selectedDate] || {};
      data[selectedDate] = {
        ...existing,
        habits,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      alert("Habits saved ✅");
    } catch (err) {
      console.error("Failed to save habits", err);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow w-full max-w-md mx-auto">
      <h2 className="text-lg font-semibold mb-4 text-center">Habits for {selectedDate}</h2>
      <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
        {(Object.entries(habits) as [keyof HabitsState, boolean][]).map(([key, value]) => (
          <label key={key} className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={value}
              onChange={() => toggleHabit(key)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="capitalize text-gray-800">{key}</span>
          </label>
        ))}
      </form>

      <div className="mt-6 text-center">
        <Button label="Save" onClick={handleSave} />
      </div>
    </div>
  );
};

export default HabitTracker;
