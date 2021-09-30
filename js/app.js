// Song data
const songList = [
    {
        title: "Acoustic Breeze",
        file: "acousticbreeze.mp3",
        cover: "1.jpeg"

    },
    {
        title: "A New Beginning",
        file: "anewbeginning.mp3",
        cover: "2.jpeg"
    },
    {
        title: "Creative Minds",
        file: "creativeminds.mp3",
        cover: "3.jpeg"
    },
]

// Cancion actual

let actualSong = null


// Grab element DOM
const songs = document.getElementById("songs")
const audio = document.getElementById("audio")
const cover = document.getElementById("cover")
const title = document.getElementById("title")
const play = document.getElementById("play") 
const prev = document.getElementById("prev") 
const next = document.getElementById("next")
const progress = document.getElementById("progress")
const progressContainer = document.getElementById("progress-container")
progressContainer.addEventListener("click", setProgress)

// Escuchar elemento audio
audio.addEventListener("timeupdate", updateProgress )


// Escuchar clicks en el boton playSong
play.addEventListener("click", () =>{
    if(audio.paused){
        playSong()
    }else {
        pauseSong()
    }
})
// Escuchar clicks en el boton prevSong
prev.addEventListener("click", () => prevSong())


// Escuchar clicks en el boton nextSong

next.addEventListener("click", () => nextSong())




// Cargar canciones y mostrar el listado
function loadSongs () {
    songList.forEach((song, index) => {
        // Crear li
        const li = document.createElement("li")
        // Crear a
        const link = document.createElement("a")
        // Mostrar a
        link.textContent = song.title
        link.href = "#"
        // Escuchar clicks
        link.addEventListener("click", () => loadSong(index))
        // Añadir a li
        li.appendChild(link)
        // Añadir li a ul
        songs.appendChild(li)
    })
}

// Cargar cancion seleccionada

function loadSong (songIndex) {

    if(songIndex !== actualSong){
        changeActiveclass(actualSong, songIndex)
        actualSong = songIndex
        audio.src = "./audio/" + songList[songIndex].file 
        audio.play()
        playSong()
        changeCover(songIndex)
        changeSongtitle(songIndex)
        
        
    }
    
}

// Actualizar barra de proceso
function updateProgress( event) {
    const {duration,currentTime} = event.srcElement
    const percent = (currentTime / duration)*100
    progress.style.width = percent + "%"
}


// Hacer la barra de progreso clicable
function setProgress(event){
    const totalWidth = this.offsetWidth
    const progressWidth = event.offsetX
    const current = (progressWidth/totalWidth) * audio.duration
    audio.currentTime = current
}

// Actualizar controles
function updateControls () {
    if(audio.paused){
        play.classList.remove("fa-pause")
        play.classList.add("fa-play")
    } else{
        play.classList.add("fa-pause")
        play.classList.remove("fa-play")
    }   
}

// Reproducir cancion
function playSong(){
    if(actualSong !== null){
        audio.play()
        updateControls()
    }
}

// Anterior cancion
function prevSong(){
    if(actualSong > 0){
        loadSong(actualSong -1 )
    } else{
        loadSong(songList.length -1 )
    }
}
// Siguiente cancion
function nextSong(){
    if(actualSong < songList.length -1 ){
        loadSong(actualSong + 1)
    } else{
        loadSong(0)
    }
}

// Pausar cancion
function pauseSong(){
    audio.pause()
    updateControls()
}

// Cambiar clase activa
function changeActiveclass (lastIndex,newIndex) {
    const links = document.querySelectorAll("a")
    if(lastIndex !== null){
        links[lastIndex].classList.remove("active")

    }
        links[newIndex].classList.add("active")

}

// Cambiar el cover de la canciones
function changeCover(songIndex){
    cover.src = "./img/" + songList[songIndex].cover 
}

// Cambiar el titulo de la canciones
function changeSongtitle (songIndex){
    title.innerText = songList[songIndex].title 
}

// Lanzar siguiente cancion cuando acabe

audio.addEventListener("ended", () => nextSong())


// GO !
loadSongs()