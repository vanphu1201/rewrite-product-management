// filterStatus
const filterStatus = document.querySelectorAll("[status]");
if (filterStatus.length) {
    let url = new URL(window.location.href);
    filterStatus.forEach(btn => {
        btn.addEventListener("click", () => {
            const status = btn.getAttribute("status");
            if (status) {
                url.searchParams.set("status", status);
                window.location.href = url.href;
            } else {
                url.searchParams.delete("status");
                window.location.href = url.href;
            }
        })
    })
}

filterStatus.forEach( btn => {
    let url = new URL(window.location.href);
    if (url.searchParams.get("status")) {
        if (btn.getAttribute("status") == url.searchParams.get("status")) {
        btn.classList.add("active");
        }
    } else {
        filterStatus[0].classList.add("active");
    }
    
})
// end filterStatus


// form search
const formSearch = document.querySelector("#form-search");
if (formSearch) {
    let url = new URL(window.location.href);
    formSearch.addEventListener("submit", e => {
        e.preventDefault();
    });
    
    const inputFormSearch = document.querySelector("[input-form-search]");
    if (inputFormSearch) {
        inputFormSearch.addEventListener("click", () => {
            const btnFormSearch = document.querySelector("[btn-form-search]");
            const keyword = btnFormSearch.value;
            if (keyword) {
                url.searchParams.set("keyword", keyword);
                window.location.href = url.href;
            } else {
                url.searchParams.delete("keyword");
                window.location.href = url.href;
            }
            
        });
    }
}
// end form search



// pagination
const pages = document.querySelectorAll("[page]");
if (pages.length) {
    let url = new URL(window.location.href);
    pages.forEach((btnPage) => {
        btnPage.addEventListener("click", e => {
            const currentPage = btnPage.getAttribute("page");
            url.searchParams.set("page", currentPage);
            window.location.href = url.href;
        })
    });
}

const changePages = document.querySelectorAll("[change]");
if (changePages) {
    let url = new URL(window.location.href);
    changePages.forEach((changePage) => {
        changePage.addEventListener("click", () => {
            if (changePage.getAttribute("change") == "next") {
                const nextPage = parseInt(url.searchParams.get("page")) + 1;
                url.searchParams.set("page", nextPage);
                window.location.href = url.href;
            } else {
                const backPage = parseInt(url.searchParams.get("page")) -1;
                url.searchParams.set("page", backPage);
                window.location.href = url.href;
            }
            
        })
    })
}
// end pagination


// alert
const showAlert = document.querySelector("[show-alert]");
if (showAlert) {
    const time = parseInt(showAlert.getAttribute("data-time"));
    const closeAlert = document.querySelector("[close-alert]");
    setTimeout(()=> {
        showAlert.classList.add("alert-hidden");
    }, time);

    closeAlert.addEventListener("click", () => {
        showAlert.classList.add("alert-hidden");
    })
}

// end alert