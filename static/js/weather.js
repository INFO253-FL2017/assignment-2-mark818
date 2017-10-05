function populate(data) {
	data = JSON.parse(data);
	var loc = document.getElementById('location');
	var temp = document.getElementById('temperature');
	var pres = document.getElementById('pressure');
	if (data === 'Error') {
		loc.innerHTML = 'Error';
		temp.innerHTML = 'Error';
		pres.innerHTML = 'Error';
		return;
	}
	loc.innerHTML = 'City:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + data['name'];
	temp.innerHTML = 'Temperature:&nbsp;&nbsp;&nbsp;' + (data['main']['temp'] - 273.15).toFixed(1) + ' &#8451';
	pres.innerHTML = 'Pressure:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + data['main']['pressure'] + ' hPa';
}

function getData() {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', 'http://api.openweathermap.org/data/2.5/weather?id=5327684&APPID=87ec39f9feb79c125c994f933a9b70e1', true);
	xhr.onload = function(e) {
		if (xhr.readyState === 4) {
		    if (xhr.status === 200) {
		      	populate(xhr.responseText);
		    } else {
		      	populate('Error');
		    }
	  	}
	};
	xhr.send(null);
}


getData();

