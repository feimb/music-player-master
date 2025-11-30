// script.js

const songs = [
  {
    title: "Lost in the City Lights",
    author: "Cosmo Sheldrake",
    src: "./resources/lost-in-city-lights-145038.mp3",
    img: "./resources/cover-1.jpg",
  },
  {
    title: "Forest Lullaby",
    author: "Lesfm",
    src: "./resources/forest-lullaby-110624.mp3",
    img: "./resources/cover-2.jpg",
  },
];
function format(t) {
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}
let currentSongIndex = 0;
const audio = new Audio(songs[currentSongIndex].src);
const btnPlay = document.getElementById("btn-play")
btnPlay.addEventListener("click", playPause);
document.getElementById("btn-next").addEventListener("click", nextSong);
document.getElementById("btn-prev").addEventListener("click", prevSong);
audio.addEventListener("timeupdate", updateProgressBar);

function playPause() {
  if(audio.paused){
    btnPlay.children[0].classList.add("inactive");
    btnPlay.children[1].classList.remove("inactive");
    audio.play();
  } else {
    btnPlay.children[1].classList.add("inactive");
    btnPlay.children[0].classList.remove("inactive");
    audio.pause();
  }
}

function nextSong() {
  // Add next button implementation
  currentSongIndex += 1;
  if(currentSongIndex == songs.length){
    currentSongIndex = 0;
  }
  loadSong(currentSongIndex);
}

function prevSong() {
  // Add previous button implementation
  currentSongIndex -= 1;
  if(currentSongIndex < 0){
    currentSongIndex = songs.length - 1;
  }
  loadSong(currentSongIndex);
}

function loadSong(index) {
  // Add load song implementation
  document.querySelector(".song-title").textContent = songs[index].title;
  document.querySelector(".song-artist").textContent = songs[index].author;

  document.querySelector(".img-song").src = songs[index].img
  audio.src = songs[index].src;
  document.querySelector(".current-time").textContent = "00:00";
  audio.addEventListener("loadedmetadata", () => {
    document.querySelector(".total-time").textContent = format(audio.duration);
  })
}

function updateProgressBar() {
  // Handle when progress bar is updated
  document.querySelector(".current-time").textContent = format(audio.currentTime);
  const progress = (audio.currentTime / audio.duration) * 100;
  document.querySelector(".bar").style.setProperty("--progress", progress + "%");
}

document.querySelector(".bar").onclick = e =>{
  const bar = e.currentTarget;
  const percent =   (e.offsetX / bar.clientWidth) * 100;
  
  audio.currentTime= (percent/ 100) * audio.duration;
  bar.style.setProperty("--progress", percent + "%");
  if(audio.paused){
    playPause()
  }
}

// Initial load
loadSong(currentSongIndex);