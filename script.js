const songName=document.getElementById("song-name");
const bandName =document.getElementById("band-name");
const song=document.getElementById('audio');
const cover=document.getElementById("cover")
const play = document.getElementById('play');
const next=document.getElementById('next');
const previous = document.getElementById("previous");
const currentProgress = document.getElementById("current-progress")
const shuffleButton = document.getElementById("shuffle")

const chuvaDePrataGal={
    songName:"Chuva de Prata",
    artist: "Gal Costa",
    file: "chuva"
};

const minhaVida={
    songName:"Minha Vida",
    artist:"Lulu Santos",
    file:"minhavida"
}


const vaporBarato={
    songName:"Vapor Barato",
    artist:"Zeca Baleiro",
    file:"vaporbarato"
}


songName.innerText="Chuva de Prata";
let isPlayng=false;
const originalPlaylist = [chuvaDePrataGal, minhaVida, vaporBarato];
let sortedPlaylist = [...originalPlaylist];
let isShuffled=false;
let index=0;


function playSong(){
    play.querySelector(".bi").classList.remove("bi-play-circle-fill");
    play.querySelector(".bi").classList.add("bi-pause-circle-fill");
    song.play();
    isPlayng=true;
}

function pauseSong(){
    play.querySelector(".bi").classList.add("bi-play-circle-fill");
    play.querySelector(".bi").classList.remove("bi-pause-circle-fill");
    song.pause();
}

function playPauseDecider(){
    if(isPlayng===false){
        playSong();
    }
    else{
        pauseSong();
    }
}
function jumpTo(event){
    const width = progressContainer.clientWidth;
    const clickPosition = event.offsetX;
    const jumpToTime=(clickPosition/width)*song.duration;
    song.currentTime=jumpToTime;

}

function shuffleArray(preSuffleArray){
    const size = preSuffleArray.lastIndex;
    let currentIndex = size-1;
    while(currentIndex > 0){
        let randomindex = Math.floor(Math.random()*size);
        let aux = preSuffleArray[currentIndex];
        preSuffleArray[currentIndex]= preSuffleArray[randomindex];
        preSuffleArray[randomindex]= aux;
        currentIndex-=1;

    }
}


function initializeSong(){
    cover.src = `imagens/${sortedPlaylist[index].file}.png`;
    song.src = `songs/${sortedPlaylist[index].file}.mp3`;
    songName.innerText=sortedPlaylist[index].songName;
    bandName.innerText=sortedPlaylist[index].artist;
}

function previousSong(){
    if(index===0){
        index=sortedPlaylist.length-1;
    }
    else{
        index -=1;
    }
    initializeSong();
    playSong();
}

function nextSong(){
    if(index===(sortedPlaylist.length-1)){
        index=0;
    }
    else{
        index +=1;
    }
    initializeSong()
    playSong();
}

function updateProgressBar(){
    const barWith=(song.currentTime/song.duration)*100;
    currentProgress.style.setProperty('--progress',`${barWith}%`);
};


function shuffleButtonClicked(){
    if(isShuffled===false){
        isShuffled=true;
        shuffleArray(sortedPlaylist);
        shuffleButton.classList.add('button-active');
    }
    else{
        isShuffled=false;
        sortedPlaylist =[...originalPlaylist];
        shuffleButtom.classList.remove('button-active');  
    }


}


initializeSong();


play.addEventListener("click",playPauseDecider);
previous.addEventListener('click', previousSong);
next.addEventListener('click',nextSong);
song.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener("click", jumpTo);
shuffleButton.addEventListener("click",shuffleButtonClicked);

