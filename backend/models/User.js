const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
    date: { type: Date, required: true },
    type: { type: String, required: true },
    duration: { type: Number, required: true },
});

const goalSchema = new mongoose.Schema({
    target: { type: String, required: true },
    progress: { type: Number, required: true },
});

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    activities: [activitySchema],
    goals: [goalSchema],
});

module.exports = mongoose.model("User", userSchema);
