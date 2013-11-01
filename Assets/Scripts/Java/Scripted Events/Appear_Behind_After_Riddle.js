#pragma strict

var weepingAngel : GameObject;

function Start () {
	weepingAngel.renderer.active = false;
}

function Update () {

}

function OnTriggerEnter (other : Collider) {
    weepingAngel.renderer.active = true;
}