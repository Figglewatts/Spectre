#pragma strict

static var achievements : Achievement[];
var livingOnAPrayerIMG : Texture2D;

function Start () {
	achievements[0].achievName = "Living on a Prayer";
	achievements[0].achievDesc = "Woooooooah, we're half way there...";
	achievements[0].achievGoal = "Uncover half of the truth";
	achievements[0].achievImg = livingOnAPrayerIMG;
}

function Update () {

}