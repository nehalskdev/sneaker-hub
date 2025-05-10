document.addEventListener("DOMContentLoaded", function () {
  // Product Gallery Functionality
  const thumbnails = document.querySelectorAll(".thumbnail");
  const mainImage = document.getElementById("mainImage");

  thumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener("click", function () {
      // Remove active class from all thumbnails
      thumbnails.forEach((t) => t.classList.remove("active"));

      // Add active class to clicked thumbnail
      this.classList.add("active");

      // Update main image
      const newImageSrc = this.getAttribute("data-image");
      mainImage.src = newImageSrc;

      // Add zoom effect
      mainImage.style.transform = "scale(1.05)";
      setTimeout(() => {
        mainImage.style.transform = "scale(1)";
      }, 300);
    });
  });

  // Image zoom on hover
  mainImage.addEventListener("mousemove", function (e) {
    if (window.innerWidth > 768) {
      // Only on desktop
      const rect = this.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      this.style.transformOrigin = `${x}% ${y}%`;
    }
  });

  mainImage.addEventListener("mouseenter", function () {
    if (window.innerWidth > 768) {
      this.style.transform = "scale(1.5)";
      this.style.cursor = "zoom-out";
    }
  });

  mainImage.addEventListener("mouseleave", function () {
    if (window.innerWidth > 768) {
      this.style.transform = "scale(1)";
      this.style.cursor = "zoom-in";
    }
  });

  // Size Chart Modal
  const sizeChartBtn = document.getElementById("sizeChartBtn");
  const sizeChartModal = document.getElementById("sizeChartModal");
  const closeSizeChart = sizeChartModal.querySelector(".close-modal");

  sizeChartBtn.addEventListener("click", function () {
    sizeChartModal.style.display = "flex";
    document.body.style.overflow = "hidden";
  });

  closeSizeChart.addEventListener("click", function () {
    sizeChartModal.style.display = "none";
    document.body.style.overflow = "auto";
  });

  // Close modal when clicking outside
  sizeChartModal.addEventListener("click", function (e) {
    if (e.target === sizeChartModal) {
      sizeChartModal.style.display = "none";
      document.body.style.overflow = "auto";
    }
  });

  // Close modal with ESC key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && sizeChartModal.style.display === "flex") {
      sizeChartModal.style.display = "none";
      document.body.style.overflow = "auto";
    }
  });

  // Compare Colors Modal
  const compareBtn = document.getElementById("compareBtn");
  const compareModal = document.getElementById("compareModal");
  const closeCompare = compareModal.querySelector(".close-modal");

  compareBtn.addEventListener("click", function () {
    compareModal.style.display = "flex";
    document.body.style.overflow = "hidden";
  });

  closeCompare.addEventListener("click", function () {
    compareModal.style.display = "none";
    document.body.style.overflow = "auto";
  });

  compareModal.addEventListener("click", function (e) {
    if (e.target === compareModal) {
      compareModal.style.display = "none";
      document.body.style.overflow = "auto";
    }
  });

  // Color Swatches Selection
  const colorSwatches = document.querySelectorAll(".color-swatch");

  colorSwatches.forEach((swatch) => {
    swatch.addEventListener("click", function () {
      // Remove active class from all swatches
      colorSwatches.forEach((s) => s.classList.remove("active"));

      // Add active class to clicked swatch
      this.classList.add("active");

      // Persist selected color to localStorage
      const selectedColor = this.getAttribute("data-color");
      localStorage.setItem("selectedColor", selectedColor);

      // Update product title to reflect color (optional)
      const productTitle = document.querySelector(".product-title");
      const baseTitle = productTitle.textContent.replace(/\(.*\)/, "").trim();
      productTitle.textContent = `${baseTitle} (${
        selectedColor.charAt(0).toUpperCase() + selectedColor.slice(1)
      })`;
    });
  });

  // Size Options Selection
  const sizeOptions = document.querySelectorAll(".size-option");

  sizeOptions.forEach((option) => {
    option.addEventListener("click", function () {
      // Remove active class from all options
      sizeOptions.forEach((o) => o.classList.remove("active"));

      // Add active class to clicked option
      this.classList.add("active");

      // Persist selected size to localStorage
      const selectedSize = this.textContent;
      localStorage.setItem("selectedSize", selectedSize);
    });
  });

  // Check for previously selected color and size
  const savedColor = localStorage.getItem("selectedColor");
  const savedSize = localStorage.getItem("selectedSize");

  if (savedColor) {
    const swatchToSelect = document.querySelector(
      `.color-swatch[data-color="${savedColor}"]`
    );
    if (swatchToSelect) {
      swatchToSelect.click(); // This will trigger the click event and update the UI
    }
  }

  if (savedSize) {
    const sizeToSelect = [...sizeOptions].find(
      (option) => option.textContent === savedSize
    );
    if (sizeToSelect) {
      sizeToSelect.click();
    }
  }

  // Quantity Selector
  const quantityInput = document.querySelector(".quantity-input");
  const minusBtn = document.querySelector(".quantity-btn.minus");
  const plusBtn = document.querySelector(".quantity-btn.plus");

  minusBtn.addEventListener("click", function () {
    let currentValue = parseInt(quantityInput.value);
    if (currentValue > 1) {
      quantityInput.value = currentValue - 1;
    }
  });

  plusBtn.addEventListener("click", function () {
    let currentValue = parseInt(quantityInput.value);
    quantityInput.value = currentValue + 1;
  });

  // Product Tabs
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  tabButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons and contents
      tabButtons.forEach((btn) => btn.classList.remove("active"));
      tabContents.forEach((content) => content.classList.remove("active"));

      // Add active class to clicked button
      this.classList.add("active");

      // Show corresponding content
      const tabId = this.getAttribute("data-tab");
      document.getElementById(tabId).classList.add("active");
    });
  });

  // Initialize first tab as active
  if (tabButtons.length > 0 && tabContents.length > 0) {
    tabButtons[0].classList.add("active");
    tabContents[0].classList.add("active");
  }

  // Add to cart buttons (placeholder functionality)
  const addToCartButtons = document.querySelectorAll(
    ".add-to-cart-btn, .add-bundle-btn"
  );

  addToCartButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const originalText = this.textContent;
      this.textContent = "Added to Cart!";
      this.style.backgroundColor = "#28a745";

      setTimeout(() => {
        this.textContent = originalText;
        this.style.backgroundColor = "#000";
      }, 2000);
    });
  });

  // Pair products horizontal scroll on mobile
  const pairProducts = document.querySelector(".pair-products");
  let isDown = false;
  let startX;
  let scrollLeft;

  pairProducts.addEventListener("mousedown", (e) => {
    isDown = true;
    startX = e.pageX - pairProducts.offsetLeft;
    scrollLeft = pairProducts.scrollLeft;
  });

  pairProducts.addEventListener("mouseleave", () => {
    isDown = false;
  });

  pairProducts.addEventListener("mouseup", () => {
    isDown = false;
  });

  pairProducts.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - pairProducts.offsetLeft;
    const walk = (x - startX) * 2;
    pairProducts.scrollLeft = scrollLeft - walk;
  });
});
