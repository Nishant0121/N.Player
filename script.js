// Music Player Functionality
const audio = document.getElementById("audio");
const playPauseBtn = document.getElementById("play-pause-btn");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const progressBar = document.getElementById("progress-bar");
const volumeSlider = document.getElementById("volume-slider");
const playlistEl = document.getElementById("playlist");
const songTitle = document.getElementById("song-title");
const songArtist = document.getElementById("song-artist");

// Playlist
const songs = [
  {
    title: "Ram Siya Ram",
    artist: "Artist 1",
    src: "audio/RamSiyaRam.mp3",
  },
  { title: "Aaj-Mausam", artist: "Artist 2", src: "audio/Aaj-Mausam.mp3" },
  {
    title: "Goryaa Goryaa - Ajay Atul",
    artist: "Ajay Atul",
    src: "audio/Goryaa Goryaa - Ajay Atul.mp3",
  },
];

let currentSongIndex = 0;

// Load Initial Song
function loadSong(songIndex) {
  const song = songs[songIndex];
  audio.src = song.src;
  songTitle.textContent = song.title;
  songArtist.textContent = `Artist: ${song.artist}`;
}

// Play or Pause Song
function togglePlayPause() {
  if (audio.paused) {
    audio.play();
    playPauseBtn.textContent = "⏸";
  } else {
    audio.pause();
    playPauseBtn.textContent = "▶";
  }
}

// Play Previous Song
function playPrevious() {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadSong(currentSongIndex);
  audio.play();
  playPauseBtn.textContent = "⏸";
}

// Play Next Song
function playNext() {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(currentSongIndex);
  audio.play();
  playPauseBtn.textContent = "⏸";
}

// Update Progress Bar
audio.addEventListener("timeupdate", () => {
  progressBar.value = (audio.currentTime / audio.duration) * 100 || 0;
});

// Seek Audio
progressBar.addEventListener("input", () => {
  audio.currentTime = (progressBar.value / 100) * audio.duration;
});

// Update Volume
volumeSlider.addEventListener("input", () => {
  audio.volume = volumeSlider.value;
});

// Add Playlist Items
songs.forEach((song, index) => {
  const li = document.createElement("li");
  li.textContent = song.title;
  li.addEventListener("click", () => {
    currentSongIndex = index;
    loadSong(currentSongIndex);
    audio.play();
    playPauseBtn.textContent = "⏸";
  });
  playlistEl.appendChild(li);
});

// Event Listeners
playPauseBtn.addEventListener("click", togglePlayPause);
prevBtn.addEventListener("click", playPrevious);
nextBtn.addEventListener("click", playNext);

// Load First Song
loadSong(currentSongIndex);
