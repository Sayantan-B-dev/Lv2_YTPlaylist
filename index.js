const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodoverride = require("method-override");
const port = 3000;

const mainPlaylist = require("./models/playlists");
const types = ["Mathematics", "Webdev", "Coding", "Theory/collage subjects"];


mongoose
  .connect("mongodb://127.0.0.1:27017/Playlists")
  .then(() => {
    console.log("yey connnected");
  })
  .catch((err) => {
    console.log("oh no" + err);
  });

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(methodoverride("_method"));
app.use(express.json());
//
//
app.get("/playlists", async (req, res) => {
    try {
      const { playlistType } = req.query;
      if (playlistType) {
        const lists = await mainPlaylist.find({ playlistType });
        res.render("playlistEJS/index.ejs", { lists, playlistType });
      } else {
        const lists = await mainPlaylist.find({});
        res.render("playlistEJS/index.ejs", { lists, playlistType:'All'});
      }
    } catch (e) {
        console.log(e)
    }
})

app.get("/playlists/add", (req, res) => {
  res.render("playlistEJS/addList", { types });
});
app.post('/playlists', async (req, res) => {
  const newPlaylist = new mainPlaylist(req.body);
  await newPlaylist.save();
  res.redirect(`/playlists/${newPlaylist._id}`);  
})


app.get("/playlists/:id", async (req, res) => {
  try {
      const { id } = req.params;
      const list =await mainPlaylist.findById(id);
      res.render("playlistEJS/eachList", { list });
  } catch (e) {
    console.log(e);
  }
});

app.get("/playlists/:id/edit", async (req, res) => {
  try {
    const { id } = req.params;
    const list = await mainPlaylist.findById(id);
    res.render("playlistEJS/editList", { list ,types});
  } catch (e) {
    console.log(e);
  }
});
app.put("/playlists/:id", async (req,res) => {
    const { id } = req.params;
    const list = await mainPlaylist.findByIdAndUpdate(id, req.body, { runValidators: true });
    res.redirect(`/playlists/${list._id}`);
});
app.delete("/playlists/:id", async (req, res) => {
  const { id } = req.params;
  if (id) {
    const deletedlist = await mainPlaylist.findByIdAndDelete(id);
    res.redirect(`/playlists`);
  } else {
    res.send('error');
  }
});

app.listen(port, () => {
  console.log("listening to ", port);
});
