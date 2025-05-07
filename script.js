let cart = JSON.parse(localStorage.getItem('cart') || '[]');
let totalPrice = parseFloat(localStorage.getItem('totalPrice')) ||0;

const addToCartBtns = document.querySelectorAll('.addBtn');

const totalPriceElement = document.getElementById('total-price')
const cartItem = document.getElementById('curt-items')

addToCartBtns.forEach(btn => {
    btn.addEventListener('click',()=> {
        const productName = btn.getAttribute('data-name')
        const productPrice = parseFloat(btn.getAttribute('data-price'))

        const existingProdact = cart.find(item => item.name===productName)

        if(existingProdact){
            existingProdact.quantity +=1;
        }
        else{
            cart.push({
                name:productName,
                price:productPrice,
                quantity:1
            })
        }
        totalPrice +=productPrice;

        localStorage.setItem('cart',JSON.stringify(cart))
        localStorage.setItem('totalPrice',totalPrice.toFixed(2))
       
        updateCartDisplay()
    })
})


function updateCartDisplay(){
    cartItem.innerHTML = ''
    cart.forEach((item,index)=>{
        const li = document.createElement('li')
        li.innerHTML=`
        ${item.name} - ${index.price} x ${item.quantity}
        <button class='remove'>remove</button>
        `
        cartItem.appendChild(li)
    })
    totalPriceElement.textContent= totalPrice.toFixed(2)

    const removeBtns = document.querySelectorAll('.remove')
    removeBtns.
}


