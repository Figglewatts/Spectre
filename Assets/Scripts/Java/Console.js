#pragma strict

var consoleTextStyle : GUIStyle;

var cleanTime : float = 5;

function OnGUI () {
	Flush();
}

function WriteLine(line : String)
{
	var x : int = 50;
	var y : int = 400;
	var w : int = Screen.width;
	var h : int = 50;
	
	GUI.BeginGroup(new Rect(x, y, w, h));
	UnityEngine.GUI.Label(Rect(0,0,w,h),line, consoleTextStyle);
	GUI.EndGroup();
}

function Flush()
{
	while (true)
	{
		yield WaitForSeconds(cleanTime);
		for (var k : int; k < 10; k++)
		{
			GUI.color.a -= 0.1;
		}
		yield;
	}
}