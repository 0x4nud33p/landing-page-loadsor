const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".header__nav");
const navLinks = document.querySelectorAll(".header__nav-link");

// Toggle menu open/close
menuToggle.addEventListener("click", () => {
  nav.classList.toggle("active");
});

// Close menu on nav link click + scroll
navLinks.forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("active");
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const trackItems = document.querySelectorAll(".track-item");
  const truck = document.querySelector(".truck");

  const firstItem = trackItems[0].getBoundingClientRect();
  const lastItem = trackItems[trackItems.length - 1].getBoundingClientRect();

  const distance = lastItem.left - firstItem.left;

  truck.animate(
    [
      { transform: `translateX(${firstItem.left}px)` },
      { transform: `translateX(${lastItem.left}px)` }
    ],
    {
      duration: 6000,
      iterations: Infinity,
      easing: "linear"
    }
  );
});


gsap.registerPlugin(ScrollTrigger);

    const items = document.querySelectorAll(".features-section__items li");
    const heading = document.querySelector(".features-section__card-heading");
    const description = document.querySelector(".features-section__card-description");
    const icon = document.querySelector(".features-section__icon-bg img");

    items.forEach((item) => {
      ScrollTrigger.create({
        trigger: item,
        start: "top center", 
        onEnter: () => updateCard(item),
        onEnterBack: () => updateCard(item)
      });
    });

    function updateCard(item) {
      gsap.to([heading, description, icon], {
        opacity: 0,
        y: -20,
        duration: 0.3,
        onComplete: () => {
          heading.textContent = item.dataset.title;
          description.textContent = item.dataset.description;
          icon.src = item.dataset.icon;

          gsap.fromTo([heading, description, icon],
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.4 }
          );
        }
      });
    }
