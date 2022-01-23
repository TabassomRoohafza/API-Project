let covid19data;

fetchLatestCOVID19Data();
setChange();


// Fetch COVID 19 Data
 async function fetchLatestCOVID19Data()
{
    await fetch("https://covid-193.p.rapidapi.com/statistics", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "covid-193.p.rapidapi.com",
            "x-rapidapi-key": "cadcef84admsh17bc89d8484d203p1b2399jsna67c4f44fcda"
            }
        })
    .then(response => response.json())
    .then(response => {
       createSelectElement(response);
       console.log(response);
    })
    .catch(err => {
        console.log(err);
    });
}

function createSelectElement(response){  

    // add all countries to select element
    response.response.forEach(c => {
        const option = document.createElement('option');
        option.innerHTML = c.country;
        document.getElementById('countries').appendChild(option);
    })

    //sort select element
    sortSelect(document.getElementById('countries'))

    //add "Select a country" option
    document.getElementById('countries').innerHTML = ` 
                                                        <option>
                                                            &nbsp; Select a country &nbsp; 
                                                            </option>
                                                    ` + document.getElementById('countries').innerHTML;

    // save covid data to global variable
    covid19data = response.response;
}


// check any changes in the select element
function setChange()
{
    document.getElementById('countries').onchange = function() {
        const selectedValue = document.getElementById('countries').value;
        const countryData = covid19data.filter(c => c.country == selectedValue)[0];

        // display data
        const newConfirmed = document.getElementById('covidNewConfirmed');
        const totalConfirmed = document.getElementById('covidTotalConfirmed');
        const covidNewDeaths = document.getElementById('covidNewDeaths');
        const covidTotalDeaths = document.getElementById('covidTotalDeaths');
        const lastUpdated = document.getElementById('covidLastUpdate');

        (countryData.cases.new) ? newConfirmed.innerHTML = 'New confirmed cases: ' + countryData.cases.new : newConfirmed.innerHTML = 'New confirmed cases: 0';
        (countryData.cases.total) ? totalConfirmed.innerHTML = 'Total confirmed cases: ' + countryData.cases.total : totalConfirmed.innerHTML = 'Total confirmed cases: 0';
        (countryData.deaths.new) ? covidNewDeaths.innerHTML = 'New deaths: ' + countryData.deaths.new : covidNewDeaths.innerHTML = 'New deaths: 0';
        (countryData.deaths.total) ? covidTotalDeaths.innerHTML = 'Total deaths: ' + countryData.deaths.total : covidTotalDeaths.innerHTML = 'Total deaths: 0';
        lastUpdated.innerHTML = 'Last updated: ' + countryData.day;
    };
}


//sort select element
function sortSelect(selElem) {
    var tmpAry = new Array();
    for (var i=0;i<selElem.options.length;i++) {
        tmpAry[i] = new Array();
        tmpAry[i][0] = selElem.options[i].text;
        tmpAry[i][1] = selElem.options[i].value;
    }
    tmpAry.sort();
    while (selElem.options.length > 0) {
        selElem.options[0] = null;
    }
    for (var i=0;i<tmpAry.length;i++) {
        var op = new Option(tmpAry[i][0], tmpAry[i][1]);
        selElem.options[i] = op;
    }
    return;
}