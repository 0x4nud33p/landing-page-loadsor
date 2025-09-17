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
  const cardIcon = document.getElementById("card-icon");
  const cardHeading = document.getElementById("card-heading");
  const cardDescription = document.getElementById("card-description");
  const progressBar = document.querySelector(".progress-bar");

  const initialCardState = {
    heading: "Freight Management",
    description: "Create, assign, and track loads from one smart dashboard. Plan shipments, assign vehicles, and monitor status in real-time — all from one place.",
    iconSrc: "./assets/icons/box.svg"
  };

  function updateCard(itemData) {
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

    listItems.forEach(item => item.classList.remove("active"));
    const activeItem = Array.from(listItems).find(item => item.dataset.heading === itemData.heading);
    if (activeItem) activeItem.classList.add("active");

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
    const item = listItems[currentIndex];
    const itemData = {
      heading: item.dataset.heading,
      description: item.dataset.description,
      iconSrc: item.dataset.iconSrc
    };
    updateCard(itemData);

    currentIndex++;
    if (currentIndex >= listItems.length) currentIndex = 0;

    setTimeout(showNextItem, 4000); // duration for progress bar to fill
  }

  showNextItem();

  // Click to manually select an item
  listItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      currentIndex = index;
      showNextItem();
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
      if (itemRect.left > truckRect.right) {
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
