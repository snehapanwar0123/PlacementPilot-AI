import { useEffect, useState } from "react";
import {
  Calendar as BigCalendar,
  dateFnsLocalizer,
} from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { motion } from "framer-motion";
import "../styles/calendar-theme.css";
import CustomToolbar from "../components/Calendar/CustomToolbar";

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
      <motion.div
              className="min-h-screen bg-gradient-to-br from-[#EEF4FF] via-[#F6F3FF] to-[#DCE9FF] p-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
        >
            <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg">
              <span className="text-3xl">📅</span>
            </div>

            <div>
              <h1 className="text-4xl font-bold text-slate-900">
                Placement Calendar
              </h1>

              <p className="text-slate-600 mt-1">
                Track interviews, deadlines and important events
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setSelectedEvent(null);
              setSelectedDate(new Date());
              setShowModal(true);
            }}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold shadow-lg hover:scale-105 transition-all"
          >
            + Add Event
          </button>
        </div>

      <motion.div
          key={`${currentView}-${currentDate.getFullYear()}-${currentDate.getMonth()}`}
          className="calendar-container rounded-3xl border border-white/30 bg-[#1F2347]/95 backdrop-blur-xl shadow-[0_25px_60px_rgba(0,0,0,0.25)] p-6 h-[80vh] overflow-hidden"
          initial={{
          opacity: 0,
          scale: 0.95,
          y: 30,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
          ease: "easeOut",
        }}
        >
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
            components={{
                toolbar: CustomToolbar,
            }}
        />
      </motion.div>

      {showModal && (
        <EventModal
          selectedDate={selectedDate}
          event={selectedEvent}
          onClose={handleClose}
        />
      )}
    </motion.div>
  );
};

export default Calendar;