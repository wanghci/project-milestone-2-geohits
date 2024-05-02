let country = "";

document.getElementById("country-submit").addEventListener('click', async () => {
    country = document.querySelector(".search").value;
    console.log(country)
    let response = await fetch("https://restcountries.com/v3.1/name/" + country);
    let data = await response.json();
    
    let img = document.querySelector(".info-pic")
    console.log(data);
    let source = "https://flagsapi.com/" + data[0].altSpellings[0] + "/flat/64.png";
    console.log(source);
    img.src = source;
    img.alt = data[0].altSpellings[0];
    country_code = data[0].altSpellings[0];

    const search = await fetch(`https://api.spotify.com/v1/search?q=top+50+${country}&type=playlist&limit=1&offset=0`, {
            headers: {
                'Authorization': 'Bearer ' + accessToken,
            },
        });

        let searchData = await search.json();
        console.log("1st")

        // console.log(searchData)
        // console.log(searchData.playlists.items[0].images[0].url)
        // console.log(searchData.playlists.items[0].href)
        const playlistID = searchData.playlists.items[0].href
        // document.getElementById("song-pic").src = searchData.playlists.items[0].images[0].url

        const playlist = await fetch(playlistID, {
            headers: {
                'Authorization': 'Bearer ' + accessToken,
            },
        });

        let musicData = await playlist.json();

        console.log(musicData)
        // console.log(musicData.tracks.items[0].track.album.images[0].url)
        document.getElementById("song-pic").src = musicData.tracks.items[0].track.album.images[0].url
        let caption = document.getElementById("song-cap")
        caption.textContent = musicData.tracks.items[0].track.name + " - " + musicData.tracks.items[0].track.artists[0].name
        // document.getElementById("song-cover").src = musicData.tracks.items[0].track.album.images[0].url
        let albumInfo;
        if (musicData.tracks.items[0].track.album.albumType == "single") {
            albumInfo = "Single";
        } else { 
            albumInfo = musicData.tracks.items[0].track.album.name;
        }
        console.log(musicData.tracks.items[0].track.album);
        let miliSeconds = musicData.tracks.items[0].track.duration_ms;
        let minutes = Math.floor(miliSeconds / 60000);
        let seconds = ((miliSeconds % 60000) / 1000).toFixed(0);
        let lengthInfo = minutes + ":" + (seconds < 10 ? 0 : '') + seconds;


        var currentCard = {
            title: musicData.tracks.items[0].track.name,
            artist: musicData.tracks.items[0].track.artists[0].name,
            album: albumInfo,
            length: lengthInfo,
            release: musicData.tracks.items[0].track.album.release_date
        }

        console.log(document.getElementById("cur-song-title"));
        document.getElementById("cur-song-title").textContent = "Song Title: " + currentCard.title;
        document.getElementById("cur-song-artist").textContent = "Arist: " + currentCard.artist;
        document.getElementById("cur-song-album").textContent = "Album: " + currentCard.album;
        document.getElementById("cur-song-length").textContent = "Length: " + currentCard.length;
        document.getElementById("cur-song-date").textContent = "Release Date: " + currentCard.length;

        localStorage.setItem("currentCard", JSON.stringify(currentCard));

});