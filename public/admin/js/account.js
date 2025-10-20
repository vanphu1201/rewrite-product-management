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