let country = "";

document.getElementById("country-submit").addEventListener('click', async () => {
    localStorage.setItem("country-song", null);
    localStorage.setItem("currentCard", null);
    localStorage.setItem("countryChart", null);

    country = document.querySelector(".search").value;
    
    let response = await fetch("https://restcountries.com/v3.1/name/" + country);
    if (response.status == 404) {
        alert("Please Enter Valid Country.")
    }
    let data = await response.json();

    const search = await fetch(`https://api.spotify.com/v1/search?q=top+50+${country}&type=playlist&limit=1&offset=0`, {
        headers: {
            'Authorization': 'Bearer ' + accessToken,
        },
    });

    let searchData = await search.json();

    const playlistID = searchData.playlists.items[0].href

    const playlist = await fetch(playlistID, {
        headers: {
            'Authorization': 'Bearer ' + accessToken,
        },
    });

    let musicData = await playlist.json();

    let albumInfo;
    if (musicData.tracks.items[0].track.album.albumType == "single") {
        albumInfo = "Single";
    } else { 
        albumInfo = musicData.tracks.items[0].track.album.name;
    }

    let miliSeconds = musicData.tracks.items[0].track.duration_ms;
    let minutes = Math.floor(miliSeconds / 60000);
    let seconds = ((miliSeconds % 60000) / 1000).toFixed(0);
    let lengthInfo = minutes + ":" + (seconds < 10 ? 0 : '') + seconds;

    var country_song = {
        flag: "https://flagsapi.com/" + data[0].altSpellings[0] + "/flat/64.png",
        img: musicData.tracks.items[0].track.album.images[0].url,
        title:  musicData.tracks.items[0].track.name + " - " + musicData.tracks.items[0].track.artists[0].name
    }

    localStorage.setItem("country-song", JSON.stringify(country_song));
    document.querySelector(".info-pic").src = country_song.flag;
    document.getElementById("song-cap").textContent = country_song.title;
    document.getElementById("song-pic").src = country_song.img;

    var currentCard = {
        img: musicData.tracks.items[0].track.album.images[0].url,
        title: musicData.tracks.items[0].track.name,
        artist: musicData.tracks.items[0].track.artists[0].name,
        album: albumInfo,
        length: lengthInfo,
        release: musicData.tracks.items[0].track.album.release_date
    }

    localStorage.setItem("currentCard", JSON.stringify(currentCard));

    var countryChart = [];
    
    countryChart[0] = {
        flag: "https://flagsapi.com/" + data[0].altSpellings[0] + "/flat/64.png",
        img: musicData.tracks.items[0].track.album.images[0].url,
        title: musicData.tracks.items[0].track.name
    }

    countryChart[1] = {
        img: musicData.tracks.items[1].track.album.images[0].url,
        title: musicData.tracks.items[1].track.name
    }

    countryChart[2] = {
        img: musicData.tracks.items[2].track.album.images[0].url,
        title: musicData.tracks.items[2].track.name
    }

    countryChart[3] = {
        img: musicData.tracks.items[3].track.album.images[0].url,
        title: musicData.tracks.items[3].track.name
    }

    countryChart[4] = {
        img: musicData.tracks.items[4].track.album.images[0].url,
        title: musicData.tracks.items[4].track.name
    }

    localStorage.setItem("countryChart", JSON.stringify(countryChart));
});