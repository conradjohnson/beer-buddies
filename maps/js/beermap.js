// var BMKey = beerMapApi.MY_KEY;
 
function beerSearch() {
    fetch("https://beermapping.com/webservice/locstate/dd603422fbd601248edcb80d08b961b9/co&s=json").then(resp => resp.json())
.then(data=> console.log(data))
}

document.getElementById("beer").addEventListener("click", beerSearch)