public var skyDome : GameObject;
var player : GameObject;

function Update () {

	skyDome.transform.position.x = player.transform.position.x;
	skyDome.transform.position.y = player.transform.position.y - 20;
	skyDome.transform.position.z = player.transform.position.z;

}