#pragma strict

var buttonStyle : GUIStyle;

var blackTexture : Texture2D;

var windowStyle : GUIStyle;

static var displaySelf : boolean;

var scrollPosition : Vector2;

var windowRectSettings : Rect = Rect (Screen.width / 2 - 250, Screen.height / 2 - 150, 500, 300);

var mainCamera : GameObject;
var player : GameObject;

var musicSliderValue : float;
var soundSliderValue : float;

var headBobbing : HeadBob;
var devConsole : DevMode;

var smoothJazz : boolean;
var smoothJazzString : String;
var smoothJazz01 : AudioClip;
var smoothJazz02 : AudioClip;
var smoothJazz03 : AudioClip;

var atmosMusic01 : AudioClip;
var atmosMusic02 : AudioClip;
var atmosMusic03 : AudioClip;

var dynamicMusic : GameObject;
var atmosphericMusic : AtmosphericMusicChanger;

function Start () {
	windowRectSettings = Rect (Screen.width / 2 - 250, Screen.height / 2 - 150, 500, 320);
	
	headBobbing = mainCamera.GetComponent(HeadBob);
	devConsole = player.GetComponent(DevMode);
	atmosphericMusic = dynamicMusic.GetComponent(AtmosphericMusicChanger);
}

function Update () {
	mainCamera.audio.volume = GlobalVariables.musicVolume;
	
	if(smoothJazz == true)
	{
		atmosphericMusic.atmosphericMusic[0] = smoothJazz01;
		atmosphericMusic.atmosphericMusic[1] = smoothJazz02;
		atmosphericMusic.atmosphericMusic[2] = smoothJazz03;
		PlayerPrefsX.SetBool("Smooth Jazz", true);
	}
	else
	{
		atmosphericMusic.atmosphericMusic[0] = atmosMusic01;
		atmosphericMusic.atmosphericMusic[1] = atmosMusic02;
		atmosphericMusic.atmosphericMusic[2] = atmosMusic03;
		PlayerPrefsX.SetBool("Smooth Jazz", false);
	}
}

function OnGUI () {
	if (displaySelf == true) {
		windowRectSettings = GUI.Window (0, windowRectSettings, SettingsWindow, "Settings");
	}
}

function SettingsWindow(windowID : int) {
	scrollPosition = GUILayout.BeginScrollView (scrollPosition, GUILayout.Width (480), GUILayout.Height (260));
	GUILayout.Label("Volume");
	GlobalVariables.soundVolume = GUILayout.HorizontalSlider(GlobalVariables.soundVolume, 0.0, 1.0);
	headBobbing.enableHeadBob = GUILayout.Toggle(headBobbing.enableHeadBob, "Enable Head Bobbing");
	devConsole.consoleEnabled = GUILayout.Toggle(devConsole.consoleEnabled, "Enable Dev Console");
	smoothJazz = GUILayout.Toggle(smoothJazz, "Enable Smooth Jazz Mode");
	GUILayout.EndScrollView();
	if (GUILayout.Button("Close")) {
		AudioListener.volume = GlobalVariables.soundVolume;
		displaySelf = false;
	}
}