var firstClicked = true;

function joinRoom(){
	var roomID = document.getElementById("join_roomid").value;
	var message = "Hello! Welcome to Room " + roomID + "!";
	alert(message);

	window.location.href = 'userPage.html?id=' + roomID + "&flag=user";
}

function createRoom(){
	var roomID = document.getElementById("create_roomid").value;
	//var transbox_1 = document.getElementsByClassName("transbox")[0];
	//var transbox_2 = document.getElementsByClassName("transbox")[1];
	//var tooltip = document.getElementsByClassName("tooltip")[0];

	if(firstClicked){
		var message = "You have successfully created Room " + roomID + "! Please Log in with your Spotify account.";
		alert(message);
		
		var button = document.getElementsByClassName("button")[1];
		button.innerText = "Login with Spotify";
		button.style.background = "green";
		button.style.color = "white";
		button.style.fontSize = "24px";
		button.style.opacity = "0.9";

		firstClicked = false;
	}
	else{
		alert("Log in with Spotify.")
		//transbox_1.style.visibility = 'hidden';
		//transbox_2.style.visibility = 'hidden';
		//tooltip.style.visibility = 'hidden';
		//transbox_2.style.visibility = 'hidden';
		window.location.href = 'userPage.html?id=' + roomID + "&flag=host";
	}	
}

