const apiUrl =
	"https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-tech-products";

let products = [];
let filteredProducts = [];
let currentPage = 1;
const productsPerPage = 6;

// Fetch products from API
async function fetchProducts() {
	try {
		const response = await fetch(apiUrl);
		const data = await response.json();
		products = data.data;
		filteredProducts = products;
		displayProducts();
		setupFilters();
	} catch (error) {
		console.error("Error fetching products:", error);
	}
}

// Display products
function displayProducts() {
	const productContainer = document.getElementById("product-list");
	productContainer.innerHTML = "";

	const paginatedProducts = filteredProducts.slice(
		(currentPage - 1) * productsPerPage,
		currentPage * productsPerPage
	);
	paginatedProducts.forEach((product) => {
		const productCard = document.createElement("div");
		productCard.className = "product-card";
		productCard.innerHTML = `
            <img src=${product.img}>
            <p>Category: ${product.category}</p>
            <p>Brand: ${product.brand}</p>
            <p>Details: ${product.details}</p>
            <p>Price: $${product.price}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
		productContainer.appendChild(productCard);
	});

	updatePagination();
}

// Update pagination
function updatePagination() {
	const pageInfo = document.getElementById("page-info");
	pageInfo.textContent = `Page ${currentPage} of ${Math.ceil(
		filteredProducts.length / productsPerPage
	)}`;
}

// Setup filters
function setupFilters() {
	const categoryFilter = document.getElementById("category-filter");
	const uniqueCategories = [
		...new Set(products.map((product) => product.category)),
	];
	uniqueCategories.forEach((category) => {
		const option = document.createElement("option");
		option.value = category;
		option.textContent = category;
		categoryFilter.appendChild(option);
	});

	categoryFilter.addEventListener("change", filterProducts);
	document
		.getElementById("sort-price")
		.addEventListener("change", sortProducts);
}

// Filter products
function filterProducts() {
	const category = document.getElementById("category-filter").value;
	filteredProducts = category
		? products.filter((product) => product.category === category)
		: products;
	currentPage = 1;
	displayProducts();
}

// Sort products
function sortProducts() {
	const sortOrder = document.getElementById("sort-price").value;
	filteredProducts.sort((a, b) =>
		sortOrder === "asc" ? a.price - b.price : b.price - a.price
	);
	displayProducts();
}

// Add to cart
function addToCart(productId) {
	const cart = JSON.parse(localStorage.getItem("cart")) || [];
	const product = products.find((p) => p.id === productId);
	cart.push(product);
	localStorage.setItem("cart", JSON.stringify(cart));
	// updateCartCount();
}

// Update cart count
// function updateCartCount() {
// 	const cart = JSON.parse(localStorage.getItem("cart")) || [];
// 	document.getElementById("cart-count").textContent =
// 		"cart.length = " + cart.length;
// }

// Pagination buttons
document.getElementById("prev-page").addEventListener("click", () => {
	if (currentPage > 1) {
		currentPage--;
		displayProducts();
	}
});

document.getElementById("next-page").addEventListener("click", () => {
	if (currentPage < Math.ceil(filteredProducts.length / productsPerPage)) {
		currentPage++;
		displayProducts();
	}
});

fetchProducts();
// updateCartCount();
