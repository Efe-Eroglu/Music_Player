const player = new Player(musics);

const container = document.querySelector(".container");
const banner = document.querySelector("#banner");
const title = document.querySelector(".title");
const singer = document.querySelector(".singer");
const play = document.getElementById("play");
const previous = document.getElementById("prev");
const ul = document.querySelector("#ul-tag");
const next = document.getElementById("next");
const duration = document.getElementById("duration");
const currentTime = document.getElementById("current-time");
const progressBar = document.getElementById("progress-bar");
const volume = document.getElementById("volume");
const volumeBar = document.getElementById("volume-bar");

window.addEventListener("load", () => {
    let music = player.getMusic();
    displayMusic(music);
    displayList(player.musics);
    isPlay();
});

function displayMusic(music)
{
    title.innerText = music.title;
    singer.innerText = music.singer;
    banner.src = "img/"+music.img;
    audio.src = "musics/"+music.sound;
}

function playMusic()
{
    container.classList.add("playing");
    play.querySelector("i").classList = "fa-solid fa-pause"
    audio.play();
}

function pauseMusic()
{
    container.classList.remove("playing");
    play.querySelector("i").classList="fa-solid fa-play";
    audio.pause();
}

function nextMusic()
{
    player.nextMusic();
    let music = player.getMusic();
    displayMusic(music);
    playMusic();
    isPlay();
}

function previousMusic()
{
    player.previousMusic();
    let music = player.getMusic();
    displayMusic(music);
    playMusic();
    isPlay();
}

play.addEventListener("click", () => {
    const isPlay = container.classList.contains("playing");
    isPlay ? pauseMusic() : playMusic();
});

next.addEventListener("click", () => {nextMusic()});
previous.addEventListener("click", () => {previousMusic()});

//#region Audio Events
audio.addEventListener("loadedmetadata",() => {
    duration.textContent = calculateTime(audio.duration);
    progressBar.max = Math.floor(audio.duration);
    
});

audio.addEventListener("timeupdate", () => {
    progressBar.value = Math.floor(audio.currentTime);
    currentTime.innerText = calculateTime(progressBar.value);
});

audio.addEventListener("ended", () => {
    this.nextMusic();
});
//#endregion


progressBar.addEventListener("input", () => {
    currentTime.innerText = calculateTime(progressBar.value);
    audio.currentTime = progressBar.value;
});

function calculateTime(totalTime)
{
    const minute = Math.floor(totalTime/60);
    const second = Math.floor(totalTime%60);
    const temp_second = second<10 ? `0${second}`:`${second}`;
    const time = `${minute}:${temp_second}`
    return time
}

let isMuted = false;
volume.addEventListener("click", () => {mute()});

function mute()
{
    if(isMuted)
    {
        audio.muted = false;
        isMuted=false;
        volume.classList="fa-solid fa-volume-high";
        volumeBar.value = 100;
        audio.volume = 1;
    }
    else
    {
        audio.muted = true;
        isMuted = true;
        volume.classList = "fa-solid fa-volume-xmark";
        volumeBar.value = 0;
        audio.volume = 0 ;
    }
}


volumeBar.addEventListener("input",(e) => {
    const value = e.target.value;
    let sound_level = value/100;
    audio.volume = sound_level;
    if(value == 0)
    {
        audio.muted = true;
        isMuted = true
        volume.classList = "fa-solid fa-volume-xmark"
    }
    else
    {
        audio.muted = false;
        isMuted = false;
        volume.classList = "fa-solid fa-volume-high";
    }
});

function displayList(musics)
{
    for(let i=0 ; i< musics.length; i++)
    {
        let li = `
        <li li-index='${i}' onclick="selectMusic(this)" class="list-group-item d-flex justify-content-between align-items-center">
            <span>${musics[i].title} - ${musics[i].singer}</span>
            <span id="music-${i}" class="badge bg-warning rounded-pill"></span>
            <audio class="music-${i}" src="mp3/${musics[i].sound}"></audio>
        </li>
        `;
        ul.insertAdjacentHTML("beforeend", li);

        let liAudioDuration = ul.querySelector(`#music-${i}`);
        let liAudioTag = ul.querySelector(`.music-${i}`);

        liAudioTag.addEventListener("loadeddata", () => {
            liAudioDuration.innerText = calculateTime(liAudioTag.duration);
        });
    }
}

const selectMusic = (li) => {
    player.index = li.getAttribute("li-index");    
    displayMusic(player.getMusic());
    playMusic();
    isPlay();
}

const isPlay = () => {
    for(let li of ul.querySelectorAll("li")) {
        if(li.classList.contains("playing")) {
            li.classList.remove("playing");
        }

        if(li.getAttribute("li-index") == player.index) {
            li.classList.add("playing");
        }
    }
}

