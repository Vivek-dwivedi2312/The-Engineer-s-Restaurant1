const slides = document.getElementById("slides");
const images = document.querySelectorAll(".slides img");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const text = document.getElementById("slide-text");
const dots = document.querySelectorAll(".dot");

let index = 1; // Start from real first slide
slides.style.transform = `translateX(${-index * 100}%)`;

const captions = [
  "Welcome to My Website",
  "Explore Beautiful Places",
  "Create Memories",
  "Enjoy the Journey",
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
function printOrder() {
  // Get form values
  const name = document.getElementById("name")?.value || "";
  const email = document.getElementById("email")?.value || "";
  const phone = document.getElementById("phone2")?.value || "";
  const menuItem = document.getElementById("menu-item");
  const selectedOption = menuItem.options[menuItem.selectedIndex];
  const menuText = selectedOption.textContent;
  const pricePerItem = selectedOption.getAttribute("data-price");
  const quantity = document.getElementById("quantity")?.value || "0";
  const tip = document.getElementById("tip")?.value || "0";
  const restaurantFee = document.getElementById("restaurant-fee")?.value || "0";
  const total = document.getElementById("total")?.value || "0";

  // HTML content for printing
  const printContent = `
        <html>
            <head>
                <title>Order Slip</title>
                <style>
                    @media print {
                        @page {
                            margin: 0;
                        }
                        body {
                            margin: 0;
                            padding: 20px;
                        }
                    }
                    body {
                        font-family: Arial, sans-serif;
                        padding: 20px;
                    }
                    h2 {
                        text-align: center;
                    }
                    p {
                        font-size: 16px;
                        margin: 5px 0;
                    }
                </style>
            </head>
            <body>
                <h2>Order Slip</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone2}</p>
                <p><strong>Menu Item:</strong> ${menuText}</p>
                <p><strong>Price per Item:</strong> ${pricePerItem}</p>
                <p><strong>Quantity:</strong> ${quantity}</p>
                <p><strong>Tip for Waiter:</strong> ${tip}</p>
                <p><strong>Restaurant Fee:</strong> ${restaurantFee}</p>
                <p><strong>Total Amount:</strong> ${total}</p>
            </body>
        </html>
    `;

  // Open new window and write the content
  const win = window.open("", "", "width=800,height=600");
  win.document.open();
  win.document.write(printContent);
  win.document.close();
  win.focus();
  win.print();
  win.close();
}
