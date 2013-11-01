#pragma strict

var player : GameObject;
var cam : GameObject;

var weepingAngel : GameObject;

var pauseVisible : boolean;

var blackTexture : Texture2D;

var playerPos : Vector3;

var follow : FollowPlayerWhenOOSight;
var motor : CharacterMotor;
var headsUpDisplay : HUD;
var mouseX : MouseLook;
var mouseY : MouseLook;

var followActiveCached : boolean;

function Start () {
	follow = weepingAngel.GetComponent(FollowPlayerWhenOOSight);
	motor = player.GetComponent(CharacterMotor);
	headsUpDisplay = player.GetComponent(HUD);
	
	mouseX = player.GetComponent(MouseLook);
	mouseY = cam.GetComponent(MouseLook);
}

function Update () {
	//Screen.lockCursor = true;
	if (Input.GetButtonDown("Pause")){
		playerPos = player.transform.position;
        if(pauseVisible == false){
            //Time.timeScale = 0;
            headsUpDisplay.canDrain = false;
            motor.canControl = false;
            followActiveCached = follow.followActive;
            follow.followActive = false;
            pauseVisible = true;
            mouseX.enabled = false;
            mouseY.enabled = false;
            Screen.lockCursor = false;
        } 
    }
}

function OnGUI () {
	if (pauseVisible == true)
	{
		GUI.color.a = 0.6;
		GUI.DrawTexture(new Rect(0, 0, Screen.width, Screen.height), blackTexture);
		GUIUtility.ScaleAroundPivot(Vector2(Screen.width/1920.0, Screen.height/900.0), Vector2(Screen.width/2, Screen.height/2));
		GUI.color.a = 1;
		if (GUI.Button(new Rect((Screen.width / 2) - 100, 300, 200, 76), "RESUME"))
		{
			Screen.lockCursor = true;
            headsUpDisplay.canDrain = true;
            motor.canControl = true;
            follow.followActive = followActiveCached;
            player.transform.position = playerPos;
            //Time.timeScale = 1.0;
            pauseVisible = false;
            mouseX.enabled = true;
            mouseY.enabled = true;
		}
		if (GUI.Button(new Rect((Screen.width / 2) - 100, 400, 200, 76), "SETTINGS"))
		{
			SettingsScreen.displaySelf = true;
		}
		if (GUI.Button(new Rect((Screen.width / 2) - 100, 500, 200, 76), "QUIT"))
		{
			Application.Quit();
		}
	}
	else 
	{
		//Screen.lockCursor = true;
	}
}