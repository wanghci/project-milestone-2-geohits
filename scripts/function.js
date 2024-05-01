let country_code = "";
let country = "";
console.log(authCode)
console.log(accessToken)
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

    const search = await fetch(`https://api.spotify.com/v1/search?q=top+${country}&type=playlist&limit=1&offset=0`, {
            headers: {
                'Authorization': 'Bearer ' + accessToken,
            },
        });

        let searchData = await search.json();

        console.log(searchData)
        console.log(searchData.playlists.items[0].images[0].url)
        console.log(searchData.playlists.items[0].href)
        const playlistID = searchData.playlists.items[0].href
        document.getElementById("song-pic").src = searchData.playlists.items[0].images[0].url

        const playlist = await fetch(playlistID, {
            headers: {
                'Authorization': 'Bearer ' + accessToken,
            },
        });

        let musicData = await playlist.json();

        console.log(musicData)
        console.log(musicData.tracks.items[0].track.album.images[0].url)
        document.getElementById("song-pic").src = musicData.tracks.items[0].track.album.images[0].url
});