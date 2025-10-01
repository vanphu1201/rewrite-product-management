module.exports = (query, countProducts) => {
    const paginationObject = {
        currentPage: 1,
        limit: 4
    }

    paginationObject.totalPage = Math.ceil(countProducts / paginationObject.limit);
    if (query.page) {
        paginationObject.currentPage = parseInt(query.page);
    }
    paginationObject.skip = (paginationObject.currentPage - 1) * paginationObject.limit;
    
    return paginationObject;
}