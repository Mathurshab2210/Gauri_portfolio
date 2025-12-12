window.onload = function () {
    const header = document.querySelector(".parallax-header");
    const windowHeight = window.innerHeight;

    // Set header height dynamically
    header.style.height = windowHeight + "px";

    window.addEventListener("scroll", () => {
        let scroll = window.scrollY;

        // Move background for parallax effect
        header.style.backgroundPositionY = (50 - scroll * 0.1) + "%";
    });
};
