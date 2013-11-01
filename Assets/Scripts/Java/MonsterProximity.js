#pragma strict
var distanceFromPlayer : float; 	// The monster's distance from the player
var proximityDistance : float;  	// The distance from which the texture will begin to be drawn
var distance : float;				// The distance when the player is inside the proximity radius
var minimumProximity : float;		// The distance at which the volume/alpha will equal the maximum value

var guiAlphaLevel : float;			// The alpha of the texture to be drawn

var monster : GameObject;			// The monster
var player : GameObject;			// The player

var proximityTexture : Texture2D;	// The texture to draw when the monster is close
var proximitySound : AudioClip;		// The sound to play when the monster is close

private var kVolume : float;		// Used in inverse proportionality
private var kAlpha : float;			// Used in inverse proportionality
private var kVolumePreCalc : float;
private var kAlphaPreCalc : float;

var maxVolumePreCalc : float;
var maxAlphaPreCalc : float;
private var maxVolume : float;		// Maximum potential volume
private var maxAlpha : float;		// Maximum potential alpha

function Start () {
	// Begin playing the proximity sound
	audio.clip = proximitySound;
	audio.Play();
	
	// Initialize variables
	//maxVolumePreCalc = 1;
	//maxAlphaPreCalc = 1;
	
	//var tempYAlpha = maxAlpha + (kAlpha * minimumProximity);
	//var tempYVolume = maxVolume + (kVolume * minimumProximity);
	
	
	
	// Calculate the values for k
	kVolumePreCalc = (maxVolumePreCalc / (proximityDistance));
	kAlphaPreCalc = (maxAlphaPreCalc / (proximityDistance));
	
	maxVolume = maxVolumePreCalc + (kVolumePreCalc / minimumProximity);
	maxAlpha = maxAlphaPreCalc + (kVolumePreCalc / minimumProximity);
	
	kVolume = maxVolume / proximityDistance;
	kAlpha = maxAlpha / proximityDistance;
	
	//kMinimum = (0.5 / (minimumProximity));
}

function Update () {
	// Update the distance
	distanceFromPlayer = Vector3.Distance(monster.transform.position, player.transform.position);
	UpdateStimuli();
}

function OnGUI () {
	GUI.depth = 2;
	// Set the GUI alpha level
	GUI.color.a = guiAlphaLevel;
	// Draw the proximity texture
	GUI.DrawTexture(new Rect(0, 0, Screen.width, Screen.height), proximityTexture);
}

function UpdateStimuli () {
	// If the player is outside the radius ensure that the stimuli are set to default values
	if (distanceFromPlayer > proximityDistance)
	{
		guiAlphaLevel = 0;
		audio.volume = 0;
	}
	else // Otherwise, calculate their values using inverse proportionality
	{
		distance = distanceFromPlayer;
		
		guiAlphaLevel = (maxAlpha - (kAlpha * distance));
		audio.volume = (maxVolume - (kVolume * distance));
	}
}