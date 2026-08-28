/* ==================================================
   HAYA NOOR EMPIRE
   MAIN JAVASCRIPT
================================================== */


/* ==================================================
   SHOPPING CART
================================================== */

let cart = JSON.parse(
    localStorage.getItem("hayaNoorCart")
) || [];


/* ==================================================
   SAVE CART
================================================== */

function saveCart() {

    localStorage.setItem(
        "hayaNoorCart",
        JSON.stringify(cart)
    );

}


/* ==================================================
   ADD TO CART
================================================== */

function addToCart(productName, productPrice) {

    const existingProduct = cart.find(
        item => item.name === productName
    );


    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({

            name: productName,

            price: productPrice,

            quantity: 1
           
        });

    }


    saveCart();

    displayCart();

    updateCartCount();

    alert(
        productName +
        " has been added to your cart! 🛍️"
    );

}


/* ==================================================
   UPDATE CART COUNT
================================================== */

function updateCartCount() {

    const cartCount =
        document.getElementById("cart-count");


    if (!cartCount) return;


    const totalItems = cart.reduce(
        (total, item) =>
            total + item.quantity,
        0
    );


    cartCount.textContent = totalItems;

}


/* ==================================================
PRODUCT IMAGE
================================================== */

function getProductImage(productName) {

const images = {

    /* EXISTING PRODUCTS */

    "Hijab":
        "images/hijab.jpg",

    "Khimar":
        "images/khimar.jpg",

    "Niqab":
        "images/niqab.jpg",

    "Abaya":
        "images/abaya.jpg",

    "Hijab Pins":
        "images/hijab-pins.jpg",

    "Gloves":
        "images/gloves.jpg",

    "Sleeves":
        "images/sleeves.jpg",

    "Inner Caps":
        "images/inner-cap.jpg",


    /* NEW PRODUCTS */

    "Abaya with Hijab & Niqab Set":
        "images/abaya-hijab-niqab.jpg",

    "Half Khimar with Niqab Set":
        "images/half-khimar-niqab.jpg",

    "Full Abaya + Half Khimar with Niqab Design Set":
        "images/full-abaya-half-khimar-niqab.jpg",

    "Jersey Scarf - Small Size":
        "images/jersey-scarf-small.jpg",

    "Jersey Scarf - Big Size":
        "images/jersey-scarf-big.jpg"

};


return images[productName] || "";

}


/* ==================================================
   DISPLAY CART
================================================== */

function displayCart() {

    const cartItems =
        document.getElementById("cart-items");

    const cartTotal =
        document.getElementById("cart-total");


    if (!cartItems || !cartTotal) return;


    cartItems.innerHTML = "";


    let total = 0;


    if (cart.length === 0) {

        cartItems.innerHTML =
            "<p>Your cart is empty.</p>";

        cartTotal.textContent = "0";

        return;

    }


    cart.forEach((item, index) => {

        const itemTotal =
            item.price * item.quantity;


        total += itemTotal;


        const cartItem =
            document.createElement("div");


        cartItem.className =
            "cart-item";


        cartItem.innerHTML = `

            <div class="cart-product">

                <img
                    src="${getProductImage(item.name)}"
                    alt="${item.name}"
                    class="cart-product-image"
                >

                <div class="cart-product-info">

                    <h3>
                        ${item.name}
                    </h3>

                    <p>
                        Price:
                        ₦${item.price.toLocaleString()}
                    </p>

                    <p>
                        Quantity:
                        ${item.quantity}
                    </p>

                    <p class="cart-subtotal">
                        Subtotal:
                        ₦${itemTotal.toLocaleString()}
                    </p>

                </div>

            </div>


            <div class="cart-controls">

                <button
                    onclick="decreaseQuantity(${index})">
                    −
                </button>

                <span>
                    ${item.quantity}
                </span>

                <button
                    onclick="increaseQuantity(${index})">
                    +
                </button>

                <button
                    class="remove-btn"
                    onclick="removeFromCart(${index})">

                    Remove

                </button>

            </div>

        `;


        cartItems.appendChild(cartItem);

    });


    cartTotal.textContent =
        total.toLocaleString();

}


/* ==================================================
   INCREASE QUANTITY
================================================== */

function increaseQuantity(index) {

    if (!cart[index]) return;


    cart[index].quantity++;


    saveCart();

    displayCart();

    updateCartCount();

}


/* ==================================================
   DECREASE QUANTITY
================================================== */

function decreaseQuantity(index) {

    if (!cart[index]) return;


    if (cart[index].quantity > 1) {

        cart[index].quantity--;

    } else {

        cart.splice(index, 1);

    }


    saveCart();

    displayCart();

    updateCartCount();

}


/* ==================================================
   REMOVE PRODUCT
================================================== */

function removeFromCart(index) {

    if (!cart[index]) return;


    cart.splice(index, 1);


    saveCart();

    displayCart();

    updateCartCount();

}


/* ==================================================
   CLEAR CART
================================================== */

function clearCart() {

    if (cart.length === 0) {

        alert(
            "Your cart is already empty."
        );

        return;

    }


    const confirmClear =
        confirm(
            "Are you sure you want to clear your cart?"
        );


    if (!confirmClear) return;


    cart = [];


    saveCart();

    displayCart();

    updateCartCount();


    alert(
        "Your cart has been cleared. 🛍️"
    );

}


/* ==================================================
   CHECKOUT
================================================== */

function checkout() {

    if (cart.length === 0) {

        alert(
            "Your cart is empty."
        );

        return;

    }


    const form =
        document.getElementById(
            "checkout-form"
        );


    if (!form) return;


    form.style.display = "block";


    displayCheckoutSummary();


    form.scrollIntoView({

        behavior: "smooth",

        block: "start"

    });

}


/* ==================================================
   CHECKOUT SUMMARY
================================================== */

function displayCheckoutSummary() {

    const itemsContainer =
        document.getElementById(
            "checkout-order-items"
        );


    const totalElement =
        document.getElementById(
            "checkout-total"
        );


    if (!itemsContainer || !totalElement) {
        return;
    }


    itemsContainer.innerHTML = "";


    let total = 0;


    cart.forEach(item => {

        const itemTotal =
            item.price * item.quantity;


        total += itemTotal;


        const itemElement =
            document.createElement("div");


        itemElement.className =
            "checkout-summary-item";


        itemElement.innerHTML = `

            <div>

                <strong>
                    ${item.name}
                </strong>

                <br>

                <small>
                    ₦${item.price.toLocaleString()}
                    × ${item.quantity}
                </small>

            </div>

            <strong>
                ₦${itemTotal.toLocaleString()}
            </strong>

        `;


        itemsContainer.appendChild(
            itemElement
        );

    });


    totalElement.textContent =
        total.toLocaleString();

}


/* ==================================================
   SEND ORDER TO WHATSAPP
================================================== */

function sendOrderToWhatsApp() {

    if (cart.length === 0) {

        alert(
            "Your cart is empty."
        );

        return;

    }


    const name =
        document.getElementById(
            "customer-name"
        ).value.trim();


    const phone =
        document.getElementById(
            "customer-phone"
        ).value.trim();


    const address =
        document.getElementById(
            "customer-address"
        ).value.trim();


    const city =
        document.getElementById(
            "customer-city"
        ).value.trim();


    const payment =
        document.getElementById(
            "payment-method"
        ).value;


    if (
        !name ||
        !phone ||
        !address ||
        !city
    ) {

        alert(
            "Please complete all your details."
        );

        return;

    }


    let message =
        "✨ *HAYA NOOR EMPIRE* ✨\n\n" +

        "🛍️ *NEW ORDER*\n\n" +

        "👤 *CUSTOMER DETAILS*\n" +

        "Name: " + name + "\n" +

        "Phone: " + phone + "\n" +

        "Address: " + address + "\n" +

        "City: " + city + "\n" +

        "Payment: " + payment + "\n\n" +

        "📦 *ORDER DETAILS*\n\n";


    let total = 0;


    cart.forEach((item, index) => {

        const itemTotal =
            item.price * item.quantity;


        total += itemTotal;


        message +=

            (index + 1) +
            ". *" +
            item.name +
            "*\n" +

            "Quantity: " +
            item.quantity +
            "\n" +

            "Price: ₦" +
            item.price.toLocaleString() +
            "\n" +

            "Subtotal: ₦" +
            itemTotal.toLocaleString() +
            "\n\n";

    });


    message +=

        "━━━━━━━━━━━━━━━━━━\n" +

        "💰 *TOTAL: ₦" +
        total.toLocaleString() +
        "*\n" +

        "━━━━━━━━━━━━━━━━━━\n\n" +

        "Thank you for choosing " +
        "*Haya Noor Empire*! 💚🌿";


    const phoneNumber =
        "2349016497065";


    const whatsappURL =
        "https://wa.me/" +
        phoneNumber +
        "?text=" +
        encodeURIComponent(message);


    window.open(
        whatsappURL,
        "_blank"
    );


    /*
       Clear cart after preparing order.
    */

    cart = [];


    saveCart();

    displayCart();

    updateCartCount();


    alert(
        "Your order has been prepared successfully! 💚🌿\n\n" +
        "Please complete the conversation on WhatsApp."
    );

}


/* ==================================================
   MOBILE MENU
================================================== */

function toggleMenu() {

    const navLinks =
        document.getElementById(
            "navLinks"
        );


    if (!navLinks) return;


    navLinks.classList.toggle(
        "active"
    );

}


/* ==================================================
   CLOSE MOBILE MENU WHEN LINK IS CLICKED
================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const navLinks =
            document.getElementById(
                "navLinks"
            );


        if (!navLinks) return;


        const links =
            navLinks.querySelectorAll("a");


        links.forEach(link => {

            link.addEventListener(
                "click",
                function () {

                    navLinks.classList.remove(
                        "active"
                    );

                }
            );

        });

    }
);


/* ==================================================
   PRODUCT DETAILS
================================================== */

function showProductDetails(
    productName,
    image,
    description,
    price
) {

    const details =
        document.getElementById(
            "product-details"
        );


    const detailsImage =
        document.getElementById(
            "details-image"
        );


    const detailsName =
        document.getElementById(
            "details-name"
        );


    const detailsDescription =
        document.getElementById(
            "details-description"
        );


    const detailsPrice =
        document.getElementById(
            "details-price"
        );


    const cartButton =
        document.getElementById(
            "details-cart-button"
        );


    if (!details) return;


    detailsImage.src = image;

    detailsImage.alt =
        productName;


    detailsName.textContent =
        productName;


    detailsDescription.textContent =
        description;


    detailsPrice.textContent =
        "₦" +
        price.toLocaleString();


    cartButton.onclick =
        function () {

            addToCart(
                productName,
                price
            );

            closeProductDetails();

        };


    details.classList.add(
        "active"
    );

}


/* ==================================================
   CLOSE PRODUCT DETAILS
================================================== */

function closeProductDetails() {

    const details =
        document.getElementById(
            "product-details"
        );


    if (!details) return;


    details.classList.remove(
        "active"
    );

}


/* ==================================================
   CLOSE MODAL WHEN CLICKING OUTSIDE
================================================== */

document.addEventListener(
    "click",
    function (event) {

        const details =
            document.getElementById(
                "product-details"
            );


        if (
            details &&
            event.target === details
        ) {

            closeProductDetails();

        }

    }
);


/* ==================================================
   PRODUCT SEARCH
================================================== */

function searchProducts() {

    const searchInput =
        document.getElementById(
            "product-search"
        );


    if (!searchInput) return;


    const searchText =
        searchInput.value
            .toLowerCase()
            .trim();


    const products =
        document.querySelectorAll(
            ".product-card"
        );


    products.forEach(product => {

        const nameElement =
            product.querySelector("h3");


        if (!nameElement) return;


        const productName =
            nameElement.textContent
                .toLowerCase();


        if (
            productName.includes(
                searchText
            )
        ) {

            product.style.display = "";

        } else {

            product.style.display = "none";

        }

    });

}


/* ==================================================
   PRODUCT CATEGORIES
================================================== */

function filterProducts(category) {

    const products =
        document.querySelectorAll(
            ".product-card"
        );


    products.forEach(product => {

        const productCategory =
            product.getAttribute(
                "data-category"
            );


        if (
            category === "all" ||
            productCategory === category
        ) {

            product.style.display = "";

        } else {

            product.style.display = "none";

        }

    });


    const searchInput =
        document.getElementById(
            "product-search"
        );


    if (searchInput) {

        searchInput.value = "";

    }

}


/* ==================================================
   NEWSLETTER
================================================== */

function subscribeNewsletter(event) {

    event.preventDefault();


    const emailInput =
        document.getElementById(
            "newsletter-email"
        );


    const message =
        document.getElementById(
            "newsletter-message"
        );


    if (!emailInput || !message) {
        return;
    }


    const email =
        emailInput.value.trim();


    if (!email) {

        message.textContent =
            "Please enter your email address.";

        return;

    }


    message.textContent =
        "Thank you for joining Haya Noor Empire! 💚🌿";


    emailInput.value = "";

}


/* ==================================================
   BACK TO TOP
================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const backToTopButton =
            document.getElementById(
                "back-to-top"
            );


        if (!backToTopButton) return;


        window.addEventListener(
            "scroll",
            function () {

                if (
                    window.scrollY > 500
                ) {

                    backToTopButton.classList.add(
                        "show"
                    );

                } else {

                    backToTopButton.classList.remove(
                        "show"
                    );

                }

            }
        );

    }
);


/* ==================================================
   SCROLL TO TOP
================================================== */

function scrollToTop() {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


/* ==================================================
   INITIALIZE CART
================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        displayCart();

        updateCartCount();

    }
);


/* ==================================================
   LOADING SCREEN
   IMPORTANT
================================================== */

/*
   This is deliberately written so the loading screen
   cannot remain forever.

   The page waits for the normal window load event,
   then hides the loading screen.

   There is also a safety timeout.
*/

function hideLoadingScreen() {

    const loadingScreen =
        document.getElementById(
            "loading-screen"
        );


    if (!loadingScreen) return;


    loadingScreen.classList.add(
        "hidden"
    );


    /*
       Remove it completely after
       the fade-out animation.
    */

    setTimeout(
        function () {

            if (
                loadingScreen &&
                loadingScreen.parentNode
            ) {

                loadingScreen.remove();

            }

        },
        600
    );

}


/* Normal page loading */

window.addEventListener(
    "load",
    function () {

        setTimeout(
            hideLoadingScreen,
            500
        );

    }
);


/*
   SAFETY FALLBACK

   Even if an image or another resource
   causes the load event to behave unexpectedly,
   the loading screen will still disappear.
*/

setTimeout(
    hideLoadingScreen,
    5000
);
