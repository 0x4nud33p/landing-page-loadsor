const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".header__nav");
const navLinks = document.querySelectorAll(".header__nav-link");

document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".header__nav-link");

  function onScroll() {
    let currentSectionId = "";

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 120 && rect.bottom >= 120) {
        currentSectionId = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentSectionId}`) {
        link.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", onScroll);
  onScroll();
});

// navbar toggle
menuToggle.addEventListener("click", () => {
  nav.classList.toggle("active");
});

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("active");
  });
});

const featureCard = document.getElementById("feature-card");
const cardIcon = document.getElementById("card-icon");
const cardHeading = document.getElementById("card-heading");
const cardDescription = document.getElementById("card-description");
const progressBar = featureCard.querySelector(".progress-bar");
const listItems = document.querySelectorAll(".features-section__items li");

const features = [
  {
    heading: "Freight Management",
    description: "Create, assign, and track loads from one smart dashboard. Plan shipments, assign vehicles, and monitor status in real-time — all from one place.",
    iconSrc: "./assets/icons/box.svg"
  },
  {
    heading: "Transport Management",
    description: "Manage transporters, assign vehicles, and track performance — all in one place.",
    iconSrc: "./assets/icons/blue-truck.svg"
  },
  {
    heading: "Vehicle Tracking",
    description: "Monitor live vehicle locations, ETAs, and delays with real-time visibility.",
    iconSrc: "./assets/icons/location-blue.svg"
  },
  {
    heading: "E-Way Bill Management",
    description: "Auto-fetch, attach, and store e-way bills to keep every trip compliant.",
    iconSrc: "./assets/icons/E-Way-bill-blue.svg"
  },
  {
    heading: "Driver & Vehicle Verification",
    description: "Digitally verify driver IDs and vehicle documents before dispatch.",
    iconSrc: "./assets/icons/Driver-Vehicle-Verification-blue.svg"
  },
  {
    heading: "Check challan Status",
    description: "Track challan details and status instantly to avoid penalties and delays.",
    iconSrc: "./assets/icons/challan-blue.svg"
  }
];

let currentIndex = 0;
let autoRotateTimeout;

function updateCard(index) {
  const itemData = features[index];

  // fade out card
  featureCard.classList.remove("fade-in");
  featureCard.classList.add("fade-out");

  setTimeout(() => {
    // update content
    cardIcon.src = itemData.iconSrc;
    cardHeading.textContent = itemData.heading;
    cardDescription.textContent = itemData.description;

    // reset li states
    listItems.forEach(item => item.classList.remove("hidden"));
    listItems[index].classList.add("hidden");

    // reinsert card after active li
    listItems[index].insertAdjacentElement("afterend", featureCard);

    // fade back in
    featureCard.classList.remove("fade-out");
    featureCard.classList.add("fade-in");

    // restart progress bar
    progressBar.style.transition = "none";
    progressBar.style.width = "0%";
    setTimeout(() => {
      progressBar.style.transition = "width 4s linear";
      progressBar.style.width = "100%";
    }, 50);
  }, 300);
}

function cycleFeatures() {
  autoRotateTimeout = setTimeout(() => {
    currentIndex = (currentIndex + 1) % features.length;
    updateCard(currentIndex);
    cycleFeatures();
  }, 4000);
}

function startAutoRotate() {
  updateCard(currentIndex);
  cycleFeatures();
}

function stopAutoRotate() {
  clearTimeout(autoRotateTimeout);
}

// manual click
listItems.forEach((item, idx) => {
  item.addEventListener("click", () => {
    stopAutoRotate();
    currentIndex = idx;
    updateCard(currentIndex);
    autoRotateTimeout = setTimeout(() => {
      currentIndex = (currentIndex + 1) % features.length;
      updateCard(currentIndex);
      cycleFeatures();
    }, 4000);
  });
});

startAutoRotate();

// truck animation 
document.addEventListener("DOMContentLoaded", function () {
  const truck = document.querySelector(".truck-wrapper img");
  const items = document.querySelectorAll(".track-item");

  function checkPassed() {
    const truckRect = truck.getBoundingClientRect();
    items.forEach(item => {
      const itemRect = item.getBoundingClientRect();
      // For rightward scroll: check if item's LEFT > truck's RIGHT
      const checkpoint = truckRect.right - 65;
      if (itemRect.left > checkpoint) {
        item.classList.add("passed");
      } else {
        item.classList.remove("passed");
      }
    });
  }

  // Run continuously while animation runs
  setInterval(checkPassed, 100);
});

//footer 
document.addEventListener("DOMContentLoaded", () => {
  const dropdown = document.querySelector(".custom-dropdown");
  const selected = dropdown.querySelector(".dropdown-selected");
  const list = dropdown.querySelector(".dropdown-list");

  selected.addEventListener("click", () => {
    list.style.display = list.style.display === "block" ? "none" : "block";
  });

  list.querySelectorAll("li").forEach(item => {
    item.addEventListener("click", () => {
      selected.textContent = item.textContent;
      list.style.display = "none";
    });
  });

  document.addEventListener("click", (e) => {
    if (!dropdown.contains(e.target)) {
      list.style.display = "none";
    }
  });
});
