const clientId = 'OZATO4USDMG5ZYJMKY54YTK4Y2TPDWK34PSUG3GIV0RULAXP';
const clientSecret = 'OSXQJ50AFX20J2HNOHKFGPWKVVNYNSP13IOGOB5YETXLPLR4';
const url = 'https://api.foursquare.com/v2/venues/explore?near=';

// OpenWeather Info
const openWeatherKey = '7d20a5895a38a13dcdbb647529a3d4ca';
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather';
//5 day forecast
const openWeatherKey1 = '8c8a69668bf6a4341f61a3bf5e833bbd';
const weatherUrl1 = 'https://api.openweathermap.org/data/2.5/forecast';
//background
const weatherUrl2='http://api.openweathermap.org/data/2.5/air_pollution/forecast'
// Page Elements
const $input = $('#city');
const $submit = $('#button');
const $png =$('#pngImage');
const $destination = $('#destination');
const $container = $('.container');
const $container0 = $('.container0');
const $container1 = $('.container1');
const $container2 = $('.container2');
const $container3 = $('.container3');
const $venueDivs = [ $('#venue1'), $('#venue2'), $('#venue3'), $('#venue4'),$('#venue5'),$('#venue6'),$('#venue7'),$('#venue8')];
const $weatherDiv = $('#weather1');
const $weatherDiv1= $('#weather2');
const $weatherDiv2= $('#weather3');
const $weatherDiv3= $('#weather4');
const $weatherDiv4= $('#weather5');
const $weatherDiv5= $('#weather6');
const $weatherDiv12= $('#weather25');
const $myElement2=$("#myElement");
const $myElement3=$("#myElement1");
const $new=$('#w1');
const $new1=$('#a1');
const $new2=$('#p1');
const $new3=$('#w2');
const $new4=$('#w3');
const $new5=$('#a2');
const $new6=$('#p2');
const $back1=$('#back');
const $click1=$('#click2');
const $click11=$('#click11');
const weekDays = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ];
const monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];

// Function to fetch weather data from OpenWeatherMap API
   async function fetchWeatherData(city) {

      const url = `https://api.openweathermap.org/data/2.5/weather?q=${$input.val()}&appid=${openWeatherKey1}`;

      try {
        const response = await fetch(url);
        const data = await response.json();

        if (response.ok) {
          // Extract longitude and latitude from the weather data
          const longitude = data.coord.lon;
          const latitude = data.coord.lat;

          // Fetch pollution data using the latitude and longitude
          const pollutionData = await fetchPollutionData(latitude,longitude);

       return { longitude, latitude, pollutionData };
        } else {
          throw new Error(`Failed to fetch weather data: ${data.message}`);
        }
      } catch (error) {
        console.error(error);
      }
    }

    // Function to fetch pollution data from OpenWeatherMap API
    async function fetchPollutionData(latitude, longitude) {
      const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key
      const url = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=${openWeatherKey1}`;

      try {
        const response = await fetch(url);
        const data = await response.json();

        if (response.ok) {
          // Extract pollution data
          const aqi = data.list[0].main.aqi;
          const pm2_5 = data.list[0].components.pm2_5;
          const pm10 = data.list[0].components.pm10;
          const so2 = data.list[0].components.so2;
          const no2 = data.list[0].components.no2;
          const co = data.list[0].components.co;
          const o3 = data.list[0].components.o3;

          return { aqi, pm2_5, pm10, so2, no2, co, o3 };
        } else {
          throw new Error(`Failed to fetch pollution data: ${data.message}`);
        }
      } catch (error) {
        console.error(error);
      }
    }

    // Function to handle form submission
    function handleSubmit() {
      const city = document.getElementById('cityInput').value;
      fetchWeatherData(city)
        .then(({ longitude, latitude, pollutionData }) => {
          document.getElementById('result').innerHTML = 
		  `Longitude: ${longitude}<br>
		  Latitude: ${latitude}<br>
		  AQI: ${pollutionData.aqi}<br>
		  PM2.5: ${pollutionData.pm2_5}<br>
		  PM10: ${pollutionData.pm10}<br>
		  SO2: ${pollutionData.so2}<br>
		  NO2: ${pollutionData.no2}<br>
		  CO: ${pollutionData.co}<br>
		  O3: ${pollutionData.o3}`;
        })
        .catch(error => {
          console.error(error);
          document.getElementById('result').innerHTML = 'Error: ' + error.message;
        });
    }

const getVenues = async () => {
	const city = $input.val();
	const urlToFetch = `${url}${city}&limit=10&client_id=${clientId}&client_secret=${clientSecret}&v=20180101`;
	// add try and catch
	try {
		const response = await fetch(urlToFetch);
		if (response.ok) {
			const jsonResponse = await response.json();
			const venues = jsonResponse.response.groups[0].items.map((item) => item.venue);
			console.log(venues);
			return venues;
		}
	} catch (error) {
		console.log(error);
	}
};
$(document).ready(function() {
	if ("geolocation" in navigator) {
	  navigator.geolocation.getCurrentPosition(function(position) {
		var latitude = position.coords.latitude;
		var longitude = position.coords.longitude;
		$(document).ready(function(){
			var originalHref = $("#click2").attr("href");
			$("#click2").click(function(){
				var userInput = $input.val();
				var newHref = originalHref.replace("dir/", "dir/" + latitude+","+longitude+ "/" + userInput);
				$(this).attr("href", newHref);
			  });
			});
	  });
	} else {
	  $("#location").text("Geolocation is not supported by your browser.");
	}
  });
  $(document).ready(function() {
	if ("geolocation" in navigator) {
	  navigator.geolocation.getCurrentPosition(function(position) {
		var latitude = position.coords.latitude;
		var longitude = position.coords.longitude;
			$(document).ready(function(){
				var originalHref1 = $("#click11").attr("href");
			  $("#click11").click(function(){
				  var userInput1 = $input.val();
				  var newHref1 = originalHref1.replace("dir/", "dir/" + latitude+","+longitude+ "/" + userInput1);
				  $(this).attr("href", newHref1);
				});
			  });
	  });
	} else {
	  $("#location").text("Geolocation is not supported by your browser.");
	}
  });
// get Data from OpenWeather
const getForecast = async () => {
	const urlToFetch = `${weatherUrl}?&q=${$input.val()}&APPID=${openWeatherKey}`;
	try {
		const response = await fetch(urlToFetch);
		if (response.ok) {
			const jsonResponse = await response.json();
			return jsonResponse;
		}
	} catch (error) {
		console.log(error);
	}
};
const get5dayForecast = async () => {
	const urlToFetch = `${weatherUrl1}?&q=${$input.val()}&appid=${openWeatherKey1}`;
	try {
		const response = await fetch(urlToFetch);
		if (response.ok) {
			const jsonResponse = await response.json();
			return jsonResponse;
		}
	} catch (error) {
		console.log(error);
	}
};

// Render functions
const renderVenues = (venues) => {
	$venueDivs.forEach(($venue, index) => {
		const venue = venues[index];
		const venueIcon = venue.categories[0].icon;
		const venueImgSrc = `${venueIcon.prefix}bg_64${venueIcon.suffix}`;
		let venueContent = createVenueHTML(venue.name, venue.location, venueImgSrc,index);
			$venue.append(venueContent);
	});
	$destination.append(`<h2>${venues[0].location.city}</h2>`);
};
/*const renderbackground = (backg) => {
	const backgroundContent = createWeatherHTML3(backg);
	$back1.append( backgroundContent);
};*/
const renderForecast12= (day1) => {
	const weatherContent12 = createWeatherHTML12(day1);
	$weatherDiv12.append(weatherContent12);
};
const renderForecast = (day) => {
	const weatherContent = createWeatherHTML(day);
	$weatherDiv.append(weatherContent);
};
const renderForecast1 = (day1) => {
	const weatherContent1 = createWeatherHTML1(day1);
	$weatherDiv1.append(weatherContent1);
};
const renderForecast2 = (day2) => {
	const weatherContent2 = createWeatherHTML2(day2);
	$weatherDiv2.append(weatherContent2);
};
const renderForecast3 = (day3) => {
	const weatherContent3 = createWeatherHTML3(day3);
	$weatherDiv3.append(weatherContent3);
};
const renderForecast4 = (day4) => {
	const weatherContent4 = createWeatherHTML4(day4);
	$weatherDiv4.append(weatherContent4);
};
const renderForecast5 = (day5) => {
	const weatherContent5 = createWeatherHTML5(day5);
	$weatherDiv5.append(weatherContent5);
};

const executeSearch4 = () => {
	$container1.remove();
	$container2.remove();
	$container.remove();
	$(document).ready(function() {
		$container0.append($container3);
	  });
	$new4.click(executeSearch1);
    $new5.click(executeSearch2);
    $new6.click(executeSearch3);
	$png.click(executeSearch5);
	return false;
};
const executeSearch1 = () => {
	//$container.empty();
	$container1.remove();
	$container2.remove();
	$container3.remove();
	//$container.css('visibility', 'hidden');
	$(document).ready(function() {
		//$destination.remove();
		//$container0.append($destination);
		$container0.append($container);
    
		//$container0.append($weatherDiv);
	  });

	$container.css('visibility', 'visible');
	$weatherDiv.empty();
	$weatherDiv1.empty();
	$weatherDiv2.empty();
	$weatherDiv3.empty();
	$weatherDiv4.empty();
	$weatherDiv5.empty();
	getForecast().then((forecast) => renderForecast(forecast));
	get5dayForecast().then((weather) => renderForecast1(weather));
	get5dayForecast().then((weather2) => renderForecast2(weather2));
	get5dayForecast().then((weather3) => renderForecast3(weather3));
	get5dayForecast().then((weather4) => renderForecast4(weather4));
	get5dayForecast().then((weather5) => renderForecast5(weather5));
	//$weatherDiv.remove();
	return false;
}
const executeSearch5 = () => {
	$(document).ready(function() {
		function openConverterSection() {
		  var converterSection = '<div class="converter">' +
			'<div class="close">&#x2716;</div>' +
			'<h1 class="close1">Currency Converter</h1>' +
			'<input type="text" id="amount" placeholder="Enter amount">' +
			'<select id="fromCountry"></select>' +
			'<select id="toCountry"></select>' +
			'<button id="convert">Convert</button>' +
			'<div id="result8"></div>' +
			'</div>';
  
			$png.after(converterSection);
  
		  $('.converter').draggable(); 
  
		  $png.off('click'); 
  
		 
		   var countryCurrencyMap = {
			"United States": "USD",
			"Canada": "CAD",
			"United Kingdom": "GBP",
			"AFGHANISTAN":"AFN",
		  "ALBANIA":"ALL",
   "ALGERIA":"DZD",
   "AMERICAN SAMOA":"USD",
   "ANDORRA":"EUR",
   "ANGOLA":"AOA",
   "ANGUILLA":"XCD",
   "ANTIGUA AND BARBUDA	":"XCD",
   "ARGENTINA":"ARS",
   "ARMENIA":"AMD",
   "ARUBA":"AWG",
   "AUSTRALIA":"AUD",
   "AUSTRIA":"EUR",
   "AZERBAIJAN":"AZN",
   "BAHAMAS":"BSD",
   "BAHRAIN":"BHD",
   "BANGLADESH":"BDT",
   "BARBADOS":	"BBD",
	"BELARUS":"BYN",
   "BELGIUM":"EUR",
   "BELIZE":"BZD",
   "BENIN":"XOF",
   "BERMUDA":"BMD",
   "BHUTAN":"BTN",
   "BHUTAN":"INR",
   "BOLIVIA (PLURINATIONAL STATE OF)":"BOB",
   "BOLIVIA (PLURINATIONAL STATE OF)":"BOV",
   "BONAIRE, SINT EUSTATIUS AND SABA":"USD",
   "BOSNIA AND HERZEGOVINA":"BAM",
   "BOTSWANA":"BWP",
   "BOUVET ISLAND":"NOK",
   "BRAZIL":"BRL",
   "BRITISH INDIAN OCEAN TERRITORY (THE)":"USD",
   "BRUNEI DARUSSALAM":"BND",
   "BULGARIA":"BGN",
   "BURKINA FASO":"XOF",
   "BURUNDI":"BIF",
   "CABO VERDE":"CVE",
   "CAMBODIA":"KHR",
   "CAMEROON":"XAF",
   "CANADA":	"CAD",
   "CAYMAN ISLANDS (THE)":"KYD",
   "CENTRAL AFRICAN REPUBLIC (THE)":"XAF",
   "CHAD":"XAF",
   "CHILE":"CLF",
   "CHILE":"CLP",
   "CHINA":"CNY",
   "CHRISTMAS ISLAND":"AUD",
   "COCOS (KEELING) ISLANDS (THE)":"AUD",
   "COLOMBIA":"COP",
   "COLOMBIA":"COU",
   "COMOROS (THE)":"KMF",
   "CONGO (THE DEMOCRATIC REPUBLIC OF THE)":"CDF",
   "CONGO (THE)":"XAF",
   "COOK ISLANDS (THE)":"NZD",
   "COSTA RICA	Costa":"CRC",
   "CROATIA":"HRK",
   "CUBA":"CUC",
   "CUBA":"CUP",
   "CURAÇAO":"ANG",
   "CYPRUS":"EUR",
   "CZECH REPUBLIC (THE)":"CZK",
   "DENMARK":"DKK",
   "DJIBOUTI":"DJF",
   "DOMINICA":"XCD",
   "DOMINICAN REPUBLIC (THE)":"DOP",
   "ECUADOR":"USD",
   "EGYPT":"EGP",
   "EL SALVADOR":"SVC",
   "EL SALVADOR":"USD",
   "EQUATORIAL GUINEA": "XAF",
   "ERITREA": "ERN",
   "ESTONIA": "EUR",
   "ETHIOPIA": "ETB",
   "EUROPEAN UNION": "EUR",
   "FALKLAND ISLANDS (THE) [MALVINAS]": "FKP",
   "FAROE ISLANDS (THE)": "DKK",
   "FIJI": "FJD",
   "FINLAND": "EUR",
   "FRANCE": "EUR",
   "FRENCH GUIANA": "EUR",
   "FRENCH POLYNESIA": "XPF",
   "FRENCH SOUTHERN TERRITORIES (THE)": "EUR",
   "GABON": "XAF",
   "GAMBIA (THE)": "GMD",
   "GEORGIA": "GEL",
   "GERMANY": "EUR",
   "GHANA": "GHS",
   "GIBRALTAR": "GIP",
   "GREECE": "EUR",
   "GREENLAND": "DKK",
   "GRENADA": "XCD",
   "GUADELOUPE": "EUR",
   "GUAM": "USD",
   "GUATEMALA": "GTQ",
   "GUERNSEY": "GBP",
   "GUINEA": "GNF",
   "GUINEA-BISSAU": "XOF",
   "GUYANA": "GYD",
   "HAITI": "HTG",
   "HEARD ISLAND AND McDONALD ISLANDS": "AUD",
   "HOLY SEE (THE)": "EUR",
   "HONDURAS": "HNL",
   "HONG KONG": "HKD",
   "HUNGARY": "HUF",
   "ICELAND": "ISK",
   "INDIA": "INR",
   "INDONESIA": "IDR",
   "INTERNATIONAL MONETARY FUND (IMF)": "XDR",
   "IRAN (ISLAMIC REPUBLIC OF)": "IRR",
   "IRAQ": "IQD",
   "IRELAND": "EUR",
   "ISLE OF MAN":"GBP",
   "ISRAEL": "ILS",
   "ITALY": "EUR",
   "JAMAICA": "JMD",
   "JAPAN": "JPY",
   "JERSEY": "GBP",
   "JORDAN": "JOD",
   "KAZAKHSTAN": "KZT",
   "KENYA": "KES",
   "KIRIBATI": "AUD",
   "KOREA (THE DEMOCRATIC PEOPLE'S REPUBLIC OF)": "KPW",
   "KOREA (THE REPUBLIC OF)": "KRW",
   "KUWAIT": "KWD",
   "KYRGYZSTAN": "KGS",
   "LAO PEOPLE'S DEMOCRATIC REPUBLIC (THE)": "LAK",
   "LATVIA": "EUR",
   "LEBANON": "LBP",
   "LESOTHO": "LSL",
   "LIBERIA": "LRD",
   "LIBYA": "LYD",
   "LIECHTENSTEIN": "CHF",
   "LITHUANIA": "EUR",
   "LUXEMBOURG": "EUR",
   "MACAO": "MOP",
   "MADAGASCAR": "MGA",
   "MALAWI": "MWK",
   "MALAYSIA": "MYR",
   "MALDIVES": "MVR",
   "MALI": "XOF",
   "MALTA": "EUR",
   "MARSHALL ISLANDS (THE)": "USD",
   "MARTINIQUE": "EUR",
   "MAURITANIA": "MRU",
		  };
  
		  // Populate the select options with country names
		  for (var country in countryCurrencyMap) {
			$('#fromCountry').append('<option value="' + country + '">' + country + '</option>');
			$('#toCountry').append('<option value="' + country + '">' + country + '</option>');
		  }
  
		  $('#convert').click(function() {
			var amount = $('#amount').val();
			var fromCountry = $('#fromCountry').val();
			var toCountry = $('#toCountry').val();
  
			var fromCurrency = countryCurrencyMap[fromCountry];
			var toCurrency = countryCurrencyMap[toCountry];
  
			// Make the API call to retrieve exchange rate
			$.ajax({
			  url: 'https://api.exchangerate-api.com/v4/latest/USD',
			  dataType: 'json',
			  success: function(data) {
				var rates = data.rates;
				var fromRate = rates[fromCurrency];
				var toRate = rates[toCurrency];
				var conversionRate = toRate / fromRate;
				var result = amount * conversionRate;
				$('#result8').html(amount + ' ' + fromCurrency + ' = ' + result.toFixed(2) + ' ' + toCurrency);
			  },
			  error: function() {
				$('#result8').html('An error occurred while fetching the exchange rate.');
			  }
			});
		  });
  
		  $('.close').click(function() {
			$(this).parent().remove();
			$png.on('click', function() {
			  openConverterSection();
			});
		  });
		}
  
		$png.on('click', function() {
		  openConverterSection();
		});
	  });
	return false;
}
const executeSearch2 = () => {
	$container.remove();
	$container2.remove();
	$container3.remove();
	$(document).ready(function() {
		$container0.append($container1);
	  });
	 $venueDivs.forEach((venue) => venue.empty());
	$container1.css('visibility', 'visible');
	getVenues().then((venues) => renderVenues(venues));
	//$container.add();
	return false;
}
const executeSearch3 = () => {
	$container.remove();
	$container1.remove();
	$container3.remove();
	$destination.remove();
	$(document).ready(function() {
		$container0.append($container2);
	  });
	$container2.css('visibility', 'visible');

}
const executeSearch = () => {
	$container1.toggle();
	$container2.toggle();
	$container.toggle();
	$container1.remove();
	$container2.remove();
	$container.remove();
	return false;
};
$submit.click(executeSearch);
$new.click(executeSearch1);
$new1.click(executeSearch2);
$new2.click(executeSearch3);
$new3.click(executeSearch4);
$new4.click(executeSearch1);
$new5.click(executeSearch2);
$new6.click(executeSearch3);
$png.click(executeSearch5);