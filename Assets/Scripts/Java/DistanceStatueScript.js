#pragma strict

var minDistance : float; //assign in inspector

var minMinDistance : float; // minumum potential value for distance
var maxMinDistance : float; // maximum potential value for distance

var player : GameObject;

var disSound : AudioClip;

var graphic : GameObject;

var distanceFromPlayer : float;

function Start () {
	player = GameObject.Find("Player");
	distanceFromPlayer = 100;
	minDistance = Random.Range(minMinDistance, maxMinDistance);
	Disappear();
}

function Update () {
	distanceFromPlayer = Vector3.Distance(transform.position, player.transform.position);
}

function Disappear () {
	while (true) {
		if(distanceFromPlayer < minDistance) {
			audio.clip = disSound;
			audio.Play();
			graphic.renderer.enabled = false;
			yield WaitForSeconds(disSound.length);
			Destroy(transform.gameObject);
			yield;
		}
		yield;
	}
}