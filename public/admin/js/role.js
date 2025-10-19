// permissions
const tablePermissions = document.querySelector("[table-permissions]");
if (tablePermissions) {
    let permisions = [];
    const buttonSubmit = document.querySelector("[button-submit]");
    buttonSubmit.addEventListener("click", () => {
        const rows = document.querySelectorAll("[data-name]");
        rows.forEach((row) => {
            const name = row.getAttribute("data-name");
            const inputs = row.querySelectorAll("input");
            if (name == "id") {
                inputs.forEach((input) => {
                    permisions.push({
                        id: input.value,
                        permisions: []
                    })
                })
            } else {
                inputs.forEach((input, index) => {
                    if (input.checked) {
                        permisions[index].permisions.push(name);
                    }
                })
            }
        })
        const formChangePermissions = document.querySelector("#form-change-permissions");
        const inputPermissions = formChangePermissions.querySelector("[input-permissions]");
        inputPermissions.value = JSON.stringify(permisions);
        formChangePermissions.submit();
    })
    
}
// end permissions


// permissions input checked default
const dataRecords = document.querySelector(`div[data-permissions]`);
const dataPermissions = JSON.parse(dataRecords.getAttribute("data-permissions"));
if (dataPermissions.length) {
    dataPermissions.forEach((permissions, index) => {
        const namePermissions = permissions.permissions;
        namePermissions.forEach(namePermission => {
            const row = document.querySelector(`[data-name=${namePermission}]`);
            const inputPermission = row.querySelectorAll("input")[index];
            inputPermission.checked = true
        })
    })
}
// end permissions input checked default