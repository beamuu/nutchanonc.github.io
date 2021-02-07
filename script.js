console.log("Hello");

const app       = document.getElementById('app');
const form      = document.getElementById('post-form');
const cache     = [];
const myMessage = [];

let darkmode = false;

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
        chatlayout[i].style.boxShadow = '0 4px 10px black';
    }

    me = document.getElementsByClassName('me');
    for (var i=0 ; i<me.length ; i++) {
        me[i].style.color = 'white';
    }

    my = document.getElementsByClassName('my');
    for (var i=0 ; i<my.length ; i++) {
        my[i].style.boxShadow = '0 4px 10px black';
    }


    document.getElementsByTagName("BODY")[0].style.backgroundColor = 'rgb(24,24,24)';
    document.getElementById('app').style.backgroundColor           = 'rgb(30,30,30)';
    document.getElementById('app').style.boxShadow                 = '0 0 0 black';
    document.getElementById('footer').style.backgroundColor        = 'black';
    document.getElementById('label-author').style.color            = 'white';
    document.getElementById('label-content').style.color           = 'white';
    
}
function toggleLightMode() {

}


setInterval(() => {
    GET()
} , 5000);

