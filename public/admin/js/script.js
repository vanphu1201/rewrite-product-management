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
        console.log(url.searchParams.get("status"))
        console.log(btn.getAttribute("status"))
        btn.classList.add("active");
        }
    } else {
        filterStatus[0].classList.add("active");
    }
    
})
// end filterStatus