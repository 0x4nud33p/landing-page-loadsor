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

menuToggle.addEventListener("click", () => {
  nav.classList.toggle("active");
});

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("active");
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const listItems = document.querySelectorAll(".features-section__items li");
  const cardIcon = document.getElementById("card-icon");
  const cardHeading = document.getElementById("card-heading");
  const cardDescription = document.getElementById("card-description");

  const initialCardState = {
    heading: "Freight Management",
    description: "Create, assign, and track loads from one smart dashboard. Plan shipments, assign vehicles, and monitor status in real-time — all from one place.",
    iconSrc: "./assets/icons/box.svg"
  };

  // Function to update the card content
  function updateCard(itemData) {
    if (cardHeading.textContent === itemData.heading) {
      return;
    }

    // Fade-out effect
    cardIcon.style.opacity = "0";
    cardHeading.style.opacity = "0";
    cardDescription.style.opacity = "0";

    // Update content after a short delay for the fade-out effect
    setTimeout(() => {
      cardIcon.src = itemData.iconSrc;
      cardHeading.textContent = itemData.heading;
      cardDescription.textContent = itemData.description;

      // Fade-in effect
      cardIcon.style.opacity = "1";
      cardHeading.style.opacity = "1";
      cardDescription.style.opacity = "1";
    }, 200);

    // Update active class on list items
    listItems.forEach(item => item.classList.remove("active"));
    const activeItem = Array.from(listItems).find(
      item => item.dataset.heading === itemData.heading
    );
    if (activeItem) {
      activeItem.classList.add("active");
    }
  }

  // Handle click on a list item
  listItems.forEach(item => {
    item.addEventListener("click", e => {
      e.preventDefault();
      const itemData = {
        heading: item.dataset.heading,
        description: item.dataset.description,
        iconSrc: item.dataset.iconSrc
      };
      updateCard(itemData);
    });
  });

  // Check for IntersectionObserver support
  if ("IntersectionObserver" in window) {
    // IntersectionObserver implementation
    const observerOptions = {
      root: null,
      rootMargin: "-30% 0px -30% 0px" , // Trigger when element is in the middle 20% of the viewport
      threshold: 0
    };

    const observerCallback = (entries, observer) => {
      let activeEntry = null;

      // Find the first intersecting entry
      for (const entry of entries) {
        if (entry.isIntersecting) {
          activeEntry = entry;
          break;
        }
      }

      // Update card if an intersecting entry is found
      if (activeEntry) {
        const itemData = {
          heading: activeEntry.target.dataset.heading,
          description: activeEntry.target.dataset.description,
          iconSrc: activeEntry.target.dataset.iconSrc
        };
        updateCard(itemData);
      } else {
        // If no items are intersecting, revert to default state or last active item
        // This is a stylistic choice. We'll revert to the initial state.
        const lastActiveItem = document.querySelector(".features-section__items li.active");
        if (!lastActiveItem) {
          updateCard(initialCardState);
        }
      }
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    listItems.forEach(item => {
      observer.observe(item);
    });
  } else {
    // Fallback for browsers that don't support IntersectionObserver
    let lastActiveItem = null;
    const debounce = (func, wait) => {
      let timeout;
      return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
      };
    };

    const handleScroll = () => {
      const viewportCenter = window.innerHeight / 2;
      let closestItem = null;
      let minDistance = Infinity;

      listItems.forEach(item => {
        const rect = item.getBoundingClientRect();
        const itemCenter = rect.top + rect.height / 2;
        const distance = Math.abs(viewportCenter - itemCenter);

        if (distance < minDistance) {
          minDistance = distance;
          closestItem = item;
        }
      });

      if (closestItem && closestItem !== lastActiveItem) {
        const itemData = {
          heading: closestItem.dataset.heading,
          description: closestItem.dataset.description,
          iconSrc: closestItem.dataset.iconSrc
        };
        updateCard(itemData);
        lastActiveItem = closestItem;
      } else if (!closestItem) {
        // Revert to initial state if no items are visible
        updateCard(initialCardState);
      }
    };

    window.addEventListener("scroll", debounce(handleScroll, 100));
    window.addEventListener("resize", debounce(handleScroll, 100));
    handleScroll(); // Initial call
  }
});

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
