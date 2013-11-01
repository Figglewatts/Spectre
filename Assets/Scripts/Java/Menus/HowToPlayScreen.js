#pragma strict

var windowStyle : GUIStyle;
var buttonStyle : GUIStyle;
var labelStyle : GUIStyle;

var guiSkin : GUISkin;

static var displaySelf : boolean;
static var read : boolean;

var scrollPosition : Vector2;
var scrollViewVector : Vector2 = Vector2.zero;

var windowRectHowTo : Rect = Rect (Screen.width / 2 - 250, Screen.height / 2 - 150, 500, 300);

function Start () {
	windowRectHowTo = Rect (Screen.width / 2 - 250, Screen.height / 2 - 150, 520, 320);
	read = false;
}

function Update () {

}

function OnGUI () {
	if (displaySelf == true) {
		windowRectHowTo = GUI.Window (0, windowRectHowTo, HowToWindow, "How to Play", windowStyle);
	}
}

function HowToWindow(windowID : int) {
	scrollPosition = GUILayout.BeginScrollView (scrollPosition, GUILayout.Width (500), GUILayout.Height (260));
	//vSbarValue = GUI.VerticalScrollbar(Rect (25, 25, 100, 30), vSbarValue, 1.0, 10.0, 0.0);
	GUILayout.Label("The objective of this game is to crack the code.\n" +
"The code cracking window can be accessed with the C key, and once you have " +
"opened it you will see a text field with a button underneath it. To enter in the code " +
"you type in what you think it is, then you press the button underneath the text " +
"field. There are no penalities for an incorrect guess.\n" +
"There will be notes littered around the map, and if you pick these notes up (by " +
"walking close to them, looking at them and clicking the left mouse buton) then you " +
"will be able to read the note. Notes will usually have either a hint upon how to " +
"progress, an image, or part of the code. Therefore, reading the notes is vital if you " +
"want to complete the game.\n" +
"The monster can only move when you are not looking at it, but be warned; If " +
"you look at it for too long then it can and will do unpredictable things.\n" +
"The game is over if the monster gets too close to you or if you have successfully " +
"cracked the code. You will be prompted to either quit the game or return to the " +
"menu once one of the above conditions has been met.\n" +
"You can activate your torch by pressing the F key. This will drain the battery " +
"gauge seen in the top left of the screen. You can refill the battery gauge by finding " +
"boxes of batteries littered around the map. You can pick up a box of batteries " +
"by walking up to it, looking at it and clicking the left mouse button.\n" +
"You can also sprint by pressing and holding LEFT-SHIFT along with a movement " +
"key. This will drain the sprint gauge which is shown below the battery gauge. " +
"You can refill the sprint gauge by not sprinting and regaining your breath.\n" +
"\n" +
"CONTROLS:\n" +
"W, A, S, D - Movement (Forwards, Backwards, Left and Right respectively)\n" +
"SPACE - Jump\n" +
"F - Torch\n" +
"LEFT SHIFT - Sprint\n" +
"C - Code Cracking Window\n" +
"ESC - Pause", labelStyle);
	GUILayout.EndScrollView();
	if (GUILayout.Button("Close", buttonStyle)) {
		displaySelf = false;
		read = true;
	}
}