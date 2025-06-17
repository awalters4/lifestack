import { useState } from "react";

const defaultMoods = [
  { label: "Sad", emoji: "😔" },
  { label: "Happy", emoji: "😊" },
  { label: "Thinking", emoji: "🤔" },
  { label: "Silly", emoji: "😜" },
  { label: "Indifferent", emoji: "😐" },
  { label: "Angry", emoji: "😠" },
];

const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [customMood, setCustomMood] = useState("");
  const [customEmoji, setCustomEmoji] = useState("");
  const [notes, setNotes] = useState("");

  const handleMoodSelect = (emoji: string) => {
    setSelectedMood(emoji);
    setCustomMood("");
    setCustomEmoji("");
    setNotes("");
  };

  const handleOtherMoodSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customEmoji.trim()) {
      setSelectedMood(customEmoji);
    }
  };

  const handleSaveMood = () => {
    console.log("Saved Mood:", selectedMood);
    console.log("Notes:", notes);
    // future: save to Supabase
  };

  return (
    <div className="bg-white p-4 rounded shadow w-full max-w-md mx-auto mt-6">
      <h2 className="text-lg font-semibold mb-4 text-center">Today's Mood</h2>
      <div className="flex flex-wrap justify-center gap-4">
        {defaultMoods.map((mood) => (
          <button
            key={mood.emoji}
            onClick={() => handleMoodSelect(mood.emoji)}
            className={`text-3xl p-2 rounded-full transition ${
              selectedMood === mood.emoji ? "bg-blue-100" : "hover:bg-gray-100"
            }`}
          >
            {mood.emoji}
          </button>
        ))}
        <button
          onClick={() => {
            setSelectedMood(null);
            setCustomMood("Other");
          }}
          className={`text-3xl p-2 rounded-full transition ${
            customMood ? "bg-blue-100" : "hover:bg-gray-100"
          }`}
        >
          ➕
        </button>
      </div>

      {customMood && (
        <form
          onSubmit={handleOtherMoodSubmit}
          className="mt-4 flex items-center justify-center gap-2"
        >
          <label className="text-sm">Pick Emoji:</label>
          <input
            type="text"
            value={customEmoji}
            onChange={(e) => setCustomEmoji(e.target.value)}
            maxLength={2}
            className="border rounded px-2 py-1 w-16 text-center text-lg"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-3 py-1 rounded"
          >
            Set
          </button>
        </form>
      )}

      {selectedMood && (
        <div className="mt-4 text-center">
          <p className="text-lg">Selected Mood: <span className="text-2xl">{selectedMood}</span></p>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Optional notes..."
            className="w-full mt-3 p-2 border rounded"
            rows={3}
          />
          <button
            onClick={handleSaveMood}
            className="mt-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded"
          >
            Save Mood
          </button>
        </div>
      )}
    </div>
  );
};

export default MoodTracker;
