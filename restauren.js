const slides = document.getElementById("slides");
const images = document.querySelectorAll(".slides img");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const text = document.getElementById("slide-text");
const dots = document.querySelectorAll(".dot");

let index = 1; // Start from real first slide
slides.style.transform = `translateX(${-index * 100}%)`;

const captions = [
  "The Engineer's Restaurent",
  "Serving happiness, one dish at a time.",
  "Best Quality and Tasty Food Point",
  "Crafted with passion, served with love.",
  "Food that vibes with your soul.",
];

text.textContent = captions[index - 1];

function updateCaptionAndDots() {
  let realIndex;
  if (index === 0) {
    realIndex = captions.length - 1;
  } else if (index === images.length - 1) {
    realIndex = 0;
  } else {
    realIndex = index - 1;
  }
  text.textContent = captions[realIndex];

  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === realIndex);
  });
}

function moveSlide(dir) {
  if (dir === "next") index++;
  if (dir === "prev") index--;

  slides.style.transition = "transform 0.8s ease-in-out";
  slides.style.transform = `translateX(${-index * 100}%)`;
  updateCaptionAndDots();
}

next.addEventListener("click", () => moveSlide("next"));
prev.addEventListener("click", () => moveSlide("prev"));

slides.addEventListener("transitionend", () => {
  if (images[index].alt === "First Clone") {
    slides.style.transition = "none";
    index = 1;
    slides.style.transform = `translateX(${-index * 100}%)`;
    updateCaptionAndDots();
  }
  if (images[index].alt === "Last Clone") {
    slides.style.transition = "none";
    index = images.length - 2;
    slides.style.transform = `translateX(${-index * 100}%)`;
    updateCaptionAndDots();
  }
});

// Auto-slide
setInterval(() => moveSlide("next"), 4000);

// Dot click control
dots.forEach((dot, i) => {
  dot.addEventListener("click", () => {
    index = i + 1;
    slides.style.transition = "transform 0.8s ease-in-out";
    slides.style.transform = `translateX(${-index * 100}%)`;
    updateCaptionAndDots();
  });
});

const mobileMenu = document.getElementById("mobile-menu");
const navLinks = document.querySelector(".nav-links");

mobileMenu.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});
function updatePrice() {
  const menuItem = document.getElementById("menu-item");
  const selectedOption = menuItem.options[menuItem.selectedIndex];
  const pricePerItem = selectedOption.getAttribute("data-price");

  document.getElementById("menue-item").value = pricePerItem
    ? pricePerItem
    : "";
}
function calculateTotal() {
  const menuItem = document.getElementById("menu-item");
  const quantity = document.getElementById("quantity").value;
  const tip = document.getElementById("tip").value;
  const restaurantFee = document.getElementById("restaurant-fee").value;

  const selectedOption = menuItem.options[menuItem.selectedIndex];
  const pricePerItem = selectedOption.getAttribute("data-price");

  const total =
    pricePerItem * quantity + parseFloat(tip) + parseFloat(restaurantFee);
  document.getElementById("total").value = total.toFixed(2); // Display total with two decimal places
}
function placeOrder() {
  // Get values from the form
  const Name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone")?.value || "";
  const menuItem = document.getElementById("menu-item");
  const selectedOption = menuItem.options[menuItem.selectedIndex];
  const pricePerItem = selectedOption.getAttribute("data-price");
  const quantity = document.getElementById("quantity").value;
  const tip = document.getElementById("tip").value;
  const restaurantFee = document.getElementById("restaurant-fee").value;
  const total = document.getElementById("total").value;

  // Populate the printable order slip
  // document.getElementById('print-name').innerText = name;
  // document.getElementById('print-email').innerText = email;
  // document.getElementById('print-phone').innerText = phone;
  // document.getElementById('print-menu-item').innerText = selectedOption.text;
  // document.getElementById('print-price-per-item').innerText = pricePerItem;
  // document.getElementById('print-quantity').innerText = quantity;
  // document.getElementById('print-tip').innerText = tip;
  // document.getElementById('print-restaurant-fee').innerText = restaurantFee;
  // document.getElementById('print-total').innerText = total;

  // Show the printable order slip
  // document.getElementById('printable-order').style.display = 'block';
}

function printOrder() {
  const printContent = `
        <html>
            <head>
                <title>Order Slip</title>
                <style>

                    body { font-family: Arial, sans-serif; }
                    h2 { text-align: center; }
                    p { font-size: 16px; }
                </style>
            </head>
            <body> 
                <h2>Order Slip</h2>
                <p><strong>Name:</strong> ${(document.getElementById(
                  "print-name"
                ).innerText = document.getElementById("name").value)}</p>
                <p><strong>Email:</strong> ${(document.getElementById(
                  "print-email"
                ).innerText = document.getElementById("email").value)}</p>
                <p><strong>Phone:</strong> ${(document.getElementById(
                  "print-phone"
                ).textContent = document.getElementById("phone2").value)}</p>
                <p><strong>Menu Item:</strong> ${(document.getElementById(
                  "print-menu-item"
                ).innerText = document.getElementById("menu-item").value)}</p>
                <p><strong>Price per Item:</strong> ${(document.getElementById(
                  "print-price-per-item"
                ).innerText = document
                  .getElementById("menu-item")
                  .options[
                    document.getElementById("menu-item").selectedIndex
                  ].getAttribute("data-price"))}</p>
                <p><strong>Quantity:</strong> ${(document.getElementById(
                  "print-quantity"
                ).innerText = document.getElementById("quantity").value)}</p>
                <p><strong>Tip for Waiter:</strong> ${(document.getElementById(
                  "print-tip"
                ).innerText = document.getElementById("tip").value)}</p>
                <p><strong>Restaurant Fee:</strong> ${(document.getElementById(
                  "print-restaurant-fee"
                ).innerText =
                  document.getElementById("restaurant-fee").value)}</p>
                <p><strong>Total Amount:</strong> ${(document.getElementById(
                  "print-total"
                ).innerText = document.getElementById("total").value)}</p>
            </body>
        </html>
    `;

  const win = window.open("", "", "height=600,width=800");
  win.document.body.innerHTML = printContent;
  win.document.close();
  win.print();
}
