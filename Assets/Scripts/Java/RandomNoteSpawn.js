#pragma strict

var positionListRaw : GameObject[];

var positionList = new Array();

var noteList : GameObject[];

function Start () {
	positionList = positionListRaw;
	
	GenerateRandomSpawn();
}

function GenerateRandomSpawn () {
	for (var note : GameObject in noteList) {
		var rand = Random.Range(0, positionList.length-1);
		
		note.transform.position = positionListRaw[rand].transform.position;
		note.transform.rotation = positionListRaw[rand].transform.rotation;
		
		positionList.RemoveAt(rand);
		
		positionListRaw = positionList;
	}
}