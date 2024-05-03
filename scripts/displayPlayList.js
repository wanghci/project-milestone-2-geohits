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

    songView.getElementById("moveUp").addEventListener("click", () => {
        if (i != 0) {
            let swap = songs[i - 1];
            songs[i - 1] = songs[i];
            songs[i] = swap;
            localStorage.setItem("playList", JSON.stringify(songs));
            location.reload();
        } else {
            alert("Cannot Move Song Up");
        }
    })

    songView.getElementById("moveDown").addEventListener("click", () => {
        if (i != (songs.length - 1)) {
            let swap = songs[i];
            songs[i] = songs[i + 1];
            songs[i + 1] = swap;
            localStorage.setItem("playList", JSON.stringify(songs));
            location.reload();
        } else {
            alert("Cannot Move Song Down");
        }
    })


    songList.appendChild(songView);
}
