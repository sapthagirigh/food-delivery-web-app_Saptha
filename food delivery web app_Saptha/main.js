var menuItems = [
      { id: 1, name: "Spring Rolls", price: 120, category: "Starters", image: "images/Spring Rolls.jpg" },
      { id: 2, name: "Chicken Wings", price: 180, category: "Starters", image: "images/Chicken Wings.jpg" },
      { id: 3, name: "Paneer Tikka", price: 160, category: "Starters", image: "images/Paneer Tikka.jpg" },
      { id: 4, name: "Fish Fingers", price: 200, category: "Starters", image: "images/Fish Fingers.jpg" },
      { id: 5, name: "Veg Biryani", price: 200, category: "Veg", image: "images/Veg Biryani.jpg" },
      { id: 6, name: "Paneer Butter Masala", price: 220, category: "Veg", image: "images/Paneer Butter Masala.jpg" },
      { id: 7, name: "Veg Pizza", price: 180, category: "Veg", image: "images/Veg Pizza.jpg" },
      { id: 8, name: "Aloo Paratha", price: 150, category: "Veg", image: "images/Aloo Paratha.jpg" },
      { id: 9, name: "Veg Burger", price: 120, category: "Veg", image: "images/Veg Burger.jpg" },
      { id: 10, name: "Chicken Biryani", price: 280, category: "Non Veg", image: "images/Chicken Biryani.jpg" },
      { id: 11, name: "Mutton Curry", price: 350, category: "Non Veg", image: "images/Mutton Curry.jpg" },
      { id: 12, name: "Chicken Pizza", price: 250, category: "Non Veg", image: "images/Chicken Pizza.jpg" },
      { id: 13, name: "Fish Curry", price: 300, category: "Non Veg", image: "images/Fish Curry.jpg" },
      { id: 14, name: "Chicken Burger", price: 180, category: "Non Veg", image: "images/Chicken Burger.jpg" },
      { id: 15, name: "Cake", price: 150, category: "Desserts", image: "images/Cake.jpg" },
      { id: 16, name: "Ice Cream", price: 80, category: "Desserts", image: "images/Ice Cream.jpg" },
      { id: 17, name: "Gulab Jamun", price: 100, category: "Desserts", image: "images/Gulab Jamun.jpg" },
      { id: 18, name: "Brownie", price: 120, category: "Desserts", image: "images/Brownie.jpg" },
      { id: 19, name: "Kulfi", price: 60, category: "Desserts", image: "images/Kulfi.jpg" },
      { id: 20, name: "Tea", price: 20, category: "Drinks", image: "images/Tea.jpg" },
      { id: 21, name: "Coffee", price: 25, category: "Drinks", image: "images/Coffee.jpg" },
      { id: 22, name: "Mojito", price: 50, category: "Drinks", image: "images/Mojito.jpg" },
      { id: 23, name: "Pepsi", price: 40, category: "Drinks", image: "images/Pepsi.jpg" }
    ];

    var cartItems = [];
    var orderHistory = [];
    function initApp() {
      loadFromStorage();
      displayMenu();
      updateCartDisplay();
    }

    function loadFromStorage() {
      var savedCart = localStorage.getItem("sapthaCart");
      if (savedCart) {
        try {
          cartItems = JSON.parse(savedCart);
        } catch (e) {
          console.log("Error loading cart data");
          cartItems = [];
        }}

      var savedOrders = localStorage.getItem("sapthaOrders");
      if (savedOrders) {
        try {
          orderHistory = JSON.parse(savedOrders);
        } catch (e) {
          console.log("Error loading order history");
          orderHistory = [];
        }}}

    function saveToStorage() {
      try {
        localStorage.setItem("sapthaCart", JSON.stringify(cartItems));
        localStorage.setItem("sapthaOrders", JSON.stringify(orderHistory));
      } catch (e) {
        console.log("Error saving data to storage");
      }
    }

    function displayMenu() {
      var container = document.getElementById("menuContainer");
      var searchTerm = document.getElementById("searchInput").value.toLowerCase();
      var filteredItems = menuItems.filter(function(item) {
        return item.name.toLowerCase().indexOf(searchTerm) !== -1;
      });

      if (filteredItems.length === 0) {
        container.innerHTML = '<p class="empty-message">No items found matching your search.</p>';
        return;
      }

      var categories = ["Starters", "Veg", "Non Veg", "Desserts", "Drinks"];
      var html = "";

      for (var i = 0; i < categories.length; i++) {
        var category = categories[i];
        var categoryItems = filteredItems.filter(function(item) {
          return item.category === category;
        });

        if (categoryItems.length > 0) {
          html += '<div class="category-section">';
          html += '<div class="category-header">' + category + '</div>';
          html += '<div class="items-grid">';
          for (var j = 0; j < categoryItems.length; j++) {
            var item = categoryItems[j];
            html += '<div class="item-card">';
            html += '<img src="' + item.image + '" alt="' + item.name + '">';
            html += '<h3>' + item.name + '</h3>';
            html += '<div class="price">₹' + item.price + '</div>';
            html += '<button class="add-btn" onclick="addToCart(' + item.id + ')">Add to Cart</button>';
            html += '</div>';
          }
          html += '</div>';
          html += '</div>';
        }}

      container.innerHTML = html;
    }

    function addToCart(itemId) {
      var item = menuItems.find(function(item) {
        return item.id === itemId;
      });
      
      if (!item) return;
      var existingItem = cartItems.find(function(cartItem) {
        return cartItem.id === itemId;
      });
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cartItems.push({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: 1
        });
      }
      updateCartDisplay();
      saveToStorage();
    }

    function updateCartDisplay() {
      var totalItems = cartItems.reduce(function(sum, item) {
        return sum + item.quantity;
      }, 0);

      document.getElementById("cartCount").textContent = totalItems;
      var cartContainer = document.getElementById("cartItems");
      var totalPrice = 0;
      if (cartItems.length === 0) {
        cartContainer.innerHTML = '<p class="empty-message">Your cart is empty</p>';
        document.getElementById("cartTotal").textContent = "Total: ₹0";
        return;
      }
      var html = "";
      for (var i = 0; i < cartItems.length; i++) {
        var item = cartItems[i];
        var itemTotal = item.price * item.quantity;
        totalPrice += itemTotal;
        html += '<div class="cart-item">';
        html += '<span>' + item.name + ' x ' + item.quantity + '</span>';
        html += '<div class="cart-controls">';
        html += '<button onclick="updateQuantity(' + item.id + ', 1)">+</button>';
        html += '<button onclick="updateQuantity(' + item.id + ', -1)">-</button>';
        html += '<button onclick="removeFromCart(' + item.id + ')">Remove</button>';
        html += '</div>';
        html += '<span>₹' + itemTotal + '</span>';
        html += '</div>';
      }

      cartContainer.innerHTML = html;
      document.getElementById("cartTotal").textContent = "Total: ₹" + totalPrice;
    }

    function updateQuantity(itemId, change) {
      var item = cartItems.find(function(item) {
        return item.id === itemId;
      });

      if (!item) return;

      item.quantity += change;

      if (item.quantity <= 0) {
        removeFromCart(itemId);
      } else {
        updateCartDisplay();
        saveToStorage();
      }}

    function removeFromCart(itemId) {
      cartItems = cartItems.filter(function(item) {
        return item.id !== itemId;
      });

      updateCartDisplay();
      saveToStorage();
    }

    function clearCart() {
      if (confirm("Are you sure you want to clear your cart?")) {
        cartItems = [];
        updateCartDisplay();
        saveToStorage();
      }}

    function proceedToCheckout() {
      if (cartItems.length === 0) {
        alert("Your cart is empty!");
        return;
      }

      closePopup("cartOverlay");
      showPopup("checkoutOverlay");
    }

    function showPopup(popupId) {
      document.getElementById(popupId).classList.add("active");
    }

    function closePopup(popupId) {
      document.getElementById(popupId).classList.remove("active");
    }

    function displayOrderHistory() {
      var container = document.getElementById("orderHistory");

      if (orderHistory.length === 0) {
        container.innerHTML = '<p class="empty-message">No orders found</p>';
        return;
      }
      var html = "";
      for (var i = orderHistory.length - 1; i >= 0; i--) {
        var order = orderHistory[i];
        var itemNames = order.items.map(function(item) {
          return item.name + " x " + item.quantity;
        }).join(", ");

        html += '<div class="order-item">';
        html += '<div class="order-date">Order placed on: ' + order.date + '</div>';
        html += '<div class="order-details">';
        html += '<strong>Items:</strong> ' + itemNames + '<br>';
        html += '<strong>Address:</strong> ' + order.address + '<br>';
        html += '<strong>Payment:</strong> ' + order.payment.toUpperCase();
        html += '</div>';
        html += '<div class="order-total">Total: ₹' + order.total + '</div>';
        html += '</div>';
      }
      container.innerHTML = html;
    }
    function clearOrderHistory() {
      if (confirm("Are you sure you want to clear your order history?")) {
        orderHistory = [];
        saveToStorage();
        displayOrderHistory();
      }}

    function backToMenu() {
      closePopup("confirmOverlay");
      updateCartDisplay();
    }

    document.getElementById("cartBtn").addEventListener("click", function() {
      showPopup("cartOverlay");
    });

    document.getElementById("ordersBtn").addEventListener("click", function() {
      displayOrderHistory();
      showPopup("ordersOverlay");
    });

    document.getElementById("searchInput").addEventListener("input", function() {
      displayMenu();
    });

    document.getElementById("checkoutForm").addEventListener("submit", function(e) {
      e.preventDefault();

      var name = document.getElementById("customerName").value.trim();
      var address = document.getElementById("deliveryAddress").value.trim();
      var payment = document.getElementById("paymentMethod").value;
      if (!name || !address || !payment) {
        alert("Please fill in all fields");
        return;
      }
      var total = cartItems.reduce(function(sum, item) {
        return sum + (item.price * item.quantity);
      }, 0);

      var order = {
        id: Date.now(),
        date: new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString(),
        items: cartItems.slice(),
        total: total,
        customerName: name,
        address: address,
        payment: payment
      };

      orderHistory.push(order);
      cartItems = [];
      saveToStorage();
      document.getElementById("checkoutForm").reset();
      closePopup("checkoutOverlay");
      showPopup("confirmOverlay");
    });
    window.addEventListener("click", function(event) {
      var overlays = document.querySelectorAll(".popup-overlay");
      for (var i = 0; i < overlays.length; i++) {
        if (event.target === overlays[i]) {
          overlays[i].classList.remove("active");
        }
      }
});
    window.addEventListener("DOMContentLoaded", initApp);