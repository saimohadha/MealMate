// ===============================
// FOOD DATA
// ===============================

const foods = [
    {
        name: "Margherita Pizza",
        price: 249,
        rating: 4.8,
        image: "🍕",
        category: "Pizza"
    },
    {
        name: "Cheese Burger",
        price: 199,
        rating: 4.7,
        image: "🍔",
        category: "Burgers"
    },
    {
        name: "Hakka Noodles",
        price: 179,
        rating: 4.5,
        image: "🍜",
        category: "Noodles"
    },
    {
        name: "Paneer Butter Masala",
        price: 229,
        rating: 4.6,
        image: "🍛",
        category: "Indian"
    },
    {
        name: "Chocolate Brownie",
        price: 149,
        rating: 4.6,
        image: "🍫",
        category: "Desserts"
    },
    {
        name: "French Fries",
        price: 99,
        rating: 4.4,
        image: "🍟",
        category: "Burgers"
    },
    {
        name: "Cold Coffee",
        price: 129,
        rating: 4.5,
        image: "🥤",
        category: "Drinks"
    },
    {
        name: "Masala Dosa",
        price: 189,
        rating: 4.7,
        image: "🥞",
        category: "Indian"
    }
];


// ===============================
// DOM ELEMENTS
// ===============================

const foodContainer = document.getElementById("food-container");
const searchInput = document.getElementById("search-input");
const categoryCards = document.querySelectorAll(".category");
const checkoutButton = document.getElementById("checkout-btn");
const checkoutSection = document.querySelector(".checkout-section");
const checkoutForm = document.getElementById("checkout-form");
const successSection = document.getElementById("success-section");
const cartButton = document.getElementById("cart-btn");
const cartSection = document.getElementById("cart-section");
// ===============================
// CART
// ===============================

const cart = [];


// ===============================
// DISPLAY FOODS
// ===============================

function displayFoods(foodList) {

    // Clear existing food cards
    foodContainer.innerHTML = "";


    // If no food is found
    if (foodList.length === 0) {

        foodContainer.innerHTML = `
            <div class="no-food">
                <h3>😕 No food found</h3>
                <p>Try searching for something else.</p>
            </div>
        `;

        return;
    }


    // Create cards for each food
    foodList.forEach(function(food) {

        const card = document.createElement("article");

        card.className = "food-card";


        // Create card HTML
        card.innerHTML = `
            <div class="food-image">${food.image}</div>

            <div class="food-info">
                <h3>${food.name}</h3>

                <p class="food-rating">
                    ⭐ ${food.rating}
                </p>

                <p class="food-price">
                    ₹${food.price}
                </p>

                <button class="add-to-cart">
                    Add to Cart
                </button>
            </div>
        `;


        // Find Add to Cart button
        const button = card.querySelector(".add-to-cart");


        // Add click event
        button.addEventListener("click", function() {

              cart.push({
              ...food,
             quantity: 1
             });
            displayCart();
            console.log(cart);

        });


        // Add card to page
        foodContainer.appendChild(card);

    });
}


// ===============================
// DISPLAY ALL FOODS INITIALLY
// ===============================

displayFoods(foods);


// ===============================
// SEARCH
// ===============================

searchInput.addEventListener("input", function() {

    const searchText = searchInput.value.toLowerCase();


    const result = foods.filter(function(food) {

        return food.name
            .toLowerCase()
            .includes(searchText);

    });


    displayFoods(result);

});


// ===============================
// CATEGORY FILTER
// ===============================

categoryCards.forEach(function(categoryCard) {

    categoryCard.addEventListener("click", function(event) {

        const selectedCategory =
            event.currentTarget.dataset.category;


        const result = foods.filter(function(food) {

            return food.category === selectedCategory;

        });


        displayFoods(result);

    });

});
const cartContainer = document.getElementById("cart-items-container");
const total = document.getElementById("total");
function displayCart() {
    cartContainer.innerHTML="";
    if(cart.length===0)
    {
        cartContainer.innerHTML= `
            <div class="empty-cart">
               <p> 🛒 Your cart is empty! </p>
            </div>
        `;
        total.innerHTML="";
        return;
    }
    let totalAmt=0;
    cart.forEach(function(item, idx) {
        totalAmt+=item.price*item.quantity;
        const cartItem = document.createElement("div");
        cartItem.className="cart-item";
        cartItem.innerHTML=`
        <div class="item-info">
           <div>${item.image}</div>
           <h2>${item.name}</h2>
           <p>${item.price}</p>
           <div class="quantity-controls">
               <button class="minus-btn">−</button>
              <span>${item.quantity}</span>
             <button class="plus-btn">+</button>
           </div>
        </div>
        `;
        cartContainer.appendChild(cartItem);
        const plusButton = cartItem.querySelector(".plus-btn");
        const minusButton = cartItem.querySelector(".minus-btn");
             plusButton.addEventListener("click", function() {
                item.quantity += 1;
                displayCart();
            });
            minusButton.addEventListener("click", function() {
                if(item.quantity>1) {
                item.quantity -= 1;
            }
            else
                cart.splice(idx, 1);
            displayCart();
            });
            });
    total.innerHTML = `Total: ₹${totalAmt}`;
}
checkoutButton.addEventListener("click", function() {
    if (cart.length===0) {
        alert("Your cart is empty!");
        return;
    }
    checkoutSection.style.display = "block";
});
checkoutForm.addEventListener("submit", function(event) {
    event.preventDefault();
      successSection.style.display = "block";
      cart.length = 0;
displayCart();
      checkoutSection.style.display = "none";
});
cartButton.addEventListener("click", function() {
    cartSection.scrollIntoView();
});
const orderNowButton = document.getElementById("order-now-btn");
orderNowButton.addEventListener("click", function() {
    document.getElementById("menu").scrollIntoView();
});