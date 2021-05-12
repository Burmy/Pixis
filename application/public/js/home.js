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

function setFlashMsgFadeOut(flashMessageElement) {
    setTimeout(() => {
        let currentOpacity = 1.0;
        let timer = setInterval(() => {
            if (currentOpacity < 0.5) {
                clearInterval(timer);
                flashMessageElement.remove();
            }
            currentOpacity = currentOpacity - 0.5;
            flashMessageElement.style.opacity = currentOpacity;
        }, 50)
    }, 4000)
}

let flashElement = document.getElementById('flash-msg');
if (flashElement) {
    setFlashMsgFadeOut(flashElement);
}

function addFlashFromFrontEnd(message) {
    let flashMessageDiv = document.createElement('div');
    let innerFlashDiv = document.createElement('div');
    let innerTextNode = document.createTextNode(message);
    innerFlashDiv.appendChild(innerTextNode);
    flashMessageDiv.appendChild(innerFlashDiv);
    flashMessageDiv.setAttribute('id', 'flash-msg');
    innerFlashDiv.setAttribute('class', 'success-msg');
    document.getElementsByTagName('body')[0].appendChild(flashMessageDiv);
    console.log(flashMessageDiv)
    setFlashMsgFadeOut(flashMessageDiv);
}

function createCard(postData) {
    return `<div id="post-${postData.id}" class="home_posts">
    <img class="home_images" src="${postData.thumbnail}" alt="Missing Image">
    <div class=" home_posts">
        <p class=".home_titles">${postData.title}</p>
        <p class=".home_titles">${postData.description}</p>
        <a href="/post/${postData.id}" class="">Post Details</a>
    </div>
</div>`;
}

function executeSearch() {
    let searchTerm = document.getElementById('searchText').value;
    if (!searchTerm) {
        location.replace('/');
        return;
    }
    let mainContent = document.getElementById('main-page-content')
    let SearchURL = `/posts/search?search=${searchTerm}`;
    fetch(SearchURL)
        .then((data) => {
            return data.json();
        })
        .then((data_json) => {
            let newMainContentHTML = '';
            data_json.results.forEach((row) => {
                newMainContentHTML += createCard(row);
            })
            mainContent.innerHTML = newMainContentHTML;
            if (data_json.message) {
                addFlashFromFrontEnd(data_json.message)
            }
        })
        .catch((err) => console.log(err));
}

let searchButton = document.getElementById('searchButton');
if (searchButton) {
    searchButton.onclick = executeSearch;
}