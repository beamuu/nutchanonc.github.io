console.log("Hello");

const app       = document.getElementById('app');
const form      = document.getElementById('post-form');
const cache     = [];
const myMessage = [];

let darkmode = false;

const font_black = "rgb(31,31,31)"

function GET() {
    fetch("https://backend.cpsk-club.xyz/twitter" , {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    })
    .then(response => response.json())
    .then(response => response.forEach(element => {
        if (!cache.includes(element.content)) {
            if (!myMessage.includes(element.author)) {
                app.innerHTML += createTag(element.author , element.content);
            }
            else {
                app.innerHTML += createMyTag(element.author , element.content);
            }
            cache.push(element.content);
        }
    })) 
}

function POST(author,content) {
    fetch("https://backend.cpsk-club.xyz/twitter" , {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            author: author,
            content: content,
        }),
    })
    .then(response => console.log(response))
}


form.addEventListener("submit" , event => {

    event.preventDefault();
    author  = form.elements["author"].value;
    content = form.elements["content"].value;

    POST(author,content);

    myMessage.push(author);

    form.elements["author"].value = "";
    form.elements["content"].value = "";
 
});


function createTag(author , content) {
    newElement = `<div class="author">${author}</div>
    <div class="chat-layout">${content}</div><br><br>`;
    return newElement;
}
function createMyTag(author , content) {
    newElement = `<div class="me">${author}</div>
    <div class="my">${content}</div><br><br>`;
    return newElement;
}

function scrollDown() {
    app.scrollTop = app.scrollHeight;
}





function toggleDarkMode() {

    
    author = document.getElementsByClassName('author');
    for (var i=0 ; i<author.length ; i++) {
        author[i].style.color = 'white';
    }

    chatlayout = document.getElementsByClassName('chat-layout');
    for (var i=0 ; i<chatlayout.length ; i++) {
        chatlayout[i].style.boxShadow = '0 4px 10px rgb(20, 20, 20)';
    }

    me = document.getElementsByClassName('me');
    for (var i=0 ; i<me.length ; i++) {
        me[i].style.color = 'white';
    }

    my = document.getElementsByClassName('my');
    for (var i=0 ; i<my.length ; i++) {
        my[i].style.boxShadow = '0 4px 10px black';
    }

    document.getElementById("title").style.color = 'white';
    document.getElementsByTagName("BODY")[0].style.backgroundColor = 'rgb(24,24,24)';
    document.getElementById('app').style.backgroundColor           = 'rgb(30,30,30)';
    document.getElementById('app').style.boxShadow                 = '0 0 0 black';
    document.getElementById('footer').style.backgroundColor        = 'black';
    document.getElementById('label-author').style.color            = 'white';
    document.getElementById('label-content').style.color           = 'white';
    document.getElementById('toggle').innerHTML = 'l';
    document.getElementById('toggle').style.backgroundColor        = 'rgb(52, 235, 146)';
    document.getElementById('little-icon').src = 'pics/moon-icon-23634.png';
    document.getElementById('description').style.color = 'white';
    document.getElementById('main-logo').style.filter = 'invert(1)';
   
}





function toggleLightMode() {
    author = document.getElementsByClassName('author');
    for (var i=0 ; i<author.length ; i++) {
        author[i].style.color = font_black;
    }

    chatlayout = document.getElementsByClassName('chat-layout');
    for (var i=0 ; i<chatlayout.length ; i++) {
        chatlayout[i].style.boxShadow = ' 0 8px 10px rgb(175, 175, 175)';
    }

    me = document.getElementsByClassName('me');
    for (var i=0 ; i<me.length ; i++) {
        me[i].style.color = font_black;
    }

    my = document.getElementsByClassName('my');
    for (var i=0 ; i<my.length ; i++) {
        my[i].style.boxShadow = '0 8px 10px rgb(175, 175, 175)';
    }

    document.getElementById("title").style.color = 'black';
    document.getElementsByTagName("BODY")[0].style.backgroundColor = 'white';
    document.getElementById('app').style.backgroundColor           = 'rgb(255, 255, 255';
    document.getElementById('app').style.boxShadow                 = 'rgb(180, 180, 180)';
    document.getElementById('footer').style.backgroundColor        = 'rgb(34, 34, 34)';
    document.getElementById('label-author').style.color            = font_black;
    document.getElementById('label-content').style.color           = font_black;
    document.getElementById('toggle').innerHTML = 'O';
    document.getElementById('toggle').style.backgroundColor        = 'white';
    document.getElementById('little-icon').src = 'pics/sun.png';
    document.getElementById('description').style.color = 'black';
    document.getElementById('main-logo').style.filter = 'invert(0)';
}


function toggleDisplayMode() {
    if (darkmode) {
        toggleLightMode();
        darkmode = false;
        console.log(darkmode)
    }
    else {
        toggleDarkMode();
        darkmode = true;
        console.log(darkmode)
    }
}

setInterval(() => {
    GET()
} , 5000);

