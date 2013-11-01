#pragma strict

var buttonStyle : GUIStyle;
var loadingTextStyle : GUIStyle;
var forestContent : GUIContent;
var mineContent : GUIContent;
var randomContent : GUIContent;

var blackTexture : Texture2D;

var windowStyle : GUIStyle;

var guiSkin : GUISkin;

static var displaySelf : boolean;

var scrollPosition : Vector2;

var loadLevel : boolean;

var windowRectNewGame : Rect = Rect (Screen.width / 2 - 250, Screen.height / 2 - 150, 500, 300);

function Start () {
	windowRectNewGame = Rect (Screen.width / 2 - 250, Screen.height / 2 - 150, 500, 320);
	loadLevel = false;
}

function Update () {

}

function OnGUI () {
	if (displaySelf == true) {
		windowRectNewGame = GUI.Window (0, windowRectNewGame, NewGameWindow, "New Game", windowStyle);
	}
	if (loadLevel == true) {
		GUI.DrawTexture(new Rect (0, 0, Screen.width, Screen.height), blackTexture);
		GUI.Label(new Rect (0, 0, Screen.width, Screen.height), "LOADING...", loadingTextStyle);
	}
}

static function LoadLevel (index : int) {
	Application.LoadLevel(index);
}

function NewGameWindow(windowID : int) {
	scrollPosition = GUILayout.BeginScrollView (scrollPosition, GUILayout.Width (480), GUILayout.Height (260));
	if(GUILayout.Button(forestContent, buttonStyle)){
		LoadLevel(1);
		loadLevel = true;
		displaySelf = false;
	}
	GUI.enabled = false;
	if(GUILayout.Button(mineContent, buttonStyle)){
		//Mine level load code (RHYMING) here
	}
	if(GUILayout.Button(randomContent, buttonStyle)){
		//Random level load code (MOAR RHYMING) here
	}
	GUI.enabled = true;
	GUILayout.EndScrollView();
	if (GUILayout.Button("Close", buttonStyle)) {
		displaySelf = false;
	}
}