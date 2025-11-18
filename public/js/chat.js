import * as Popper from 'https://cdn.jsdelivr.net/npm/@popperjs/core@^2/dist/esm/index.js'
import { FileUploadWithPreview } from 'https://unpkg.com/file-upload-with-preview/dist/index.js';


const upload = new FileUploadWithPreview('upload-images', {
    multiple: true,
    showDeleteButtonOnImages: true,
    maxFileCount: 6, 
});

const formSubmitChat = document.querySelector(".chat .inner-foot .inner-form");
if (formSubmitChat) {
    formSubmitChat.addEventListener("submit", e => {
        e.preventDefault();
        const inputContentChat = document.querySelector(".chat .inner-foot input[name='content']");
        const content = inputContentChat.value;
        const images = upload.cachedFileArray;
        if (images || content) {
            socket.emit("CLIENT_SEND MESSAGE", {
                content: content,
                images: images
            });
            inputContentChat.value = "";
            upload.resetPreviewPanel();
            socket.emit("CLIENT_SEND_TYPING", "hidden");
        }
    })
}

// SEVER_RETURN_DATA
socket.on("SEVER_RETURN_DATA", (data) => {
    const myId = document.querySelector("[myId]").getAttribute("myId");
    const body = document.querySelector(".inner-body");
    let htmlName = "";
    let htmlContent = "";
    let htmlImages = "";

    const div = document.createElement("div");
    if (myId == data.user_id) {
        div.classList.add("inner-outgoing");
    } else {
        htmlName = data.fullName
        div.classList.add("inner-incoming");
    }
    
    if (data.content) {
        htmlContent = `
            <div class="inner-content">${data.content}</div>
        `;
    }

    if (data.images.length) {
        htmlImages += '<div class="inner-images">';
        
        for (const link of data.images) {
            htmlImages += `
                <img src="${link}">
            `;
        }

        htmlImages += '</div>';

    }

    div.innerHTML = `
        <div class="inner-name" >${htmlName}</div>
        ${htmlContent}
        ${htmlImages}

        
    `;
    const innerListTyping = document.querySelector(".inner-list-typing");
    body.insertBefore(div, innerListTyping);
    body.scrollTop = body.scrollHeight;
    const gallery = new Viewer(div);
})
// END SEVER_RETURN_DATA

// default message bottom
const bodyChat = document.querySelector(".inner-body");
if (bodyChat) {
    bodyChat.scrollTop = bodyChat.scrollHeight;
}
// end default message bottom


// Function status typing
var timeOut;
const statusTyping = () => {
    socket.emit("CLIENT_SEND_TYPING", "show");

    clearTimeout(timeOut);

    setTimeout(() => {
        socket.emit("CLIENT_SEND_TYPING", "hidden");
    }, 3000); 
}
// End function status typing


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
    inputContentChat.value = inputContentChat.value + icon;
    statusTyping();
});
// END ICON EMTION PICKER CHAT

// TYPING
const inputTyping = document.querySelector(`.inner-foot input[name="content"]`);
if (inputTyping) {
    inputTyping.addEventListener("keyup", (e) => {
        statusTyping();
    });
    socket.on("SERVE_RETURN_TYPING", (data) => {
        if (data.type == "show") {
            const boxTyping = bodyChat.querySelector(".box-typing");
            if (!boxTyping) {
                const div = document.createElement("div");
                div.classList.add("box-typing");
                const innerListTyping = document.querySelector(".inner-list-typing");
                div.innerHTML = `
                    <div class="inner-name">${data.fullName}</div>
                    <div class="inner-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                `;
                const bodyChat = document.querySelector(".inner-body");
                innerListTyping.appendChild(div);
                bodyChat.scrollTop = bodyChat.scrollHeight;
            }
            
        } else {
            const bodyChat = document.querySelector(".inner-body");
            const innerListTyping = bodyChat.querySelector(`.inner-list-typing`);
            const boxTyping = bodyChat.querySelector(".box-typing");
            if (boxTyping){
                innerListTyping.removeChild(boxTyping);
            }
            
        }

    })
}
// END TYPING

// SHOW IMAGES FULL SCREEN
const bodyChatPreviewImages = document.querySelector(".chat .inner-images");
if (bodyChatPreviewImages) {
    const gallery = new Viewer(bodyChatPreviewImages);

}
// END SHOW IMAGES FULL SCREEN
