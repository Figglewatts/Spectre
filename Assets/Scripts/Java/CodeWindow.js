#pragma strict

var codeNumber1 : int;

var codeNumber2 : int;

var codeNumber3 : int;

var codeNumber4 : int;

var codeNumber5 : int;

var codeAsString : String;

var textFieldStyle : GUIStyle;

var canShowWindow : boolean;

var windowRect : Rect;

var stringToEdit : String;
var stringToSend : String;

var player : GameObject;
var cam : GameObject;
var weepingAngel : GameObject;
var graphics : GameObject;

var mouseLook : MouseLook;
var charMotor : CharacterMotor;
var playerFollow : FollowPlayerWhenOOSight;
var camMouseLook : MouseLook;
var charControl : CharacterController;

var followActiveCached : boolean;

var winningScreen : boolean;

var blackTexture : Texture2D;
var deathMessageStyle : GUIStyle;

function Start () {
	codeNumber1 = Random.Range(0, 9);
	codeNumber2 = Random.Range(0, 9);
	codeNumber3 = Random.Range(0, 9);
	codeNumber4 = Random.Range(0, 9);
	codeNumber5 = Random.Range(0, 9);
	
	codeAsString = codeNumber1.ToString() + codeNumber2.ToString() + codeNumber3.ToString() + codeNumber4.ToString() + codeNumber5.ToString();
	
	mouseLook = GetComponent(MouseLook);
	charMotor = GetComponent(CharacterMotor);
	charControl = GetComponent(CharacterController);
	
	playerFollow = weepingAngel.GetComponent(FollowPlayerWhenOOSight);
	
	camMouseLook = cam.GetComponent(MouseLook);
	
	windowRect = Rect ((Screen.width / 2), (Screen.height / 2), 150, 75);
	
	canShowWindow = false;
	
	winningScreen = false;
}

function Update () {
	if (Input.GetButtonDown("Code Cracker")) {
		if(canShowWindow == false){
        	followActiveCached = playerFollow.followActive;
            playerFollow.followActive = false;
            canShowWindow = true;
            player.GetComponent(MouseLook).enabled = false;
            cam.GetComponent(MouseLook).enabled = false;
            Screen.lockCursor = false;
        }
        else {
        	if (followActiveCached == true) {
        		playerFollow.followActive = true;
        	}
        	if (followActiveCached == false) {
        		playerFollow.followActive = false;
        	}
            playerFollow.followActive = false;
            canShowWindow = false;
            player.GetComponent(MouseLook).enabled = true;
            cam.GetComponent(MouseLook).enabled = true;
            Screen.lockCursor = true;
        }
        /*if(canShowWindow == true){
        	if (followActiveCached == true) {
        		playerFollow.followActive = true;
        	}
        	if (followActiveCached == false) {
        		playerFollow.followActive = false;
        	}
            playerFollow.followActive = false;
            canShowWindow = false;
            player.GetComponent(MouseLook).enabled = true;
            cam.GetComponent(MouseLook).enabled = true;
            Screen.lockCursor = true;
        }*/
	}
}

function OnGUI () {
	GUI.depth = 2;
	if (canShowWindow) {
		windowRect = GUI.Window (0, windowRect, EnterCodeWindow, "Crack the Code");
	}
	GUI.depth = 0;
	if (winningScreen) {
		GUI.DrawTexture( new Rect(0, 0, Screen.width, Screen.height), blackTexture);
		GUI.Label(new Rect(0, Screen.height / 2, Screen.width, 50), "You Cracked the Code!", deathMessageStyle);
		if (GUI.Button(new Rect((Screen.width / 2) - 100, (Screen.height / 2) + 50, 200, 50), "Main Menu")) {
			Application.LoadLevel(0); // Load the main menu
		}
		if (GUI.Button(new Rect((Screen.width / 2) - 100, (Screen.height / 2) + 120, 200, 50), "Quit Game")) {
			Application.Quit(); // Quit the game
		}
	}
}

function EnterCodeWindow (windowID : int) {
	stringToEdit = GUILayout.TextField (stringToEdit, 5, textFieldStyle);
	if(GUILayout.Button("Enter")) {
		stringToSend = stringToEdit;
		if (stringToSend == codeAsString) {
			winningScreen = true;
		}
		else {
			Debug.Log("Incorrect code!");
		}
	}
}