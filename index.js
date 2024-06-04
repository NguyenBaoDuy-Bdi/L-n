const image = document.getElementById('cover'),
    title = document.getElementById('music-title'),
    artist = document.getElementById('music-artist'),
    currentTimeEl = document.getElementById('current-time'),
    durationEl = document.getElementById('duration'),
    progress = document.getElementById('progress'),
    playerProgress = document.getElementById('player-progress'),
    prevBtn = document.getElementById('prev'),
    nextBtn = document.getElementById('next'),
    playBtn = document.getElementById('play'),
    background = document.getElementById('bg-img');

const music = new Audio();

const songs = [
    {
        path: 'assets/1.mp3',
        displayName: 'The Charmer\'s Call',
        cover: 'assets/1.jpg',
        artist: 'Hanu Dixit',
    },
    {
        path: 'assets/2.mp3',
        displayName: 'You Will Never See Me Coming',
        cover: 'assets/2.jpg',
        artist: 'NEFFEX',
    },
    {
        path: 'assets/3.mp3',
        displayName: 'Intellect',
        cover: 'assets/3.jpg',
        artist: 'Yung Logos',
    },
    {
        path: 'assets/4.mp3',
        displayName: 'Chạy ngay đi',
        cover: 'assets/4.jpg',
        artist: 'Sơn Tùng M-TP',
    },
    {
        path: 'assets/5.mp3',
        displayName: 'Hãy trao cho anh',
        cover: 'assets/5.jpg',
        artist: 'Sơn Tùng M-TP',
    },
    {
        path: 'assets/6.mp3',
        displayName: 'Chúng ta không thuộc về nhau',
        cover: 'assets/6.jpg',
        artist: 'Sơn Tùng M-TP',
    },
    {
        path: 'assets/7.mp3',
        displayName: 'Chúng ta của tương lai',
        cover: 'assets/7.jpg',
        artist: 'Sơn Tùng M-TP',
    },
    {
        path: 'assets/8.mp3',
        displayName: 'Nơi này có anh',
        cover: 'assets/8.jpg',
        artist: 'Sơn Tùng M-TP',
    },
    {
        path: 'assets/9.mp3',
        displayName: 'Making My Way',
        cover: 'assets/9.jpg',
        artist: 'Sơn Tùng M-TP',
    },
    {
        path: 'assets/10.mp3',
        displayName: 'Một năm mới bình an',
        cover: 'assets/10.jpg',
        artist: 'Sơn Tùng M-TP',
    },
    {
        path: 'assets/11.mp3',
        displayName: 'Lạc trôi',
        cover: 'assets/11.jpg',
        artist: 'Sơn Tùng M-TP',
    },
    {
        path: 'assets/12.mp3',
        displayName: 'Có chắc yêu là đây',
        cover: 'assets/12.jpg',
        artist: 'Sơn Tùng M-TP',
    },
    {
        path: 'assets/13.mp3',
        displayName: 'Nắng ấm xa dần',
        cover: 'assets/13.jpg',
        artist: 'Sơn Tùng M-TP',
    },
];

let musicIndex = 0;
let isPlaying = false;

function togglePlay() {
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
}

function playMusic() {
    isPlaying = true;
    // Change play button icon
    playBtn.classList.replace('fa-play', 'fa-pause');
    // Set button hover title
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

function pauseMusic() {
    isPlaying = false;
    // Change pause button icon
    playBtn.classList.replace('fa-pause', 'fa-play');
    // Set button hover title
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

function loadMusic(song) {
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
    background.src = song.cover;
}

function changeMusic(direction) {
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}

function updateProgressBar() {
    const { duration, currentTime } = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
    durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
    currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
}

function setProgressBar(e) {
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click', setProgressBar);

loadMusic(songs[musicIndex]);