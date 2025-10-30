module.exports.newPriceProducts = (products) => {
    products.map((product => {
        product.newPrice = (product.price * (100 - product.discountPercentage) / 100).toFixed(0);
        return product;
    }));
    return products
};