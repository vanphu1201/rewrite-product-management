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