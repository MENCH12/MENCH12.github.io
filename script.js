// Function to check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Function to add 'visible' class to sections when they enter the viewport
function addClassWhenVisible() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('nav a');

    sections.forEach((section, index) => {
        if (isInViewport(section)) {
            section.classList.add('visible');

            // Remove active class from all nav links
            navLinks.forEach(link => {
                link.classList.remove('active');
            });

            // Add active class to the current nav link
            navLinks[index].classList.add('active');
        }
    });
}


function debounce(func, wait = 20, immediate = true) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Event listener for scrolling
window.addEventListener('scroll', debounce(addClassWhenVisible));

// Select all links with hashes
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
