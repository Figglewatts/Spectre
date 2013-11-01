#pragma strict

var fade : float = 0;
var fadeSpeed : float;

var textStyle : GUIStyle;

var makerspace : Texture2D;

function Start () {
	fade = 0;
	FadeIn();
	Splash();
}

function Update () {

}

function OnGUI () {
	GUIUtility.ScaleAroundPivot(Vector2(Screen.width/1920.0, Screen.height/900.0), Vector2(Screen.width / 2.0, Screen.height / 2.0));
	GUI.color = new Color(255, 255, 255, fade);
	GUI.depth = 1;
	
	GUI.DrawTexture(new Rect((Screen.width / 2) - (makerspace.width / 2), (Screen.height / 2) - (makerspace.height / 2) + 100, makerspace.width, makerspace.height), makerspace);
	GUI.Label(new Rect(0, (Screen.height / 2) - (makerspace.height / 2), Screen.width, 100), "IN ASSOCIATION WITH", textStyle);
}

function Splash () {
	while (true)
	{
		yield WaitForSeconds(3);
		FadeOut();
		ToggleFadeIn();
		yield;
	}
}

function ToggleFadeIn () {
	yield WaitForSeconds(3);
	SplashScreen.CanFadeIn = !SplashScreen.CanFadeIn;
}

function FadeOut () {
	while (true)
	{
		var time : float = 0;
		while (time < fadeSpeed)
		{
			yield;
			fade -= Time.deltaTime / fadeSpeed;
			time += Time.deltaTime;
		}
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
		if (fade > 1) {
			fade = 1;
			yield;
		}
		yield;
	}
}