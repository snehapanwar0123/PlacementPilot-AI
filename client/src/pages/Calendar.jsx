import { useEffect, useState } from "react";
import {
  Calendar as BigCalendar,
  dateFnsLocalizer,
} from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import {
  format,
  parse,
  startOfWeek,
  getDay,
} from "date-fns";
import { enUS } from "date-fns/locale";

import calendarService from "../services/calendarService";
import EventModal from "../components/Calendar/EventModal";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const eventStyleGetter = (event) => {
  console.log("Event Type:", event.type);

  const colors = {
    Interview: "#2563eb",
    "Online Assessment": "#7c3aed",
    "Resume Deadline": "#dc2626",
    "Coding Contest": "#16a34a",
    Reminder: "#ea580c",
    Personal: "#6b7280",
  };

  return {
    style: {
      backgroundColor: colors[event.type] || "#000000",
      color: "#fff",
      borderRadius: "4px",
      border: "none",
    },
  };
};

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState("month");
  const [showModal, setShowModal] = useState(false);

  const loadEvents = async () => {
    try {
      const data = await calendarService.getEvents();

      const formatted = data.map((event) => ({
        ...event,
        start: new Date(event.date),
        end: new Date(event.date),
      }));

      setEvents(formatted);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const handleClose = () => {
    setShowModal(false);
    setSelectedDate(null);
    setSelectedEvent(null);
    loadEvents();
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        Placement Calendar
      </h1>

      <div className="bg-white rounded-xl shadow p-4 h-[80vh]">
        <BigCalendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          selectable
          popup
          style={{ height: "100%" }}
          onSelectSlot={(slotInfo) => {
            console.log("Clicked:", slotInfo.start);

            setSelectedDate(new Date(slotInfo.start));
            setSelectedEvent(null);
            setShowModal(true);
            }}
          onSelectEvent={(event) => {
            setSelectedEvent(event);
            setSelectedDate(new Date(event.date));
            setShowModal(true);
          }}
          date={currentDate}
            onNavigate={(date) => setCurrentDate(date)}

            view={currentView}
            onView={(view) => setCurrentView(view)}
            eventPropGetter={eventStyleGetter}
        />
      </div>

      {showModal && (
        <EventModal
          selectedDate={selectedDate}
          event={selectedEvent}
          onClose={handleClose}
        />
      )}
    </div>
  );
};

export default Calendar;