const video = document.getElementById('video');
const playBtn = document.getElementById('play');
const stopBtn = document.getElementById('stop');
const progressBar = document.getElementById('progress');
const timestamp = document.getElementById('timestamp');

async function playVideo() {
  try {
    await video.play();
    playBtn.innerHTML = '<i class="fa fa-pause fa-2x"></i>';
  } catch (err) {
    playBtn.innerHTML = '<i class="fa fa-play fa-2x"></i>';
  }
}

function playPause() {
  if (video.paused) {
    playVideo();
  } else {
    video.pause();
    playBtn.innerHTML = '<i class="fa fa-play fa-2x"></i>';
  }
}

window.addEventListener('keydown', function (event) {
  if (event.code === 'Space' && video.paused) {
    playVideo();
  } else {
    video.pause();
    playBtn.innerHTML = '<i class="fa fa-play fa-2x"></i>';
  }
});

video.addEventListener('ended', (event) => {
  console.log(
    'Video stopped either because it has finished playing or no further data is available.',
  );
});

function stopVideo() {
  video.currentTime = 0;
  video.pause();
  playBtn.innerHTML = '<i class="fa fa-play fa-2x"></i>';
}

const timeFormat = (k) => k.toString().padStart(2, 0);

function updateProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.value = percent.toFixed(3);

  const minutes = Math.floor((video.currentTime % 3600) / 60);
  const secondes = Math.floor(video.currentTime % 60);
  timestamp.innerText = `${timeFormat(minutes)}:${timeFormat(secondes)}`;
}

function setProgress(e) {
  video.currentTime = (e.offsetX / progressBar.offsetWidth) * video.duration;
}

playBtn.addEventListener('click', playPause);
video.addEventListener('click', playPause);
stopBtn.addEventListener('click', stopVideo);
video.addEventListener('timeupdate', updateProgress);
progressBar.addEventListener('click', setProgress);
