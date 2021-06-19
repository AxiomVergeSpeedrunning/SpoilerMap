const websocket_endpoint = "wss://relay.aricodes.net/ws";
var map = document.getElementById("map");

var area1 = document.getElementById("area1");
var area2 = document.getElementById("area2");
var area3 = document.getElementById("area3");
var area4 = document.getElementById("area4");
var area5 = document.getElementById("area5");
var area6 = document.getElementById("area6");
var area7 = document.getElementById("area7");
var area8 = document.getElementById("area8");
var area9 = document.getElementById("area9");

window.onload = function ()
{
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	const username = urlParams.get('username');
	if (username != null) {
		const socket = new WebSocket(websocket_endpoint);
		socket.onopen = () => socket.send(`listen:${username}`);
		socket.onmessage = (event) => appendData(JSON.parse(event.data));
	}
	else {
		let mainContainer = document.getElementById("srtQueryData");
		mainContainer.innerHTML = "Please provide username params to url to listen to.";
	}
}

function appendData(data)
{
	console.log(data);
	SetItems(data);
}

function SetItems(data) 
{
	for(let key in data.RandomItems) 
	{
		let value = data.RandomItems[key];
		if (value.includes("Node") || value.includes("Note"))
		{
  			value = value.replace(/[0-9]/g, '');
		}
		document.getElementById(key).innerHTML = `<img src="images/${value}.svg"/>`;
	}
}