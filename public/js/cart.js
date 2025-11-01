// Change product's quantity in cart
const inputQuantity = document.querySelectorAll('input[name="quantity"]');
if (inputQuantity) {
    inputQuantity.forEach(input => {
        input.addEventListener("change", e => {
            const productId = input.getAttribute("product-id");
            const quantity = input.value;
            window.location.href = `/cart/change-quantity/${productId}/${quantity}`;
        })
    })
}
// End change product's quantity in cart
