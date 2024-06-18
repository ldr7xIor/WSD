const songsPerPage = 5;
let currentPage = 1;
let songs = JSON.parse(localStorage.getItem('playlist')) || [];

function showAddForm() {
    document.getElementById('addForm').style.display = 'block';
}

function hideAddForm() {
    document.getElementById('addForm').style.display = 'none';
}

function addSong() {
    const titleInput = document.getElementById('songTitle');
    const artistInput = document.getElementById('songArtist');
    const title = titleInput.value;
    const artist = artistInput.value;

    if (title && artist) {
        songs.push({ title, artist });
        localStorage.setItem('playlist', JSON.stringify(songs));
        renderTable();
        hideAddForm();
        titleInput.value = '';
        artistInput.value = '';
    }
}

function deleteRow(index) {
    songs.splice(index, 1);
    localStorage.setItem('playlist', JSON.stringify(songs));
    renderTable();
}

function renderTable() {
    const tableBody = document.getElementById('playlistBody');
    tableBody.innerHTML = '';
    const start = (currentPage - 1) * songsPerPage;
    const end = start + songsPerPage;
    const paginatedSongs = songs.slice(start, end);

    paginatedSongs.forEach((song, index) => {
        const row = tableBody.insertRow();
        const titleCell = row.insertCell(0);
        const artistCell = row.insertCell(1);
        const deleteCell = row.insertCell(2);
        titleCell.textContent = song.title;
        artistCell.textContent = song.artist;
        deleteCell.innerHTML = `<button onclick="deleteRow(${start + index})">x</button>`;
    });

    renderPagination();
}

function renderPagination() {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';
    const totalPages = Math.ceil(songs.length / songsPerPage);

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        button.onclick = () => {
            currentPage = i;
            renderTable();
        };
        if (i === currentPage) {
            button.style.backgroundColor = 'rgb(255, 112, 101)';
        }
        pagination.appendChild(button);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    renderTable();
});