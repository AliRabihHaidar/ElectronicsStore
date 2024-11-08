// add to cart button
function addToCart(product_id) {
    // send post request to add product to the cart
    fetch('/cart/add-to-cart', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({product_id: product_id})
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => console.error(error));
}


// filter products by search query
const searchInput = document.getElementById('search-input');
const products = document.querySelectorAll('.product-item');

searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    products.forEach(product => {
        const productName = product.querySelector('h3').textContent.toLowerCase();
        if (productName.includes(searchTerm)) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
});


// increment cart size by 1 when product is added to cart, which is saved in local storage
document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const cartSize = localStorage.getItem('cartSize') || 0;
        localStorage.setItem('cartSize', + cartSize + 1);
        document.getElementById('cart-size').innerHTML = Number(cartSize) + 1;
    });
});


// filtering prices
document.getElementById('price-range').addEventListener('input', function() {
    const maxPrice = parseFloat(this.value);
    products.forEach(product => {
        const price = parseFloat(product.querySelector('.price').textContent.replace('$', ''));
        if (price <= maxPrice) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
});

function updatePriceLabel(value) {
    document.getElementById('price-label').textContent = `$${value}`;
}


// going back up
var upArrow =document.getElementById('up-arrow')
window.onscroll = () => {
    if(scrollY >= 500){
        upArrow.style.display = "block";
    }else{
        upArrow.style.display = "none";
    }
}
upArrow.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
