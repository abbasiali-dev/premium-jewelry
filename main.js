let cart = JSON.parse(localStorage.getItem("cart")) || [];
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

/* ================= SAVE ================= */

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function saveWishlist() {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
}

/* ================= CART ================= */

function addToCart(name, price) {
    cart.push({ name, price });
    saveCart();
    alert(name + " added to cart!");
    displayCart();
}

function removeItem(index) {
    cart.splice(index, 1);
    saveCart();
    displayCart();
}

function displayCart() {
    let container = document.getElementById("cart-items");
    let totalBox = document.getElementById("total-price");

    if (!container) return;

    container.innerHTML = "";

    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;

        container.innerHTML += `
            <div class="cart-item">
                <div>
                    <h3>${item.name}</h3>
                    <p>$${item.price}</p>
                </div>
                <button onclick="removeItem(${index})">Remove</button>
            </div>
        `;
    });

    if (totalBox) {
        totalBox.innerText = "Total: $" + total;
    }
}

/* ================= WISHLIST ================= */

function addToWishlist(name, price) {
    wishlist.push({ name, price });
    saveWishlist();
    alert(name + " added to wishlist!");
    displayWishlist();
}

function removeWishlist(index) {
    wishlist.splice(index, 1);
    saveWishlist();
    displayWishlist();
}

function displayWishlist() {
    let container = document.getElementById("wishlist-items");
    if (!container) return;

    container.innerHTML = "";

    if (wishlist.length === 0) {
        container.innerHTML = "<p>Wishlist is empty</p>";
        return;
    }

    wishlist.forEach((item, index) => {
        container.innerHTML += `
            <div class="cart-item">
                <div>
                    <h3>${item.name}</h3>
                    <p>$${item.price}</p>
                </div>
                <button onclick="removeWishlist(${index})">Remove</button>
            </div>
        `;
    });
}

/* ================= SEARCH ================= */

function searchProduct() {
    let input = document.getElementById("search");
    let products = document.querySelectorAll(".product-card");

    if (!input) return;

    let value = input.value.toLowerCase();

    products.forEach(p => {
        let name = p.querySelector("h3").innerText.toLowerCase();
        p.style.display = name.includes(value) ? "block" : "none";
    });
}

/* ================= FILTER ================= */

function filterPrice(value) {
    let products = document.querySelectorAll(".product-card");

    products.forEach(p => {
        let price = parseInt(p.querySelector("p").innerText.replace("$", ""));

        if (value === "all" || price <= value) {
            p.style.display = "block";
        } else {
            p.style.display = "none";
        }
    });
}