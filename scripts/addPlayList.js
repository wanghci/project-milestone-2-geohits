document.getElementById("addToPlayList").addEventListener("click", function(event) {
    var playlist = localStorage.getItem("playList");
    if (playlist === null) {
        playListInfo = [];
    } else {
        playListInfo = JSON.parse(playlist);
    }

    var card = localStorage.getItem('currentCard');
    var currentCard = JSON.parse(card);

    var song = {
        img: currentCard.img,
        title: currentCard.title
    }
    playListInfo.push(song);
    localStorage.setItem("playList", JSON.stringify(playListInfo));
    console.log(localStorage.getItem('playList'));
    alert("Song Added To Playlist!")
});
