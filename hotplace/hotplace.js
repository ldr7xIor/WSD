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
    let currentPage = 0;
    const itemsPerPage = 20;

    function showHotPlaces() {
        hotPlacesDiv.innerHTML = '';
        const start = currentPage * itemsPerPage;
        const end = start + itemsPerPage;
        const placesToShow = hotPlaces.slice(start, end);
    
        placesToShow.forEach((place, index) => {
            const placeDiv = document.createElement('div');
            placeDiv.classList.add('hotPlaceItem'); // 각 항목을 묶는 클래스 추가
    
            const namePara = document.createElement('p');
            namePara.textContent = `${place.name}`;
            namePara.classList.add('placeName'); // 이름에 대한 클래스 추가
            placeDiv.appendChild(namePara);
    
            const typePara = document.createElement('p');
            typePara.textContent = `${place.type}`;
            typePara.classList.add('placeType'); // 종류에 대한 클래스 추가
            placeDiv.appendChild(typePara);
    
            const deleteButton = document.createElement('button');
            deleteButton.id='DelButton'
            deleteButton.textContent = 'x';
            deleteButton.addEventListener('click', (event) => {
                event.stopPropagation();
                deletePlace(start + index);
            });
            placeDiv.appendChild(deleteButton);
    
            placeDiv.addEventListener('click', () => showDetail(start + index));
            hotPlacesDiv.appendChild(placeDiv);
        });
    
        if (hotPlaces.length > end) {
            const nextPageButton = document.createElement('button');
            nextPageButton.id = 'nextpage'
            nextPageButton.textContent = '다음 페이지';
            nextPageButton.classList.add('pagination-button');
            nextPageButton.addEventListener('click', () => {
                currentPage++;
                showHotPlaces();
            });
            hotPlacesDiv.appendChild(nextPageButton);
        }
    
        if (currentPage > 0) {
            const prevPageButton = document.createElement('button');
            prevPageButton.id = 'prevpage'
            prevPageButton.textContent = '이전 페이지';
            prevPageButton.classList.add('pagination-button');
            prevPageButton.addEventListener('click', () => {
                currentPage--;
                showHotPlaces();
            });
            hotPlacesDiv.appendChild(prevPageButton);
        }
    }

    async function initMap(lat = 0, lng = 0) {
        const googleMaps = await google.maps.importLibrary('maps');
        map = new googleMaps.Map(mapDiv, {
            center: { lat, lng },
            zoom: 15
        });
        marker = new google.maps.Marker({
            position: { lat, lng },
            map: map
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

    function deletePlace(index) {
        hotPlaces.splice(index, 1);
        localStorage.setItem('hotPlaces', JSON.stringify(hotPlaces));
        showHotPlaces();
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
