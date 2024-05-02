function loadSong() {
    var card = localStorage.getItem('currentCard');
    if (card != null) {
        var currentCard = JSON.parse(card);
        document.getElementById("song-cover").src = currentCard.img;
        document.getElementById("cur-song-title").textContent = "Song Title: " + currentCard.title;
        document.getElementById("cur-song-artist").textContent = "Arist: " + currentCard.artist;
        document.getElementById("cur-song-album").textContent = "Album: " + currentCard.album;
        document.getElementById("cur-song-length").textContent = "Length: " + currentCard.length;
        document.getElementById("cur-song-date").textContent = "Release Date: " + currentCard.release;
    }
}

document.addEventListener("DOMContentLoaded", loadSong);