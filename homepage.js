function smoothScroll(target, duration) {
    var targetElement = document.getElementById(target);
    var targetPosition = targetElement.offsetTop; // Get the target position relative to the document
    var startPosition = window.pageYOffset;
    var distance = targetPosition - startPosition; // Calculate the distance to scroll
    var startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        var timeElapsed = currentTime - startTime;
        var run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}

document.getElementById('dashboard-link').addEventListener('click', function(e) {
    e.preventDefault();
    smoothScroll('dashboard-section', 1500); // Adjust duration here
});

document.getElementById('rooms-link').addEventListener('click', function(e) {
    e.preventDefault();
    smoothScroll('rooms-section', 1500); // Adjust duration here
});

document.getElementById('availability-link').addEventListener('click', function(e) {
    e.preventDefault();
    smoothScroll('availability-section', 1500); // Adjust duration here
});

document.getElementById('reservations-link').addEventListener('click', function(e) {
    e.preventDefault();
    smoothScroll('reservations-section', 1500); // Adjust duration here
});

document.getElementById('help-support-link').addEventListener('click', function(e) {
    e.preventDefault();
    smoothScroll('help-support-section', 1500); // Adjust duration here
});
