// set cart size from local storage
const cartSize = localStorage.getItem('cartSize') || 0;
document.getElementById('cart-size').textContent = cartSize;
