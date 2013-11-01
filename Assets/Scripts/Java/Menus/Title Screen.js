#pragma strict

var titleStyle : GUIStyle;
var buttonStyle : GUIStyle;
var uncodedStyle : GUIStyle;
var boxStyle : GUIStyle;

var fade : float = 0;
var fadeSpeed : float;

function Start () {
	WaitForSplash();
}

function Update () {

}

function OnGUI () {
	GUIUtility.ScaleAroundPivot(Vector2(Screen.width/1920.0, Screen.height/900.0), Vector2(Screen.width / 2.0, 0.0));
	GUI.color = new Color(255, 255, 255, fade);
	GUI.depth = 3;

	GUI.Label(new Rect((Screen.width / 2) - 200, 100, 400, 200), "SPECTRE", titleStyle);
	if (GUI.color.a >= 0.1) {
		if (HowToPlayScreen.read == true)
		{
			if (GUI.Button(new Rect((Screen.width / 2) - 100, 300, 200, 75), "NEW GAME", buttonStyle))
			{
		        NewGameScreen.displaySelf = true;
		    }
	    }
	    else
	    {
	    	GUI.Box(new Rect((Screen.width / 2) - 100, 300, 200, 75), "Read HOW TO PLAY first");
	    	GUI.enabled = false;
	    	if (GUI.Button(new Rect((Screen.width / 2) - 100, 300, 200, 75), "NEW GAME", buttonStyle))
			{
		        NewGameScreen.displaySelf = true;
		    }
		    GUI.enabled = true;
	    }
	    if (GUI.Button(new Rect((Screen.width / 2) - 100, 400, 200, 75), "HOW TO PLAY", buttonStyle))
	    {
	        HowToPlayScreen.displaySelf = true;
	    }
	    /*if (GUI.Button(new Rect((Screen.width / 2) - 100, 400, 200, 75), "ACHIEVEMENTS", buttonStyle))
	    {
	        AchievementScreen.displaySelf = true;
	    }
	    
	    if (GUI.Button(new Rect((Screen.width / 2) - 100, 500, 200, 75), "OPTIONS", buttonStyle))
	        Debug.Log("Clicked the button with text");
	    */
	    if (GUI.Button(new Rect((Screen.width / 2) - 100, 500, 200, 75), "QUIT", buttonStyle))
	        Application.Quit();
    }
    GUI.Label(new Rect((Screen.width) - 400, (Screen.height) - 50, 400, 50), "Made by Sam Gibson", uncodedStyle);
}

function WaitForSplash () {
	while(true)
	{
		yield WaitForSeconds(10);
		FadeIn();
		yield;
	}
}

function FadeIn () {
	while (true)
	{
		var time : float = 0;
		while (time < fadeSpeed)
		{
			yield;
			fade += Time.deltaTime / fadeSpeed;
			time += Time.deltaTime;
		}
		yield;
	}
	
}