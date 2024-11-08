function RemoveFromCart(product_id) {
    const s = localStorage.getItem('cartSize') || 0;
    localStorage.setItem('cartSize', Math.max(0, Number(s) - 1));

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