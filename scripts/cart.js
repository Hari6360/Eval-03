// Display cart items
function displayCart() {
	const cart = JSON.parse(localStorage.getItem("cart")) || [];
	const cartList = document.getElementById("cart-list");
	cartList.innerHTML = "";

	cart.forEach((product, index) => {
		const cartItem = document.createElement("div");
		cartItem.className = "cart-item";
		cartItem.innerHTML = `
		<img src=${product.img}>
		<p>Category: ${product.category}</p>
		<p>Brand: ${product.brand}</p>
		<p>Details: ${product.details}</p>
		<p>Price: $${product.price}</p>
	
            <button onclick="removeFromCart(${index})">Remove</button>
        `;
		cartList.appendChild(cartItem);
	});

	updateCartSummary();
}

// Remove item from cart
function removeFromCart(index) {
	const cart = JSON.parse(localStorage.getItem("cart")) || [];
	cart.splice(index, 1);
	localStorage.setItem("cart", JSON.stringify(cart));
	displayCart();
	// updateCartCount();
}

// Update cart summary
function updateCartSummary() {
	const cart = JSON.parse(localStorage.getItem("cart")) || [];
	const totalItems = cart.length;
	const totalValue = cart.reduce((total, item) => total + item.price, 0);

	document.getElementById("total-items").textContent = totalItems;
	setTimeout(() => {
		document.getElementById("total-value").textContent = totalValue.toFixed(2);
	}, 2000);
}

// Update cart count in header
// function updateCartCount() {
// 	const cart = JSON.parse(localStorage.getItem("cart")) || [];
// 	document.getElementById("cart-count").textContent = cart.length;
// }

document.addEventListener("DOMContentLoaded", () => {
	displayCart();
});
