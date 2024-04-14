resultArray = {}
let myText = "Ahora veamos las posturas... sientete libre <i class='bx bx-smile'></i>"
let myTextElement = document.getElementById("myText");
let headerTextElement = document.getElementById("headerText");
myTextElement.innerHTML = myText;
headerTextElement.innerHTML = myText;
desblock()

function desblock() {
    if (Object.keys(resultArray).length > 0) {
        document.getElementById("submitBtn").style.display = "block";
    } else {
        document.getElementById("submitBtn").style.display = "none";
    }
}

document.getElementById('submitBtn').addEventListener('click', function() {
    const hiddenInput = document.getElementById('resultArray');
    hiddenInput.value = JSON.stringify(resultArray);
});

function include(itemId) {
    if (!resultArray.hasOwnProperty(itemId)) {
        resultArray[itemId] = -1;
        let like = "like_" + itemId
        let dislike = "dislike_" + itemId
        let div = "div_" + itemId
        document.getElementById(like).style.display = "none";
        document.getElementById(dislike).style.display = "block";
        document.getElementById(div).style.marginLeft = "40%";
        changeText();
    }
    desblock()
}

function exclude(itemId) {
    if (resultArray.hasOwnProperty(itemId)) {
        delete resultArray[itemId];
        let like = "like_" + itemId
        let dislike = "dislike_" + itemId
        let div = "div_" + itemId
        document.getElementById(like).style.display = "block";
        document.getElementById(dislike).style.display = "none";
        document.getElementById(div).style.marginLeft = "40%";
        changeText();
    }
    desblock()
}

function changeText() {
    if (Object.keys(resultArray).length < 5) {
        myText = "Ahora veamos las posturas... sientete libre <i class='bx bx-smile'></i>";
    }
    else if (Object.keys(resultArray).length < 10) {
        myText = "Pero en serio crees que aguantaras tanto...? <i class='bx bx-dizzy'></i>";
    }
    else {
        myText = "Eres un poco viciosille eh... <i class='bx bxs-hot' ></i>";
    }
    myTextElement.innerHTML = myText;
    headerTextElement.innerHTML = myText;
}

const images = document.querySelectorAll('.image');
images.forEach(image => {
    let tooltip = image.dataset.name;
    if (image.hasAttribute("title")) {
      image.removeAttribute("title");
    }
    image.setAttribute("title", tooltip);
});

window.onscroll = function() {
    var threshold = 300;
    if (window.scrollY > threshold) {
        headerTextElement.style.display = "block";
    } else {
        headerTextElement.style.display = "none";
    }
};