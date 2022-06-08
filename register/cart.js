if (document.readyState=='loading') {
    document.addEventListener('DOMContentLoader',ready)
} else {
    ready()
}

function ready(){
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    console.log(removeCartItemButtons)
    for(var i=0;i<removeCartItemButtons.length;i++){
    var button = removeCartItemButtons[i]
    button.addEventListener('click',removeCartItem)
    }   

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for(var i=0;i<quantityInputs.length;i++){
        var input = quantityInputs[i]
        input.addEventListener('change',quantityChanged)
    } 

    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for(var i=0;i<addToCartButtons.length;i++){
        var button = addToCartButtons[i]
        button.addEventListener('click',addToCardClicked)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click',purchaseClicked)
}

function removeCartItem(event){
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantityChanged(event){
    var input = event.target
    if(isNaN(input.value) || input.value <=0){
        input.value = 1
    }
    updateCartTotal()
}

function addToCardClicked(event){
    var button=event.target
    var shopItem=button.parentElement.parentElement
    var title=shopItem.getElementsByClassName('title')[0].innerText
    var price=shopItem.getElementsByClassName('price')[0].innerText
    var imgscr=shopItem.getElementsByClassName('shop-item-image')[0].src
    pass(title,price,imgscr)
    get()
}

function pass(title,price,imgscr){
    sessionStorage.setItem("title",title)
    sessionStorage.setItem("price",price)
    sessionStorage.setItem("imgscr",imgscr)

}

function get(){
    var title=sessionStorage.getItem("title")
    var price=sessionStorage.getItem("price")
    var imgscr=sessionStorage.getItem("imgscr")
    addItemToCart(title,price,imgscr)
    //sessionStorage.removeItem("title")
    //sessionStorage.removeItem("price")
    //sessionStorage.removeItem("imgscr")
    //sessionStorage.clear()
}

function addItemToCart(title,price,imgscr){
    var cartRow = document.createElement(`div`)
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemnames = cartItems.getElementsByClassName('title')
    for(var i=0;i<cartItemnames.length;i++){
        if(cartItemnames[i].innerText == title){
            alert('This item is already added to your shopping bag')
            return
        }
    }
    var cartRowContents = `
    <div class="cart-item cart-column">
        <img class="cart-item-image" src="${imgscr}" width="100" height="100">
        <span class="cart-item-title">${title}</span>
    </div>
    <span class="cart-price cart-column">${price}</span>
    <div class="cart-quantity cart-column">
        <input class="cart-quantity-input" type="number" value="1">
        <button class="btn btn-danger" type="button">REMOVE</button>
    </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click',removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change',quantityChanged)
    updateCartTotal()
}

function updateCartTotal(){
    var cartItemContaintainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContaintainer.getElementsByClassName('cart-row')
    var total = 0
    for(var i=0;i<cartRows.length;i++){
        var cartRow = cartRows[0]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement =cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price =parseFloat(priceElement.innerText.replace('₹',''))
        var quantity = quantityElement.value
        total = total+(price*quantity)
    }
    total = Math.round(total*100)/100
    document.getElementsByClassName('cart-total-price')[0].innerText = 'Rs.'+total
}

function purchaseClicked(){
    alert('Thank you for your purchase')
    var cartItems=document.getElementsByClassName('cart-items')[0]
    while(cartItems.hasChildNodes()){
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}