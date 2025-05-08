let cart = JSON.parse(localStorage.getItem('cart') || '[]');
let totalPrice = parseFloat(localStorage.getItem('totalPrice')) || 0;

window.addEventListener('load', () => {
    updateCartDisplay();
});

const addToCartBtns = document.querySelectorAll('.addBtn');
const totalPriceElement = document.getElementById('total-price');
const cartItem = document.getElementById('curt-items');
const buyNowBtn = document.getElementById('buyNow');

addToCartBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const productName = btn.getAttribute('data-name');
        const productPrice = parseFloat(btn.getAttribute('data-price'));

        const existingProduct = cart.find(item => item.name === productName);

        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({
                name: productName,
                price: productPrice,
                quantity: 1
            });
        }

        totalPrice += productPrice;

        localStorage.setItem('cart', JSON.stringify(cart));
        localStorage.setItem('totalPrice', totalPrice.toFixed(2));

        updateCartDisplay();
    });
});

function updateCartDisplay() {
    cartItem.innerHTML = '';

    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${item.name} - ${item.price} x ${item.quantity}
            <button class='remove' data-index='${index}'>Remove</button>
        `;
        cartItem.appendChild(li);
    });

    totalPriceElement.textContent = totalPrice.toFixed(2);

    const removeBtns = document.querySelectorAll('.remove');
    removeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const index = parseInt(btn.getAttribute('data-index'));
            removeCartItem(index);
        });
    });
}

function removeCartItem(index) {
    const item = cart[index];
    totalPrice -= item.quantity * item.price;
    cart.splice(index, 1);

    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('totalPrice', totalPrice.toFixed(2));

    updateCartDisplay();
}

buyNowBtn.addEventListener('click', () => {
    if (cart.length > 0) {
        alert('Thanks for your purchase!');
        cart = [];
        totalPrice = 0;
        localStorage.removeItem('cart');
        localStorage.removeItem('totalPrice');
        updateCartDisplay();
    } else {
        alert('Your cart is empty');
    }
});
