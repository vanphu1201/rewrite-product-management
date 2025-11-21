// Gửi lòi mời kết bạn
const listBtnAddFriend = document.querySelectorAll("[btn-add-friend]");
if (listBtnAddFriend.length) {
    listBtnAddFriend.forEach(button => {
        button.addEventListener("click", e => {
            button.closest(".box-user").classList.add("add");
            const userId = button.getAttribute("btn-add-friend");
            socket.emit("CLIENT_ADD_FRIEND", userId);
        })
    })
}
// Hết Gửi lòi mời kết bạn


// Hủy lời mời kết bạn
const listBtnCancelFriend = document.querySelectorAll("[btn-cancel-friend]");
if (listBtnCancelFriend.length) {
    listBtnCancelFriend.forEach(button => {
        button.addEventListener("click", e => {
            button.closest(".box-user").classList.remove("add");
            const userId = button.getAttribute("btn-cancel-friend");
            socket.emit("CLIENT_CANCEL_FRIEND", userId);
        })
    })
}
// Hết Hủy lời mời kết bạn

// từ chối lời mời kết bạn
const listBtnRefuseFriend = document.querySelectorAll("[btn-refuse-friend]");
if (listBtnRefuseFriend.length) {
    listBtnRefuseFriend.forEach(button => {
        button.addEventListener("click", e => {
            button.closest(".box-user").classList.add("refuse");
            const userId = button.getAttribute("btn-refuse-friend");
            socket.emit("CLIENT_REFUSE_FRIEND", userId);
        })
    })
}
// Hết từ chối lời mời kết bạn