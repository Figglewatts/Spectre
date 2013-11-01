#pragma strict

var stringToEdit : String;
var stringToSend : String;

static var consoleVisible : boolean;

var player : GameObject;
var cam : GameObject;
var weepingAngel : GameObject;
var graphics : GameObject;

var mouseLook : MouseLook;
var charMotor : CharacterMotor;
var freeCam : FlyCam;
var playerFollow : FollowPlayerWhenOOSight;
var playerBehaviour : PlayerBehaviour;
var camMouseLook : MouseLook;
var headsUpDisplay : HUD;
var charControl : CharacterController;
var DaySky : Material;
var NightSky : Material;
var DayFogCol : Color;
var NightFogCol : Color;
var daySunStrength : float;
var sun : Light;
var startupParams : String[];

var followActiveCached : boolean;

var consoleEnabled : boolean = true;

function Start () {
	mouseLook = GetComponent(MouseLook);
	charMotor = GetComponent(CharacterMotor);
	freeCam = graphics.GetComponent(FlyCam);
	charControl = GetComponent(CharacterController);
	headsUpDisplay = player.GetComponent(HUD);
	
	playerFollow = weepingAngel.GetComponent(FollowPlayerWhenOOSight);
	playerBehaviour = player.GetComponent(PlayerBehaviour);
	
	camMouseLook = cam.GetComponent(MouseLook);
	
	freeCam.enabled = false;
	
	CheckStartupParams();
	
	consoleEnabled = true;
}

function Update () {
	if( Input.GetKeyDown( KeyCode.BackQuote ) ){
        if(consoleVisible == false){
        	followActiveCached = playerFollow.followActive;
            playerFollow.followActive = false;
            consoleVisible = true;
            player.GetComponent(MouseLook).enabled = false;
            cam.GetComponent(MouseLook).enabled = false;
            Screen.lockCursor = false;
        }
    }
    if (Input.GetKeyDown( KeyCode.Return ) && consoleVisible == true) {
        consoleVisible = false;
        player.GetComponent(MouseLook).enabled = true;
        cam.GetComponent(MouseLook).enabled = true;
        
        if (followActiveCached == true) {
        	playerFollow.followActive = true;
        }
        if (followActiveCached == false) {
        	playerFollow.followActive = false;
        }
        
        Screen.lockCursor = true;
        
        stringToEdit = stringToSend;
        
        CheckCommands(stringToSend);
    }
}

function OnGUI () {
	if (consoleEnabled) {
		if (consoleVisible == true) {
			stringToSend = GUI.TextField (Rect (10, Screen.height - 50, Screen.width - 10, 20), stringToSend, 25);
		}
	}
}

function CheckStartupParams () {
	for (var param : String in startupParams) {
		CheckCommands(param);
	}
}

function CheckCommands(command : String) {
	if (command == "freecam") {
		mouseLook.enabled = true;
		charMotor.enabled = false;
		camMouseLook.enabled = true;
		charControl.enabled = false;
		freeCam.enabled = true;
	}
	if (command == "playercam") {
		mouseLook.enabled = true;
		charMotor.enabled = true;
		camMouseLook.enabled = true;
		charControl.enabled = true;
		freeCam.enabled = false;
	}
	if (command == "fog") {
		RenderSettings.fog = !RenderSettings.fog;
	}
	if (command == "lights on") {
		RenderSettings.fogColor = DayFogCol;
		RenderSettings.skybox = DaySky;
		sun.intensity = daySunStrength;
	}
	if (command == "lights off") {
		RenderSettings.fogColor = NightFogCol;
		RenderSettings.skybox = NightSky;
		sun.intensity = 0;
	}
	if (command == "follow toggle") {
		playerFollow.followActive = !playerFollow.followActive;
	}
	if (command == "infinite sprint") {
		headsUpDisplay.infiniteSprint = !headsUpDisplay.infiniteSprint;
	}
	if (command == "monster teleport") {
		playerBehaviour.Teleport(-10);
	}
	if (command == "infinite torch") {
		headsUpDisplay.canDrain = !headsUpDisplay.canDrain;
	}
}