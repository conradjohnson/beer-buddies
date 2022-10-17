
//const xml2json = require('./xmltojson');
const xml2json = require('xml2js').parseString;
const fs = require('fs');

const api_key = 'dd603422fbd601248edcb80d08b961b9';
// http://beermapping.com/webservice/locquery/API_KEY/piece

const writeFile = async (data, filename) => {

    // set the directory 
    let fileDir = '';

    // append that to the filename
    fileName = fileDir + filename;

     // first clear out the old file
    fs.writeFile(fileName, '', ()=>{})
    
    // write our data to the cleared out file.
    fs.appendFile(fileName, data, (err) =>

    // Ternary operator to log an error or success.
    err ? console.error(err) : console.log('\x0A\x0AYour HTML Team Page team.html is ready in /dist directory!\x0A\x0A')
   );

    return true;
}




async function getBeerLocs(city_st){
    city_st = encodeURIComponent(city_st);
    let remoteEndPoint2 = `http://beermapping.com/webservice/loccity/${api_key}/${city_st}&s=json`;
    
    await fetch(remoteEndPoint2)
    .then(function (response) {
        if (response.status===200){
            return response.json();
        } else {
            console.log('here:' + response.text());
            //const 
            return response.text();
        }

    })
    .then((data)=>console.log(data));
    
}

//getBeerLocs("los angeles, ca");
getBeerLocs("dallas,tx");
getBeerLocs("plano,tx");