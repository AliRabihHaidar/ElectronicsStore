function RemoveFromCart(product_id) {
    fetch('/cart/remove-from-cart', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({product_id: product_id})
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        location.reload();
    })
    .catch(error => console.error(error));
};

// handle logout button click
document.getElementById('logout').addEventListener('click', () => {
    fetch('/auth/logout', {
        method: 'POST'
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        location.reload();
    })
    .catch(error => console.error(error));
});