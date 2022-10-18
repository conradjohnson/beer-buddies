
// function to help us convert line breaks in text entry to '<br/>' for db text storage.
function nl2br (str) {   
  return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1'+ '<br />' +'$2');
}


// event handler for submitting a new blog post.  Will collect and then send the information to our API.
const newPostHandler = async (event) => {
  event.preventDefault();
  
  const title = document.querySelector('#post-title').value.trim();
  const body = nl2br(document.querySelector('#post-body').value.trim());
  const author = document.querySelector('#post-author').value;

  if (title && body && author) {
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({ title, body, author }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to create post');
    }
  }
};

// event handler for the delete blog post command.  Will send this information to the API. 
const delButtonHandler = async (event) => {
  event.preventDefault();
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete project');
    }
  }
};

// event handler for the edit blog post link.  Will send user to a form that can edit the blog post.
const editButtonHandler = async (event) => {
  event.preventDefault();
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');
    if (id){
      document.location.replace(`/edit-post/${id}`);
    } else {
      alert('Cannot find that project to edit');
    }
      
  }
};

const addCommentHandler = async (event) => {
  event.preventDefault();

  const body = await nl2br(document.querySelector('#comment-body').value.trim());
  const post_id = document.querySelector('#post-id').value;
  
  if (body && post_id) {
      const response = await fetch(`/api/posts/${post_id}/comment`, {
        method: 'POST',
        body: JSON.stringify({ body }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to create project');
      }
    }

};

const drankCheckHandler = async(event)=>{
  event.preventDefault();
 
  let beerlist_id = event.target.getAttribute('data-id');
 
  
  
    
    const response = await fetch(`/api/beerlist/${beerlist_id}`, {
      method: 'PUT',
      body: JSON.stringify({ drank:event.target.checked }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      
    } else {
      alert('Failed to create project');
    }
  

}

// drink checklist
const drankChecks = document.querySelectorAll('.drank-check');
for (let i=0; i<drankChecks.length; i++){
  drankChecks[i].addEventListener('change', drankCheckHandler);
}

//event listener for submitting a new blog post.
document
  .querySelector('.new-post-form')
  .addEventListener('submit', newPostHandler);

// event listener for the submit comment button.
if (document.querySelector('.new-comment-form')){
document
  .querySelector('.new-comment-form')
  .addEventListener('submit', addCommentHandler);
}

function showStuff(show, hide) {
  //show this element by id
  document.getElementById(show).style.display = 'block';
  //hide this element by id
  document.getElementById(hide).style.display = 'none';

}

// // event listeners for all of the delete buttons for blog posts.
// const deleteButtons = document.querySelectorAll('.delete-post-button');
// for (let i=0; i< deleteButtons.length; i++){
//   deleteButtons[i].addEventListener('click', delButtonHandler);
// }

// // event listeners for all of the edit buttons for blog posts.
// const editButtons = document.querySelectorAll('.edit-post-button');
// for (let i=0; i< editButtons.length; i++){
//   editButtons[i].addEventListener('click', editButtonHandler);
// }

//for dashboard tabs:
let checklistEl = document.querySelector("#beerChecklist")
let leaderboardEl = document.querySelector("#beerLeaderboard")
let postsEl = document.querySelector("#latestPosts")
let clButtonEl = document.querySelector("#clButton")
let lpButtonEl = document.querySelector("#lpButton")
let lbButtonEl = document.querySelector("#lbButton")

clButtonEl.addEventListener("click", toggleChecklist);
function toggleChecklist() {
    checklistEl.setAttribute("class", "");
    leaderboardEl.setAttribute("class", "hidden");
    postsEl.setAttribute("class", "hidden");
  }
  lpButtonEl.addEventListener("click", togglePost);
function togglePost() {
    checklistEl.setAttribute("class", "hidden");
    leaderboardEl.setAttribute("class", "hidden");
    postsEl.setAttribute("class", "");
  }
  lbButtonEl.addEventListener("click", toggleLeaderboard);
function toggleLeaderboard() {
    checklistEl.setAttribute("class", "hidden");
    leaderboardEl.setAttribute("class", "");
    postsEl.setAttribute("class", "hidden");
  }
  

// Beer API Stuff


const api_key = 'dd603422fbd601248edcb80d08b961b9';
// http://beermapping.com/webservice/locquery/API_KEY/piece


async function getBeerLocs(city_st){
    city_st = encodeURIComponent(city_st);
    let remoteEndPoint2 = `http://beermapping.com/webservice/loccity/${api_key}/${city_st}&s=json`;
    
    let results = await fetch(remoteEndPoint2)
    .then(function (response) {
        if (response.status===200){
            
            return response.json();
        } else {
            
            //const 
            return response.text();
        }

    })
    .then(function (data) {
      
       return data
     })
    return results;
   
    
}

// examples
//getBeerLocs("los angeles,ca");
//getBeerLocs("dallas,tx");
function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

async function getLatLon(address){

  address = encodeURIComponent(address);
  
  let geocoderURL = `https://api.geoapify.com/v1/geocode/search?`;
  geocoderURL += `text=${address}`;
  geocoderURL+= `&apiKey=32ac8da8e41545e2864a4185e4f42472`;
  let latLonString = "";

  let results = await fetch(geocoderURL)
  .then(response => response.json())
  .then(result => {
    console.log(result.features[0])
    latLonString = result.features[0].geometry.coordinates[1] + "," + result.features[0].geometry.coordinates[0];

  }
    )
  .catch(error => console.log('error', error));
  
  // Old Google Geocoder that rate limited us after 1 day of use
  // ************************************************************
  //let geocoder = new google.maps.Geocoder();
  // let result = await geocoder.geocode( {address:address}, function(results, status) 
  // {
  //   if (status == google.maps.GeocoderStatus.OK) 
  //   {
  //     // 
  //     latLonString = `${results[0].geometry.location.lat()},${results[0].geometry.location.lng()}`
  //     sleep(200);
  //     return latLonString;
  //   } else {
  //     alert('Geocode was not successful for the following reason: ' + status);
  //  }
  // })

  return latLonString;
}

async function getMapMarkers(city_st){
    const beerLocs  = await getBeerLocs(city_st);
   
    const beerMarkers = [];
    for (let i=0; i< beerLocs.length; i++){
      let latlon = await getLatLon(`${beerLocs[i].street} ${beerLocs[i].city}, ${beerLocs[i].state}`);
      //latlon = JSON.parse(latlon);
      let latlonArray = latlon.split(",");
      let lat = latlonArray[0];
      let lng = latlonArray[1];
      let latlonObj= {lat, lng};
      let infoWindowContent = `
      <div id="content">
        <h1 id="firstHeading" class="firstHeading">${beerLocs[i].name}</h1>
        <div id="bodyContent">Located at:<br/>
        ${beerLocs[i].street}<br/>
        ${beerLocs[i].city}, ${beerLocs[i].state}<br/>
        <br/>
        URL: <a href="http://${beerLocs[i].url}" target="_blank">${beerLocs[i].url}<br/>

        </div>
      </div>
      `;
      let obj = {
        position: new google.maps.LatLng(lat, lng),
        type: "beer",
        name: beerLocs[i].name,
        street: beerLocs[i].street, 
        city: beerLocs[i].city,
        state: beerLocs[i].state,
        url: beerLocs[i].url,
        infoWindowContent: infoWindowContent,

      }
     
      beerMarkers.push(obj);
    }

    
    return beerMarkers;
}

//Google Maps stuff
let map;

async function initMap() {
  
  let user_cityst_el = document.getElementById('user-citystmap').value;
  let user_cityst = String(user_cityst_el).toLowerCase();
  
  let user_loc = {
    lat: parseFloat(document.getElementById('user-lat').value), 
    lng: parseFloat(document.getElementById('user-lon').value)
  };
 
  map = new google.maps.Map(document.getElementById("map"), {
    center: user_loc,
    zoom: 11
  });

  //lets try to get beer locs from map markers function.
  const mapMarkers = await getMapMarkers(user_cityst);
  
  const iconBase =
    "https://developers.google.com/maps/documentation/javascript/examples/full/images/";
  const icons = {
    beer: {
      icon: "../img/beerlogo_small.png",
    },
    
  };
  const features = mapMarkers;
  
  let marker;
  let infoWindowContent;
  let infoWindow; 
  // Create markers.
  for (let i = 0; i < features.length; i++) {
    
      infoWindow = new google.maps.InfoWindow({
        content: infoWindowContent,
      });
      marker = new google.maps.Marker({
        position: features[i].position,
        icon: icons.beer.icon,
        map: map,
      });
      // marker.addListener("click", () => {
      //   infoWindow.open({
      //     anchor: marker,
      //     map,
      //     shouldFocus: false,
      //   });
      // });
  
      (function (marker) {
        google.maps.event.addListener(marker, "click", function (e) {
            //Wrap the content inside an HTML DIV in order to set height and width of InfoWindow.
            infoWindow.setContent(features[i].infoWindowContent);
            infoWindow.open(map, marker);
        });
    })(marker);

  }
}
function init(){
  //get user location from dashboard
  let location = String(document.querySelector('#user-cityst').value);
  location =  location.toLowerCase();
  let lat = document.querySelector('#user-lat').value;
  let lon = document.querySelector('#user-lon').value;
  window.initMap = initMap;
  //populateAll();
}

init()
