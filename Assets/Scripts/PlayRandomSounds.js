#pragma strict

var sounds : AudioClip[];

var soundPlayer : GameObject;

function Start () {
	SoundLoop();
}

function Update () {

}

function PlaySound () {
	var rand = Random.Range(0, sounds.Length);
	audio.clip = sounds[rand];
	audio.Play();
}

function SoundLoop () {
	while (true) {
		var randomWait = Random.Range(150, 300);
		yield WaitForSeconds(randomWait);
		PlaySound();
		yield;
	}
}

function MyWaitFunction(delay : float) {
	var timer = Time.time + delay;
	while (Time.time < timer){
		yield;
	}
}