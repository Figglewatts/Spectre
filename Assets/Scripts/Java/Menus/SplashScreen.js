#pragma strict

var fade : float = 0;
var fadeSpeed : float;

var textStyle : GUIStyle;

var uncoded : Texture2D;

var mainCamera : GameObject;

static var CanFadeIn : boolean;

function Start () {
	mainCamera.audio.volume = 0;
	fade = 0;
	//WaitForMakerspace();
	FadeIn();
	Splash();
}

function Update () {

}

function OnGUI () {
	GUIUtility.ScaleAroundPivot(Vector2(Screen.width/1920.0, Screen.height/900.0), Vector2(Screen.width / 2.0, Screen.height / 2.0));
	GUI.color = new Color(255, 255, 255, fade);
	GUI.depth = 1;
	
	GUI.DrawTexture(new Rect((Screen.width / 2) - (uncoded.width / 2), (Screen.height / 2) - (uncoded.height / 2), uncoded.width, uncoded.height), uncoded);
	GUI.Label(new Rect(0, (Screen.height / 2) + (uncoded.height / 2) + 50, Screen.width, 400), "CREATION SOFTWORKS PRESENTS", textStyle);
}

function WaitForMakerspace () {
	while (true)
	{
		yield WaitForSeconds(10);
		FadeIn();
		yield;
	}
}

function Splash () {
	while (true)
	{
		if (CanFadeIn)
		{
			yield WaitForSeconds(3);
			FadeOut();
			FadeInAudio(10);
			yield;
		}
		yield;
	}
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
		if (CanFadeIn)
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
		yield;
	}
}

function FadeInAudio (speed : float) {
	while (true)
	{
		var time : float = 0;
		while (time < speed)
		{
			yield;
			mainCamera.audio.volume += Time.deltaTime / speed;
			time += Time.deltaTime;
		}
		yield;
	}
}