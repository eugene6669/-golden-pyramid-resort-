function sortRooms(status) {
    const roomList = document.getElementById('room-list');
    const rooms = roomList.getElementsByClassName('room');
    
    const sortedRooms = Array.from(rooms).sort((a, b) => {
        const statusA = a.classList.contains(status);
        const statusB = b.classList.contains(status);

        if (statusA && !statusB) {
            return -1;
        } else if (!statusA && statusB) {
            return 1;
        } else {
            return 0;
        }
    });

    roomList.innerHTML = ''; // Clear the existing list
    
    sortedRooms.forEach(room => {
        roomList.appendChild(room);
    });
}

function returnToHomepage() {
    // Redirect to the homepage
    window.location.href = '../Homepage-Employees/homepage-employees.html';
}
