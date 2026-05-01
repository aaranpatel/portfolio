document.addEventListener("DOMContentLoaded", () => {
    const navbar = document.getElementById("siteNavbar");
    const revealItems = document.querySelectorAll(".reveal");
    const currentYear = document.getElementById("currentYear");
    const heroCarouselElement = document.getElementById("heroCarousel");

    const syncNavbar = () => {
        navbar.classList.toggle("is-scrolled", window.scrollY > 24);
    };

    syncNavbar();
    window.addEventListener("scroll", syncNavbar, { passive: true });

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    obs.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.18
        });

        revealItems.forEach((item) => observer.observe(item));
    } else {
        revealItems.forEach((item) => item.classList.add("is-visible"));
    }

    if (heroCarouselElement && window.bootstrap?.Carousel) {
        const carousel = bootstrap.Carousel.getOrCreateInstance(heroCarouselElement, {
            interval: 5000,
            ride: "carousel",
            pause: false,
            touch: true
        });

        heroCarouselElement.addEventListener("mouseenter", () => carousel.pause());
        heroCarouselElement.addEventListener("mouseleave", () => carousel.cycle());
    }
});
