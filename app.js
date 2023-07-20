const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;


let playlist = [
  { title: 'Song 1', artist: 'Artist 1', playCount: 0 },
  { title: 'Song 2', artist: 'Artist 2', playCount: 0 },
];


app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

function incrementPlayCount(songTitle) {
  const song = playlist.find((song) => song.title === songTitle);
  if (song) {
    song.playCount += 1;
  }
}

function getSongsSortedByPlayCount() {
  return playlist.sort((a, b) => b.playCount - a.playCount);
}

app.get('/', (req, res) => {
  const sortedSongs = getSongsSortedByPlayCount();
  res.render('index', { songs: sortedSongs });
});

app.post('/add', (req, res) => {
  const { title, artist } = req.body;
  playlist.push({ title, artist, playCount: 0 });
  res.redirect('/');
});

app.get('/simulate-plays', (req, res) => {
  incrementPlayCount('Song 1');
  incrementPlayCount('Song 2');
  incrementPlayCount('Song 1');
  incrementPlayCount('Song 2');
  incrementPlayCount('Song 2');
  res.redirect('/');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
