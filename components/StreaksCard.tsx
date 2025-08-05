import { useEffect, useState } from "react";

type Props = {
  selectedDate: string;
};

type HabitsState = {
  read: boolean;
  water: boolean;
  workout: boolean;
  journal: boolean;
};

const STORAGE_KEY = "lifestack_data";

const StreaksCard = ({ selectedDate }: Props) => {
  const [streaks, setStreaks] = useState<Record<keyof HabitsState, number>>({
    read: 0,
    water: 0,
    workout: 0,
    journal: 0,
  });

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;

      const data = JSON.parse(raw) as Record<string, { habits?: HabitsState }>;
      const dates = Object.keys(data)
        .filter((date) => data[date]?.habits)
        .sort((a, b) => b.localeCompare(a)); // newest to oldest

      const streakCounts: Record<keyof HabitsState, number> = {
        read: 0,
        water: 0,
        workout: 0,
        journal: 0,
      };

      const today = selectedDate;
      let breakReached: Partial<Record<keyof HabitsState, boolean>> = {};

      for (const date of dates) {
        const day = data[date];
        if (!day.habits) continue;

        (Object.keys(streakCounts) as (keyof HabitsState)[]).forEach((habit) => {
          if (breakReached[habit]) return;

          if (day.habits![habit]) {
            streakCounts[habit]++;
          } else {
            breakReached[habit] = true;
          }
        });
      }

      setStreaks(streakCounts);
    } catch (err) {
      console.error("Error calculating streaks:", err);
    }
  }, [selectedDate]);

  return (
    <div className="bg-white p-4 rounded shadow w-full max-w-md mx-auto mt-6">
      <h2 className="text-lg font-semibold mb-4 text-center">Habit Streaks</h2>
      <ul className="space-y-2 text-gray-800">
        {Object.entries(streaks).map(([habit, count]) => (
          <li key={habit} className="flex justify-between border-b pb-1">
            <span className="capitalize">{habit}</span>
            <span className="font-semibold">{count} day{count === 1 ? "" : "s"}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StreaksCard;
