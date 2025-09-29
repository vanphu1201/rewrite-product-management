module.exports = (query, find) => {
    const keyword = query.keyword;
    if (keyword) {
        const re = new RegExp(keyword, "i");
        find.title = re;
    }
    return keyword;
}