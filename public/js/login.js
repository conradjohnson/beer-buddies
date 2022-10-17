const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace('/dashboard');
    } else {
      alert('here!');
      alert(response.statusText);
    }
  }
};

const signupFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#name-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const username = document.querySelector('#username-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();
  const address1 = document.querySelector('#address1-signup').value.trim();
  const city = document.querySelector('#city-signup').value.trim();
  const state = document.querySelector('#state-signup').value.trim();
  const zip = document.querySelector('#zip-signup').value.trim();

  alert(` address1 ${address1}
          address2 ${address2}
          city ${city}
          state ${state}
          zip ${zip}`);

  console.log(name+email+password+username);
  if (name && email && password && username) {
    console.log('all passed!')
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ name, email, username, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    console.log('here again!')
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);



// autocomplete API Stuff for address prediction.
let autocomplete;
let address1Field;
let address2Field;
let postalField;

function initAutocomplete(){

    address1Field = document.querySelector("#address1-signup");
    cityField = document.querySelector("#city-signup");
    stateField = document.querySelector("#state-signup");
    zipField = document.querySelector("#zip-signup");

    autocomplete = new google.maps.places.Autocomplete(
        document.getElementById('autocomplete'),
        {
            types:["address"],
            componentRestrictions:{'country':['US']},
            fields:['address_components', 'geometry']
        }
    );
   autocomplete.addListener('place_changed', onPlaceChanged);
}


function onPlaceChanged(){
    var place = autocomplete.getPlace();
    let addr1 = "";
    let city = "";
    let st = "";
    let zip = "";

    alert('changed!');
    if (!place.geometry){
      alert("notgeo");
        //User didn't select a place, reset field
        document.getElementById('autocomplete').placeholder = 'Enter location';
    } else{
      for (const component of place.address_components ) {
      const componentType = component.types[0];
      switch (componentType) {
        case "street_number": {
          addr1 = `${component.long_name}`;
          break;
        }
  
        case "route": {
          addr1 += component.short_name;
          break;
        }
  
        case "postal_code": {
          zip = `${component.long_name}`;
          break;
        }
        case "locality": {
          city = `${component.long_name}`;
          break;

        }
        case "administrative_area_level_1": {
          st = `${component.short_name}`;
          break;
        }
  
       
      }
    }
  
    address1Field.value = addr1;
    cityField.value = city;
    stateField.value = st;
    zipField.value = zip;

    }
}
