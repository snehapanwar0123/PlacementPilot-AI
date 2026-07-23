import { useEffect, useState } from "react";
import calendarService from "../../services/calendarService";

const eventTypes = [
  "Online Assessment",
  "Interview",
  "Resume Deadline",
  "Coding Contest",
  "Reminder",
  "Personal",
];

const EventModal = ({ selectedDate, event, onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("Reminder");
  const [date, setDate] = useState("");
  

  useEffect(() => {
    console.log("selectedDate =", selectedDate);
  if (event) {
    setTitle(event.title || "");
    setDescription(event.description || "");
    setType(event.type || "Reminder");
    const localDate = new Date(selectedDate);
    localDate.setMinutes(
    localDate.getMinutes() - localDate.getTimezoneOffset()
    );

    setDate(localDate.toISOString().split("T")[0]);
  } else {
    setTitle("");
    setDescription("");
    setType("Reminder");

    if (selectedDate) {
      const localDate = new Date(selectedDate);
        localDate.setMinutes(
        localDate.getMinutes() - localDate.getTimezoneOffset()
        );

        setDate(localDate.toISOString().split("T")[0]);

    } else {
      setDate("");
    }
  }
}, [event, selectedDate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!date) {
      alert("Please select a date.");
      return;
    }
    
    const eventData = {
      title,
      description,
      type,
      date,
    };

    try {
      if (event) {
        await calendarService.updateEvent(event._id, eventData);
      } else {
        await calendarService.createEvent(eventData);
      }

      onClose();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  const handleDelete = async () => {
    if (!event) return;

    if (!window.confirm("Delete this event?")) return;

    try {
      await calendarService.deleteEvent(event._id);
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to delete event");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-[450px] p-6">
        <h2 className="text-2xl font-semibold mb-5 text-red-600">
            THIS IS THE NEW MODAL
            </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Event Title"
            className="w-full border rounded-lg p-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <textarea
            placeholder="Description"
            rows={3}
            className="w-full border rounded-lg p-2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            type="date"
            className="w-full border rounded-lg p-2"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />

          <select
            className="w-full border rounded-lg p-2"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            {eventTypes.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <div className="flex justify-between pt-3">
            {event ? (
              <button
                type="button"
                onClick={handleDelete}
                className="bg-red-600 text-white px-4 py-2 rounded-lg"
              >
                Delete
              </button>
            ) : (
              <div />
            )}

            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="border px-4 py-2 rounded-lg"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                {event ? "Update" : "Save"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventModal;