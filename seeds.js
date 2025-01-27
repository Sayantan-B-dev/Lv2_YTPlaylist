const mongoose = require("mongoose");

const mainPlaylist = require("./models/playlists");

mongoose
    .connect("mongodb://127.0.0.1:27017/Playlists")
    .then(() => {
        console.log("yey connnected");
    })
    .catch((err) => {
        console.log("oh no" + err);
    });

const playlists = [
    {
        playlistName: "Advanced Math",
        playlistLink: "https://example.com/advanced-math",
        playlistType: "Mathematics",
    },
    {
        playlistName: "Fullstack Web Development",
        playlistLink: "https://example.com/fullstack-webdev",
        playlistType: "Webdev",
    },
    {
        playlistName: "Learn Python",
        playlistLink: "https://example.com/learn-python",
        playlistType: "Coding",
    },
    {
        playlistName: "Algorithms and Data Structures",
        playlistLink: "https://example.com/algorithms-dsa",
        playlistType: "Coding",
    },
    {
        playlistName: "Physics for Engineers",
        playlistLink: "https://example.com/physics-engineers",
        playlistType: "Theory/collage subjects",
    },
];

mainPlaylist
    .insertMany(playlists)
    .then((res) => {
        console.log(res);
    })
    .catch((e) => {
        console.log(e);
    });
