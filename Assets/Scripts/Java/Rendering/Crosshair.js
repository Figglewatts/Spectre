#pragma strict

var crossHairTexture : Texture2D;
var handTexture : Texture2D;

enum crossHairImage { normal, hand }

var image : crossHairImage;

var mainCamera : Camera;

function Start () {

}

function Update () {
	var hit : RaycastHit;
	if (Physics.Raycast(mainCamera.ScreenPointToRay(new Vector2(Screen.width / 2, Screen.height / 2)),  hit, 4))
	{
		if (hit.rigidbody && !hit.rigidbody.isKinematic)
		{
			image = crossHairImage.hand;
		}
		else {
			image = crossHairImage.normal;
		}
	}
}

function OnGUI () {
	GUIUtility.ScaleAroundPivot(Vector2(Screen.width/1920.0, Screen.height/900.0), Vector2(Screen.width/2, Screen.height/2));
	switch (image)
	{
		case (crossHairImage.hand):
			GUI.DrawTexture(new Rect((Screen.width + handTexture.width) / 2, 
				(Screen.height + handTexture.height) / 2, 
				handTexture.width, handTexture.height), handTexture);
			break;
		case (crossHairImage.normal):
			GUI.DrawTexture(new Rect((Screen.width + crossHairTexture.width) / 2, 
				(Screen.height + crossHairTexture.height) / 2, 
				crossHairTexture.width, crossHairTexture.height), crossHairTexture);
			break;
	}
}