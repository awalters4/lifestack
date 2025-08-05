import { useState, useEffect } from "react";
import HabitTracker from "../components/HabitTracker";
import MoodTracker from "../components/MoodTracker";
import SummaryCard from "../components/SummaryCard";
import StreaksCard from "../components/StreaksCard";

export default function HomePage() {
  const [selectedDate, setSelectedDate] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0); // forces re-renders


  // ⏳ Only runs on the client
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setSelectedDate(today);
  }, []);

  if (!selectedDate) return null; // or a loading spinner

  return (
    <main className="min-h-screen bg-gray-50 p-6 space-y-6">
      <h1 className="text-2xl font-bold text-center">LifeStack</h1>
      <p className="text-center text-sm text-blue-600 hover:underline cursor-pointer mb-4"
      onClick={() => {
      console.log("Clicked reset link");
      setShowModal(true)}}> clear data for this date </p>

      <div className="flex justify-center mb-4">
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border rounded px-3 py-1 text-sm shadow"
          max={new Date().toISOString().split("T")[0]}
        />
      </div>

      <HabitTracker selectedDate={selectedDate} key={`habit-${refreshKey}`} />
      <MoodTracker selectedDate={selectedDate} key={`mood-${refreshKey}`} />
      <SummaryCard selectedDate={selectedDate} key={`summary-${refreshKey}`} />
      <StreaksCard selectedDate={selectedDate} key={`streaks-${refreshKey}`} />


      {showModal && (
  <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded shadow-lg w-80 text-center">
      <p className="mb-4">
        Are you sure you want to delete data for <strong>{selectedDate}</strong>?
      </p>
      <div className="flex justify-around">
        <button
          className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
          onClick={() => {
            try {
              const raw = localStorage.getItem("lifestack_data");
              if (raw) {
                const data = JSON.parse(raw);
                delete data[selectedDate];
                localStorage.setItem("lifestack_data", JSON.stringify(data));
              }
              setShowModal(false);
              setRefreshKey((k) => k + 1); // re-renders children
            } catch (err) {
              console.error("Failed to clear data", err);
              setShowModal(false);
            }
          }}
        >
          Yes
        </button>
        <button
          className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
          onClick={() => setShowModal(false)}
        >
          No
        </button>
      </div>
    </div>
  </div>
)}

    </main>
  );
}
