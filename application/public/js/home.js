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


let mainNav = document.getElementById('js-menu');
let navBarToggle = document.getElementById('js-navbar-toggle');

navBarToggle.addEventListener('click', function () {
    mainNav.classList.toggle('active');
});

function setFlashMsgFadeOut() {
    setTimeout(() => {
        let currentOpacity = 1.0;
        let timer = setInterval(() => {
            if (currentOpacity < 0.5) {
                clearInterval(timer);
                flashElement.remove();
            }
            currentOpacity = currentOpacity - 0.5;
            flashElement.style.opacity = currentOpacity;
        }, 50)
    }, 4000)
}

let flashElement = document.getElementById('flash-msg');
if (flashElement) {
    setFlashMsgFadeOut();
}