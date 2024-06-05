document.addEventListener('DOMContentLoaded', function () {
    const params = new URLSearchParams(window.location.search);
    const name = params.get('name');
    const category = params.get('category');
    const latitude = parseFloat(params.get('lat'));
    const longitude = parseFloat(params.get('lng'));

    document.getElementById('placeName').textContent = name;
    document.getElementById('placeCategory').textContent = category;

    const map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: latitude, lng: longitude},
        zoom: 15
    });

    new google.maps.Marker({
        position: {lat: latitude, lng: longitude},
        map: map,
        title: name
    });
});
