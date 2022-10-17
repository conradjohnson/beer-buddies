
const xml2json = require("./xmltojson");


const api_key = 'dd603422fbd601248edcb80d08b961b9';
// http://beermapping.com/webservice/locquery/API_KEY/piece

async function getBeerLocs(city_st){
    city_st = encodeURIComponent(city_st);
    let remoteEndPoint2 = `http://beermapping.com/webservice/loccity/${api_key}/${city_st}&s=json`;
    
    await fetch(remoteEndPoint2)
    .then(function (response) {
        if (response.status===200){
            // console.log(response.xml2json())
            console.log(xml2json(response.json()))
           return response.xml2json();
        } else {
            console.log('here:' + response.text());
            //const 
            return response.text();
        }

    })
    .then((data)=>console.log(data));
    
}

getBeerLocs("los angeles,ca") ;
getBeerLocs("dallas,tx");
getBeerLocs("plano,tx");