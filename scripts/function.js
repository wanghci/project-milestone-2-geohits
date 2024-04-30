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

    const clientId = "d548203f7ceb4dd6a56164a2e97c3f17";
    const redirectUri = "http://127.0.0.1:5500/project-milestone-2-geohits/index.html?";
    [verifier, challenge] = await generateCodeChallenge();
    localStorage.setItem("demo_code_verifier", verifier); // Don't forget to store the code verifier!
    requestAuthCode(clientId, redirectUri, challenge, "user-library-modify"); // Special scope for saving songs
});

async function checkForCode() {
    const clientId = "d548203f7ceb4dd6a56164a2e97c3f17";
    const redirectUri = "http://127.0.0.1:5500/project-milestone-2-geohits/index.html?";
    const codeVerifier = localStorage.getItem("demo_code_verifier");
    const urlParams = new URLSearchParams(window.location.search);
    const authCode = urlParams.get("code");
    if (authCode) {
        console.log(authCode)
        const data = await getToken(clientId, redirectUri, authCode, codeVerifier);
        console.log(data);

        // Clear the code verifier from local storage
        localStorage.removeItem("demo_code_verifier");

        console.log(data.access_token)

        const playlist = await fetch("https://api.spotify.com/v1/browse/categories/toplists/playlists/${country}", {
            headers: {
                'Authorization': 'Bearer ' + data.access_token,
            },
        });

        const data1 = await response.json();
        console.log(data1)

    }
}

checkForCode();