import * as Popper from 'https://cdn.jsdelivr.net/npm/@popperjs/core@^2/dist/esm/index.js'

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

// ICON EMTION PICKER CHAT
const buttonIcon = document.querySelector('span[button-icon]');
const tooltip = document.querySelector('.tooltip');
Popper.createPopper(buttonIcon, tooltip);
buttonIcon.onclick = () => {
    tooltip.classList.toggle('shown');
}



const emojiPicker = document.querySelector('emoji-picker');
emojiPicker.addEventListener('emoji-click', e => {
    const icon = e.detail.unicode;
    const inputContentChat = document.querySelector(".chat .inner-foot input[name='content']");
    inputContentChat.value = inputContentChat.value + icon
});
// END ICON EMTION PICKER CHAT
