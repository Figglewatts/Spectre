#pragma strict

var blackTexture : Texture2D;
var fadeBlack : float = 1;
var fadeSpeed : float;

function Start () {
	IntroSequence();
}

function Update () {

}

function IntroSequence () {
	while (true)
	{
		yield WaitForSeconds(10);
		FadeOut();
	}
}

function OnGUI () {
	GUI.color = new Color(255, 255, 255, fadeBlack);
	GUI.depth = 2;
	GUI.DrawTexture( new Rect(0, 0, Screen.width, Screen.height), blackTexture);
}

function FadeOut () {
	while (true)
	{
		var time : float = 0;
		while (time < fadeSpeed)
		{
			yield;
			fadeBlack -= Time.deltaTime / fadeSpeed;
			time += Time.deltaTime;
		}
		yield;
	}
}