document.addEventListener('DOMContentLoaded', () => {
    const addHotPlaceButton = document.getElementById('addHotPlace');
    const newHotPlaceForm = document.getElementById('newHotPlaceForm');
    const savePlaceButton = document.getElementById('savePlace');
    const cancelPlaceButton = document.getElementById('cancelPlace');
    const hotPlacesDiv = document.getElementById('hotPlaces');
    const hotPlaceDetailPage = document.getElementById('hotPlaceDetailPage');
    const hotPlacePage = document.getElementById('hotPlacePage');
    const backToHotPlaceListButton = document.getElementById('backToHotPlaceList');
    const detailName = document.getElementById('detailName');
    const detailType = document.getElementById('detailType');
    const mapDiv = document.getElementById('map');
    let map, marker;

    let hotPlaces = JSON.parse(localStorage.getItem('hotPlaces')) || [];

    function showHotPlaces() {
        hotPlacesDiv.innerHTML = '';
        hotPlaces.forEach((place, index) => {
            const placeDiv = document.createElement('div');
            placeDiv.textContent = `${place.name} (${place.type})`;
            placeDiv.addEventListener('click', () => showDetail(index));
            hotPlacesDiv.appendChild(placeDiv);
        });
    }

    function showDetail(index) {
        const place = hotPlaces[index];
        detailName.textContent = place.name;
        detailType.textContent = place.type;
        hotPlacePage.classList.add('hidden');
        hotPlaceDetailPage.classList.remove('hidden');
        initMap(place.lat, place.lng);
    }

    function initMap(lat = 0, lng = 0) {
        map = new google.maps.Map(mapDiv, {
            center: { lat, lng },
            zoom: 15
        });
        marker = new google.maps.Marker({
            position: { lat, lng },
            map: map
        });
    }

    addHotPlaceButton.addEventListener('click', () => {
        newHotPlaceForm.classList.remove('hidden');
    });

    savePlaceButton.addEventListener('click', () => {
        const placeName = document.getElementById('placeName').value;
        const placeType = document.getElementById('placeType').value;
        const latitude = parseFloat(document.getElementById('latitude').value);
        const longitude = parseFloat(document.getElementById('longitude').value);

        if (placeName && placeType && !isNaN(latitude) && !isNaN(longitude)) {
            hotPlaces.push({ name: placeName, type: placeType, lat: latitude, lng: longitude });
            localStorage.setItem('hotPlaces', JSON.stringify(hotPlaces));
            showHotPlaces();
            newHotPlaceForm.classList.add('hidden');
            document.getElementById('placeName').value = '';
            document.getElementById('placeType').value = '';
            document.getElementById('latitude').value = '';
            document.getElementById('longitude').value = '';
        } else {
            alert('Please fill in all fields correctly.');
        }
    });

    cancelPlaceButton.addEventListener('click', () => {
        newHotPlaceForm.classList.add('hidden');
        document.getElementById('placeName').value = '';
        document.getElementById('placeType').value = '';
        document.getElementById('latitude').value = '';
        document.getElementById('longitude').value = '';
    });

    backToHotPlaceListButton.addEventListener('click', () => {
        hotPlaceDetailPage.classList.add('hidden');
        hotPlacePage.classList.remove('hidden');
    });

    showHotPlaces();
});
