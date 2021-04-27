// Global Variables

const zip = document.getElementById('zip');
const feeling = document.getElementById('feelings');
const generate = document.getElementById('generate');
const form = document.getElementById("form");


// Create New Date 
let d = new Date();
let newDate = d.getMonth() +1 +'-'+d.getDate()+'-'+d.getFullYear();

// Personal API Key for OpenWeatherMap API
const baseURL = "http://api.openweathermap.org/data/2.5/forecast?zip=" //524901&appid={API key}
const apiKey = "&appid=9e1bdc7671c097b6ba1d69c1e4061a91&units=metric";

// Event listener to add function to existing HTML DOM element
form.addEventListener('submit', getData)
/* Function called by event listener */
function getData(e){ 
    let newZip = zip.value;
    console.log(newZip);
    let newFeeling = feeling.value;
    console.log(newFeeling);
    getWeather(baseURL, newZip, apiKey)
        .then(function(data) {
            console.log(data);
            postData('/add', {city: data.city.name, date: newDate, temperature: data.list[0].main.temp, content: newFeeling});
            updateUi();
        })
    e.preventDefault();
}
/* Function to GET Web API Data*/
const getWeather = async (baseURL, zip, key) => {
    const result = await fetch(baseURL+zip+key)
        try {
            const data = await result.json();
            return data
        }catch(error) {
            console.log("error", error);
        }
    
}
/* Function to POST data */
 const postData = async (url = '', data = {})=> {
    console.log(data);
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }); 
    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    }catch(error) {
        console.log("Error", error);
    }
}

/* Function to GET Project Data */

const  updateUi = async () => {
    const getProjectData = await fetch('/all');
    try {
        const allData = await getProjectData.json();
        document.getElementById('city').innerHTML =  `🏙️ ${allData.city} 🏙️`;
        document.getElementById('date').innerHTML =  ` ${allData.date} `;
        document.getElementById('temp').innerHTML =  ` ${allData.temperature} °C `;
        document.getElementById('content').innerHTML =  ` ${allData.content} `;
    }catch (error) {
        console.log('Error :', error);
    }
}