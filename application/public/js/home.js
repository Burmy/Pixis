let mainDiv = document.getElementById("home-container");

if (mainDiv) {
    let fetchURL = "https://jsonplaceholder.typicode.com/albums/2/photos"
    fetch(fetchURL)
        .then((response) => response.json())
        .then((photos) => {
            let output = "";
            photos.forEach(function (data) {
                output +=
                    `
                    <ul class="home_posts" id=${data.id} onclick="fadeOut(${data.id})">
                        <img class="home_images" src="${data.url}">
                        <li class="home_titles">${data.title}</li>
                    </ul>
                    `
            });
            count = photos.length
            document.getElementById("home-container").innerHTML = output;
            document.getElementById("home-count").innerHTML = `There are ${count} photo(s) being shown`;
        })

}

function fadeOut(id) {
    let opacity = 1;
    let timer = setInterval(function () {
        if (opacity <= 0.1) {
            clearInterval(timer);
            document.getElementById(id).remove();
            count--;
            document.getElementById("home-count").innerHTML = `There are ${count} photo(s) being shown`;
        }
        document.getElementById(id).style.opacity = opacity;
        opacity -= 0.1;
    }, 20);
}