let cart = JSON.parse(localStorage.getItem("cart")) || [];
let cartDiv = document.getElementById("cart-items");
let total = 0;

if (cart.length === 0) {
    cartDiv.innerHTML = "<p>Cart is empty</p>";
}

cart.forEach(item => {
    let div = document.createElement("div");
    div.innerText = item.name + " - ₹" + item.price;
    cartDiv.appendChild(div);
    total += item.price;
});

document.getElementById("total").innerText = total;

function goToPayment() {
    window.location.href = "payment.html";
}
