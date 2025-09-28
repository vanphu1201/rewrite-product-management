module.exports = (query, find) => {
    const filterStatus = [
        {
        name: "Tất cả",
        status: "",
        class: ""
        },
        {
        name: "Hoạt động",
        status: "active",
        class: ""
        },
        {
        name: "Dừng hoạt động",
        status: "inactive",
        class: ""
        },
    ];

    const status = query.status;
    if (status) {
        find.status = status;
    }

    return filterStatus
}