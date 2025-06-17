// pages/index.tsx
import HabitTracker from "../components/HabitTracker";
import MoodTracker from "../components/MoodTracker";

export default function Home() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">LifeStack Home</h1>
      <HabitTracker />
      <MoodTracker />
    </div>
  );
}
