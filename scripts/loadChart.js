function loadChart() {
    var card = localStorage.getItem('countryChart');
    if (card != null) {
        var currentCard = JSON.parse(card);
        document.getElementById("chart-pic").src = currentCard[0].flag;
        document.getElementById("songpic1").src = currentCard[0].img;
        document.getElementById("song1").textContent = currentCard[0].title;
        document.getElementById("songpic2").src = currentCard[1].img;
        document.getElementById("song2").textContent = currentCard[1].title;
        document.getElementById("songpic3").src = currentCard[2].img;
        document.getElementById("song3").textContent = currentCard[2].title;
        document.getElementById("songpic4").src = currentCard[3].img;
        document.getElementById("song4").textContent = currentCard[3].title;
        document.getElementById("songpic5").src = currentCard[4].img;
        document.getElementById("song5").textContent = currentCard[4].title;       
    }
}

document.addEventListener("DOMContentLoaded", loadChart);