const mongoose = require("mongoose");

const playlistschema = new mongoose.Schema({
  playlistName: {
    type: String,
    required: true,
  },
  playlistLink: {
    type: String,
    required: true,
  },
  playlistType: {
    type: String,
    enum: ["Mathematics", "Webdev", "Coding", "Theory/collage subjects"],
  },
});

const Playlist = mongoose.model("Playlist", playlistschema);

module.exports = Playlist;