// form change status

// input check
const inputCheckAll = document.querySelector('input[name="checkall"]');
if (inputCheckAll) {
    const inputIds = document.querySelectorAll('input[name="id"]');
    inputCheckAll.addEventListener("click", () => {
        if (inputCheckAll.checked) {
            inputIds.forEach(inputId => {
                inputId.checked = true;
            });
        } else {
            inputIds.forEach(inputId => {
                inputId.checked = false;
            });
        }
    });
}

const inputIds = document.querySelectorAll('input[name="id"]');
if (inputIds.length) {
    
    inputIds.forEach(inputId => {
        inputId.addEventListener("click", () => {
            const inputIdsChecked = document.querySelectorAll('input[name="id"]:checked');
            if (inputIdsChecked.length == inputIds.length) {
                inputCheckAll.checked =true;
            } else {
                inputCheckAll.checked = false;
            }
        })
    })
}
// end input check


// select multi status
const formChangeMulti = document.querySelector("[form-change-multi]");
if (formChangeMulti) {
    const ids = []
    formChangeMulti.addEventListener("submit", (e) => {
        e.preventDefault();
        const inputIdsChecked = document.querySelectorAll('input[name="id"]:checked');
        const typeChange = e.target.elements.type.value;

        if (inputIdsChecked.length) {
            if (typeChange == "delete") {
                const conform = alert("Bạn có chắc chắn muốn xóa sản phẩm!");
                if (!conform) {
                    return;
                }
            }
            
            inputIdsChecked.forEach(inputIdChecked => {
                const id = inputIdChecked.value;
                if (typeChange == "change-position") {
                    const position = inputIdChecked.closest("tr").querySelector("input[name='position']").value;
                    ids.push(`${id}-${position}`);
                } else {
                    ids.push(id);
                }
            });
            const inputIds = formChangeMulti.querySelector('input[name="ids"]');
            inputIds.value = ids.join(", ");
            formChangeMulti.submit();
        } else {
            alert("Vui lòng chọn ít nhất 1 sản phẩm")
        }
        

    })
}
// end select multi status

// end form change status



// change status single
const currentStatusItems = document.querySelectorAll("[data-status]");
const formChangeStatus = document.querySelector("[form-change-status]");

if (currentStatusItems.length) {
    currentStatusItems.forEach(currentStatusItem => {
        currentStatusItem.addEventListener("click", () => {
            const currentStatus = currentStatusItem.getAttribute("data-status");
            const id = currentStatusItem.getAttribute("data-id");
            const changeStatus = currentStatus == "active" ? "inactive" : "active";
            const action = `${formChangeStatus.getAttribute("path")}/${id}/${changeStatus}?_method=PATCH`;
            formChangeStatus.action = action;
            formChangeStatus.submit();
        })
    })
}
// end change status single



// delete product
const deleteProducts = document.querySelectorAll("[delete]");
const formDeleteProduct = document.querySelector("[form-delete-product]");

if (deleteProducts.length)  {
    let url = new URL(window.location.href);
    deleteProducts.forEach(deteleProduct => {
        deteleProduct.addEventListener("click", () => {
            const id = deteleProduct.getAttribute("data-id");
            const path = formDeleteProduct.getAttribute("path");
            formDeleteProduct.action = `${path}/${id}?_method=DELETE`;
            formDeleteProduct.submit();
        });
    });
}
// end delete product