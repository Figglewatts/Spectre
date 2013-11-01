#pragma strict

static var displaySelf : boolean;

var buttonStyle : GUIStyle;
var windowStyle : GUIStyle;

var windowRect : Rect = Rect (Screen.width / 2 - 250, Screen.height / 2 - 150, 500, 300);

function Start () {
	windowRect = Rect (Screen.width / 2 - 250, Screen.height / 2 - 150, 500, 300);
}

function Update () {
	
}

function OnGUI () {
	if (displaySelf == true) {
		windowRect = GUILayout.Window (1, windowRect, DoMyWindow, "Achievements");
	}
}

function DoMyWindow(windowID : int) {
	for (var achievement in AchievementList.achievements) {
		GUILayout.Label(achievement.achievName);
	}
}