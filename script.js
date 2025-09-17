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

// key features animation  
document.addEventListener("DOMContentLoaded", () => {
  const listItems = document.querySelectorAll(".features-section__items li");
  const featuresData = [ 
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

  const cardIcon = document.getElementById("card-icon");
  const cardHeading = document.getElementById("card-heading");
  const cardDescription = document.getElementById("card-description");
  const progressBar = document.querySelector(".progress-bar");

  function updateCard(itemData, index) {
    cardIcon.style.opacity = 0;
    cardHeading.style.opacity = 0;
    cardDescription.style.opacity = 0;

    setTimeout(() => {
      cardIcon.src = itemData.iconSrc;
      cardHeading.textContent = itemData.heading;
      cardDescription.textContent = itemData.description;

      cardIcon.style.opacity = 1;
      cardHeading.style.opacity = 1;
      cardDescription.style.opacity = 1;
    }, 200);

    // highlight active <li>
    listItems.forEach(item => item.classList.remove("active"));
    if (listItems[index]) listItems[index].classList.add("active");

    // Reset and animate progress bar
    progressBar.style.transition = "none";
    progressBar.style.width = "0%";
    setTimeout(() => {
      progressBar.style.transition = "width 4s linear";
      progressBar.style.width = "100%";
    }, 50);
  }

  let currentIndex = 0;

  function showNextItem() {
    const itemData = featuresData[currentIndex];
    updateCard(itemData, currentIndex);

    currentIndex++;
    if (currentIndex >= featuresData.length) currentIndex = 0;

    setTimeout(showNextItem, 4000); // duration for progress bar to fill
  }

  showNextItem();

  // Click to manually select an item
  listItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      currentIndex = index;
      updateCard(featuresData[index], index);
    });
  });
});

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
