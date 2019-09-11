const status = document.querySelector('#status');

if(navigator.geolocation){
	status.textContent = 'Locating…';
	navigator.geolocation.getCurrentPosition(getLocation, notWorking); //get position and then run getLocation if successful
}else{
	//false
	alert('cant find you');
}

//if position is found
function getLocation(position){
	var geolatitude = position.coords.latitude;
	var geolongitude = position.coords.longitude;
	var accuracy = position.coords.accuracy;
	
	//use reverse geocoding api (locationiq) to find closest city and display it
		var settings = {
			"async": true,
			"crossDomain": true,
			"url": "https://us1.locationiq.com/v1/reverse.php?key=ac68e8373122cd&lat="+geolatitude+"&lon="+geolongitude+"&format=json",
			"method": "GET"
	}

	$.ajax(settings).done(function (response) {
		console.log(response);
		//console.log("city = " + response.address.city);
		status.textContent = ' ';
		var wya = response.address.city;
		
		$("#location").append(wya);
		document.getElementById("location").style.font = "bold 69px Comic Sans MS"
	});
	
	//use weather api (open Weather Map) to get info about current temperature
	var actualtemp = {
			"async": true,
			"crossDomain": true,
			"url": "https://api.openweathermap.org/data/2.5/weather?lat="+geolatitude+"&lon="+geolongitude+"&appid=69a3d6abb35dc2f311e0100ad045c726",
			"method": "GET"
	}
	
	$.ajax(actualtemp).done(function (res) {
		console.log(res);
		$("#condition").append(res.weather[0].main);
		document.getElementById("condition").style.font = "25px Comic Sans MS"
		//decide background on condition
		if(res.weather[0].main == "Rain"){
			document.body.style.background = "url('https://live.staticflickr.com/8149/7631665052_c4ab0e02f4_b.jpg')";
			document.body.style.backgroundRepeat = "repeat-y";
			document.body.style.backgroundSize = "cover";
		}else if(res.weather[0].main == "Clear"){
			document.body.style.background = "url('https://live.staticflickr.com/8425/7735290254_0455f0d404_b.jpg')";
			document.body.style.backgroundRepeat = "repeat-y";
			document.body.style.backgroundSize = "cover";
		}else if(res.weather[0].main == "Snow"){
			document.body.style.background = "url('https://media1.tenor.com/images/b06e8b72c154df595c5f989337c7d06b/tenor.gif?itemid=5045846')";
			document.body.style.backgroundRepeat = "repeat-y";
			document.body.style.backgroundSize = "cover";
		}else if(res.weather[0].main == "Extreme"){
			document.body.style.background = "url('https://timedotcom.files.wordpress.com/2017/09/hurricane-categories.jpg')";
			document.body.style.backgroundRepeat = "repeat-y";
			document.body.style.backgroundSize = "cover";
		}else if(res.weather[0].main == "Clouds"){
			document.body.style.background = "url('http://ohauitiweather.co.nz/forecast/javascript-premium-weather-widget/bins/assets/bg-cloudy-day.jpg')";
			document.body.style.backgroundRepeat = "repeat-y";
			document.body.style.backgroundSize = "cover";
		}
		
		//convert from K to F
		var fahr = res.main.temp;
		fahr = ((fahr - 273.15)*(9/5)) + 32;
		$("#temp").append(Math.trunc(fahr)+"°F");
		document.getElementById("temp").style.font = "bold 80px Comic Sans MS";
			
		
		

	});
	
	const proxy =  "https://cors-anywhere.herokuapp.com/";
	const apiurl = "https://api.darksky.net/forecast/f7348fde19eac3785a3e370a952d290a/"+geolatitude+","+geolongitude;
	
	
	//changed json request format to use a CORS proxy and avoid 'No Access-Control-Allow-Origin header'
	var current = {
			"async": true,
			"crossDomain": true,
			"url": proxy+apiurl,
			"method": "GET"
	}

	$.ajax(current).done(function (resp) {
		console.log(resp);
		var apparent = resp.currently.apparentTemperature;
		$("#appar").append(apparent);
		document.getElementById("feelslabel").style.font = "bold 20px Comic Sans MS";
		document.getElementById("appar").style.font = "bold 80px Comic Sans MS";
	});
}

function notWorking(error){
	alert('ERROR(' + error.code + '): ' + error.message);
}