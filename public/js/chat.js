const formSubmitChat = document.querySelector(".chat .inner-foot .inner-form");
if (formSubmitChat) {
    formSubmitChat.addEventListener("submit", e => {
        e.preventDefault();
        const inputContentChat = document.querySelector(".chat .inner-foot input[name='content']");
        const content = inputContentChat.value;
        socket.emit("CLIENT_SEND MESSAGE", content);
        inputContentChat.value = "";
    })
}

// SEVER_RETURN_DATA
socket.on("SEVER_RETURN_DATA", (data) => {
    const myId = document.querySelector("[myId]").getAttribute("myId");
    const body = document.querySelector(".inner-body");
    let htmlName = ""
    const div = document.createElement("div");
    if (myId == data.user_id) {
        div.classList.add("inner-outgoing");
    } else {
        htmlName = data.fullName
        div.classList.add("inner-incoming");
    }

    div.innerHTML = `
        <div class="inner-name" >${htmlName}</div>
        <div class="inner-content">${data.content}</div>
    `;
    body.appendChild(div);
    body.scrollTop = body.scrollHeight;
})
// END SEVER_RETURN_DATA

// default message bottom
const bodyChat = document.querySelector(".inner-body");
if (bodyChat) {
    bodyChat.scrollTop = bodyChat.scrollHeight;
}
// end default message bottom

