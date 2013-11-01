#pragma strict

var _distanceStatue : GameObject;
private var DistanceStatue : GameObject;
var arrow : GameObject;
var spawnPoint : GameObject;

function Start () {
	var rand = Random.Range(0, 99);
	if (rand > 70)
	{
		DistanceStatue = Instantiate(_distanceStatue, spawnPoint.transform.position, arrow.transform.rotation);
		DistanceStatue.name = _distanceStatue.name;
	}
	GameObject.Destroy(arrow);
}

function Update () {

}