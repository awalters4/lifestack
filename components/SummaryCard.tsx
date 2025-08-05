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

type DailyEntry = {
  habits?: HabitsState;
  mood?: string;
  notes?: string;
};

const STORAGE_KEY = "lifestack_data";

const SummaryCard = ({ selectedDate }: Props) => {
  const [entry, setEntry] = useState<DailyEntry | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return setEntry(null);
      const data = JSON.parse(raw) as Record<string, DailyEntry>;
      setEntry(data[selectedDate] || null);
    } catch (err) {
      console.error("Failed to load summary data", err);
      setEntry(null);
    }
  }, [selectedDate]);

  if (!entry || (!entry.habits && !entry.mood && !entry.notes)) {
    return (
      <div className="bg-white p-4 rounded shadow w-full max-w-md mx-auto mt-6 text-center text-gray-500 italic">
        No data logged for {selectedDate}.
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded shadow w-full max-w-md mx-auto mt-6">
      <h2 className="text-lg font-semibold mb-4 text-center">Summary for {selectedDate}</h2>

      {entry.habits && (
        <>
          <h3 className="font-semibold mb-2">Habits:</h3>
          <ul className="list-disc list-inside mb-4 text-gray-800">
            {Object.entries(entry.habits)
              .filter(([_, completed]) => completed)
              .map(([habit]) => (
                <li key={habit}>{habit.charAt(0).toUpperCase() + habit.slice(1)}</li>
              ))}
            {Object.values(entry.habits).every((v) => !v) && <li className="italic text-gray-500">None completed</li>}
          </ul>
        </>
      )}

      {entry.mood && (
        <div className="mb-4">
          <h3 className="font-semibold">Mood:</h3>
          <div className="text-3xl mt-1">{entry.mood}</div>
        </div>
      )}

      {entry.notes && (
        <div>
          <h3 className="font-semibold">Notes:</h3>
          <p className="mt-1 text-gray-700 whitespace-pre-line">{entry.notes}</p>
        </div>
      )}
    </div>
  );
};

export default SummaryCard;
