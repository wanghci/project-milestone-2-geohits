// const output1 = document.querySelector(".")
// const output2 = document.getElementById('output-2');
// const output3 = document.getElementById("flag");

document.getElementById("country-submit").addEventListener('click', async () => {
    let country = document.querySelector(".search").value;
    country.log(country)
    let response = await fetch("https://restcountries.com/v3.1/name/" + country);
    let data = await response.json();
    
    let img = document.querySelector(".info-pic")
    console.log(data);
    let source = "https://flagsapi.com/" + data[0].altSpellings[0] + "/flat/64.png";
    console.log(source);
    img.src = source;
    img.alt = data[0].altSpellings[0];
});