function loadIndex() {
    var card = localStorage.getItem('country-song');
    if (card != null) {
        var currentCard = JSON.parse(card);
        document.querySelector(".info-pic").src = currentCard.flag;
        document.getElementById("song-cap").textContent = currentCard.title;
        document.getElementById("song-pic").src = currentCard.img;
    }
}

document.addEventListener("DOMContentLoaded", loadIndex);