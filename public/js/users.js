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
