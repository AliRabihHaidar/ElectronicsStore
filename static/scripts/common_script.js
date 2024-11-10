// set cart size from local storage
window.onload = () => {
    fetch('/cart/get-cart-size')
        .then(response => response.json())
        .then(data => {
            const cartSize = data.cartSize;
            document.getElementById('cart-size').textContent = cartSize;
        })
        .catch(error => {
            console.error('Error fetching cart size:', error)
            document.getElementById('cart-size').textContent = 0;
        });
}