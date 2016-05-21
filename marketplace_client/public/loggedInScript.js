var loggedIn = false;
var error = false;

function(user, pass){
	if(user === "User" && pass === "pass"){
		loggedIn = true;
	}else{
		error = true;
	}
}