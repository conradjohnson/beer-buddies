
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
  alert(event.target.checked);
  
  
    alert("Beer List Check" + beerlist_id)
    const response = await fetch(`/api/beerlist/${beerlist_id}`, {
      method: 'PUT',
      body: JSON.stringify({ drank:event.target.checked }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.reload();
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
document
  .querySelector('.new-comment-form')
  .addEventListener('submit', addCommentHandler);



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
    
    await fetch(remoteEndPoint2)
    .then(function (response) {
        if (response.status===200){
            //console.log(response.body);
            return response.json();
        } else {
            console.log('here:' + response.text());
            //const 
            return response.text();
        }

    })
   
    
}

// examples
//getBeerLocs("los angeles,ca");
//getBeerLocs("dallas,tx");

async function getLatLon(address){
  let geocoder = new google.maps.Geocoder();
  geocoder.geocode( {address:address}, function(results, status) 
  {
    if (status == google.maps.GeocoderStatus.OK) 
    {
      return results[0].geometry.location;
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
   }
  })
}

async function getMapMarkers(city_st){
    let beerLocs = await getBeerLocs(city_st);
    console.log('beer locs!' + beerLocs);
    
    for (let i=0; i< beerLocs.length; i++){
      let latlon = await getLatLon(`${element.street} ${element.city}, ${element.state}`);
      console.log(latlon);
    }

    //first, get the lat/lon of the city/st combo. 
      // beerLocs = beerLocs.map((element)=>{
        
      //   console.log(latlon);
      // });
    return beerLocs;
}

//Google Maps stuff
let map;

async function initMap() {
  console.log("here:");
  let user_cityst_el = document.getElementById('user-citystmap').value;
  let user_cityst = String(user_cityst_el).toLowerCase();
  console.log("here:"+user_cityst);
  
  console.log(user_cityst);
  let user_loc = {
    lat: parseFloat(document.getElementById('user-lat').value), 
    lng: parseFloat(document.getElementById('user-lon').value)
  };
  console.log("latlongparsed" + user_loc.lat + user_loc.lng);
  map = new google.maps.Map(document.getElementById("map"), {
    center: user_loc,
    zoom: 10
  });

  //lets try to get beer locs from map markers function.
  const mapMarkers = await getMapMarkers(user_cityst);
  console.log(mapMarkers);
  const iconBase =
    "https://developers.google.com/maps/documentation/javascript/examples/full/images/";
  const icons = {
    beer: {
      icon: "../img/beerlogo_small.png",
    },
    library: {
      icon: iconBase + "library_maps.png",
    },
    info: {
      icon: iconBase + "info-i_maps.png",
    },
  };
  const features = [
    {
      position: new google.maps.LatLng(-33.91721, 151.2263),
      type: "info",
    },
    {
      position: new google.maps.LatLng(-33.91539, 151.2282),
      type: "info",
    },
    {
      position: new google.maps.LatLng(-33.91747, 151.22912),
      type: "info",
    },
    {
      position: new google.maps.LatLng(-33.9191, 151.22907),
      type: "info",
    },
    {
      position: new google.maps.LatLng(-33.91725, 151.23011),
      type: "info",
    },
    {
      position: new google.maps.LatLng(-33.91872, 151.23089),
      type: "info",
    },
    {
      position: new google.maps.LatLng(-33.91784, 151.23094),
      type: "info",
    },
    {
      position: new google.maps.LatLng(-33.91682, 151.23149),
      type: "info",
    },
    {
      position: new google.maps.LatLng(-33.9179, 151.23463),
      type: "info",
    },
    {
      position: new google.maps.LatLng(-33.91666, 151.23468),
      type: "info",
    },
    {
      position: new google.maps.LatLng(-33.916988, 151.23364),
      type: "info",
    },
    {
      position: new google.maps.LatLng(-33.91662347903106, 151.22879464019775),
      type: "beer",
    },
    {
      position: new google.maps.LatLng(-33.916365282092855, 151.22937399734496),
      type: "beer",
    },
    {
      position: new google.maps.LatLng(-33.91665018901448, 151.2282474695587),
      type: "beer",
    },
    {
      position: new google.maps.LatLng(-33.919543720969806, 151.23112279762267),
      type: "beer",
    },
    {
      position: new google.maps.LatLng(-33.91608037421864, 151.23288232673644),
      type: "beer",
    },
    {
      position: new google.maps.LatLng(-33.91851096391805, 151.2344058214569),
      type: "beer",
    },
    {
      position: new google.maps.LatLng(-33.91818154739766, 151.2346203981781),
      type: "beer",
    },
    {
      position: new google.maps.LatLng(-33.91727341958453, 151.23348314155578),
      type: "library",
    },
  ];

  // Create markers.
  for (let i = 0; i < features.length; i++) {
    const marker = new google.maps.Marker({
      position: features[i].position,
      icon: icons[features[i].type].icon,
      map: map,
    });
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
