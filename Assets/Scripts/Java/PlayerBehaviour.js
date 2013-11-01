#pragma strict

var screamSound : AudioClip;
public var weepingAngel : GameObject;
public var mainCam : GameObject;

var canScream : boolean;
var isPlayerAlive : boolean;

var fade : float = 0;
var blackTexture : Texture2D;

var script : CharacterMotor;

var scriptTwo : MouseLook;
var scriptThree : MouseLook;

var distanceFromMonster : float;

var screamSource : AudioSource;

var fadeSpeed : float;

var deathMessageStyle : GUIStyle;

function Start () {
	canScream = true;
	isPlayerAlive = true;
	
	script = GetComponent("CharacterMotor");
	scriptTwo = GetComponent("MouseLook");
	scriptThree = mainCam.GetComponent("MouseLook");
}

function Update () {
	distanceFromMonster = Vector3.Distance(transform.position, weepingAngel.transform.position);
	
	if (distanceFromMonster < 1.5 && canScream == true)
	{
  		script.canControl = false;
  		scriptTwo.enabled = false;
  		scriptThree.enabled = false;
  		Scream();
  		isPlayerAlive = false;
  		Screen.lockCursor = false;
  		if (fade > 1)
  		{
  			// Quit Game
  		}
  		return;
	}
}

function OnGUI () {
	GUI.color = new Color(0, 0, 0, fade);
	GUI.depth = 2;
	GUI.DrawTexture( new Rect(0, 0, Screen.width, Screen.height), blackTexture);
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

function Scream () {
	canScream = false;
	weepingAngel.audio.clip = screamSound;
	weepingAngel.audio.Play();
	FadeIn();
}

/*function OnControllerColliderHit(hit: ControllerColliderHit){
	if (hit.gameObject.tag == "Monster"){
  		Scream();
  		isPlayerAlive = false;
  		script.canControl = false;
  		scriptTwo.enabled = false;
  		scriptThree.enabled = false;
  		if (fade == 1)
  		{
  			Application.Quit();
  		}
  		return;
	}
}*/

function Teleport (distance : int) {
	weepingAngel.transform.position = transform.TransformPoint(0, 0, -distance);
	weepingAngel.transform.LookAt(transform.position);
}