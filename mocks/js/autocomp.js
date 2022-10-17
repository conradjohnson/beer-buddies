let autocomplete;
function initAutocomplete(){
    autocomplete = new google.maps.places.Autocomplete(
        document.getElementById('autocomplete'),
        {
        //    types:,
            componentRestrictions:{'country':['US']},
      //      fields:
        }
    );
   autocomplete.addListener('place_changed', onPlaceChanged);
}
function onPlaceChanged(){
    var place = autocomplete.getPlace();

    if (!place.geometry){
        //User didn't select a place, reset field
        document.getElementById('autocomplete').placeholder = 'Enter location';
    } else{
        //User did select a place.  Set our hidden input values.
        document.getElementById('#address1-signup').value = "";
        document.getElementById('#address2-signup').value = "";
        document.getElementById('#city-signup').value = "";
        document.getElementById('#state-signup').value = "";
        document.getElementById('#zip-signup').value = "";

    }
}