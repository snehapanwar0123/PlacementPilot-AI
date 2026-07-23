import CalendarEvent from "../models/CalendarEvent.js";

// Get all events for logged-in user
export const getEvents = async (req, res) => {
  try {
    const events = await CalendarEvent.find({
      user: req.user._id,
    }).sort({ date: 1 });

    res.json(events);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Create new event
export const createEvent = async (req, res) => {
  try {
    const { title, description, date, type } = req.body;

    const event = await CalendarEvent.create({
      user: req.user._id,
      title,
      description,
      date,
      type,
    });

    res.status(201).json(event);
    }catch (error) {
    console.error("CREATE EVENT ERROR:");
    console.error(error);

    res.status(500).json({
        message: error.message,
    });
    }
    };

// Update event
export const updateEvent = async (req, res) => {
  try {
    const event = await CalendarEvent.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    event.title = req.body.title ?? event.title;
    event.description = req.body.description ?? event.description;
    event.date = req.body.date ?? event.date;
    event.type = req.body.type ?? event.type;

    if (req.body.completed !== undefined) {
      event.completed = req.body.completed;
    }

    await event.save();

    res.json(event);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete event
export const deleteEvent = async (req, res) => {
  try {
    const event = await CalendarEvent.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    res.json({
      message: "Event deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
