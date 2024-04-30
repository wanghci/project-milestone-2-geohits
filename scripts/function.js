let country_code = "";
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

    const playlist = await fetch(`https://api.spotify.com/v1/me`, {
            headers: {
                'Authorization': 'Bearer ' + accessToken,
            },
        });

        console.log(playlist)
});