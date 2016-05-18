Our backend server for our marketplace website

Running the server:
(Note, this has only been tested on windows!)

	Start a new terminal window. 
	Go to marketplace_server directory.
	run "sh start-server-windows.sh"

	Start another terminal window.
	Go to marketplace_server directory.
	run "sh populate-server-windwos.sh"

This will populate the the items collection in the test database with the test-data.json objects.
This will also drop any existing collection named items in the test database.
