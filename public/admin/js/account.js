// Change status accont
const btnsStatus = document.querySelectorAll("a[data-status-account");
if (btnsStatus.length) {
    const formChangeStatusAccount = document.querySelector("[form-change-status-account]");

    btnsStatus.forEach(btn => {
        btn.addEventListener("click", e => {
            const currentStatus = btn.getAttribute("data-status-account");
            const id = btn.getAttribute("data-id-account");
            const changeStatus = currentStatus == "active" ? "inactive" : "active";
            const action = `/admin/accounts/changeStatus/${id}/${changeStatus}`;

            formChangeStatusAccount.action = action;
            formChangeStatusAccount.submit();
        })
    })
}
// End change status account


// Delete account
const btnDeleteAccount = document.querySelectorAll("[data-id-delete]");
if (btnDeleteAccount.length) {
    const formDeleteAccount = document.querySelector("[form-delete-account]");

    btnDeleteAccount.forEach(btn => {
        btn.addEventListener("click", e => {
            const id = btn.getAttribute("data-id-delete");

            const action = `/admin/accounts/delete/${id}`;
            formDeleteAccount.action = action;
            formDeleteAccount.submit();
        })
    })
}
// End delete account