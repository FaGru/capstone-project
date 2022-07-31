const mongoose = require("mongoose");

const midiDataSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    text: {
      type: String,
      required: [true, "Please add a text value"],
    },
    midiData: {
      type: [],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("MidiData", midiDataSchema);
