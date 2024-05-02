let songs = JSON.parse(localStorage.getItem("playList"));
let template = document.getElementById("song-template");
let songList = document.getElementById("song-list");

document.getElementById("clear-button").addEventListener("click", () => {
    localStorage.removeItem("playList");
    location.reload();
})

for (let i = 0; i < songs.length; i++) {
    let song = songs[i];

    let songView = template.content.cloneNode(true);

    let image = songView.querySelector("#song-pic-0");
    image.src = song.img;
    image.alt = song.title + " " + i;

    let titleText = songView.querySelector("#name-song-0");
    titleText.textContent = song.title;

    songView.getElementById("deleteBtn").addEventListener("click", () => {
        songs.splice(i, 1);
        localStorage.setItem("playList", JSON.stringify(songs));
        location.reload();
    })

    songList.appendChild(songView);
}