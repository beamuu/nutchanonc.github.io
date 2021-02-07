console.log("Hello");

const app       = document.getElementById('app');
const form      = document.getElementById('post-form');
const cache     = [];
const myMessage = [];

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
    newElement = `<div style="height: fit-content;"><b>${author}</b></div>
    <div class="chat-layout">${content}</div><br><br>`;
    return newElement;
}
function createMyTag(author , content) {
    newElement = `<div style="height: fit-content;"><b>${author}</b></div>
    <div class="my">${content}</div><br><br>`;
    return newElement;
}

setInterval(() => {
    GET()
} , 5000);
