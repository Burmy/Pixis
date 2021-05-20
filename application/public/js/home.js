// Flash Messages
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
    setFlashMsgFadeOut(flashMessageDiv);
}


// Creating cards of posts
function createCard(postData) {
    return `<div id="post-${postData.id}" class="home-posts">
    <a href="/post/${postData.id}"> <img class="home-images" src="${postData.thumbnail}" alt="Missing Image"> </a>
    <p class="home-tags">${postData.title}</p>
    <div class="home-info">
        <p class="home-desc">${postData.description}</p>
    </div>
</div>`;

}


//Search Bar
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


//Search on pressing Enter
function pressEnterSearch(e) {
    if (e.keyCode === 13) {
        e.preventDefault();
        executeSearch();
    }
}


//Hover div on top of Home Posts
let imgContent = document.getElementsByClassName('home-info');
function showImgContent(e) {
    for (var i = 0; i < imgContent.length; i++) {
        x = e.pageX;
        y = e.pageY;
        imgContent[i].style.transform = `translate3d(${x}px, ${y}px, 0)`;
    }
};
document.addEventListener('mousemove', showImgContent);


//Image Preview for Post Image page
var loadFile = function (event) {
    var output = document.getElementById('imgPreview');
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function () {
        URL.revokeObjectURL(output.src) // free memory
    }
};