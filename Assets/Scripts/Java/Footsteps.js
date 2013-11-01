#pragma strict
var groundSounds : AudioClip[];
var woodSounds : AudioClip[];
var stoneSounds : AudioClip[];
var audioStepLength = 0.6;

var canPlaySound : boolean;

var controller : CharacterController;

var playerBehaviour : PlayerBehaviour;

function Awake () {
	//PlayStepSounds(groundSounds);
}

function Start () {
	controller = GetComponent(CharacterController);
	playerBehaviour = GetComponent(PlayerBehaviour);
	canPlaySound = true;
}

function Update () {

}

function OnControllerColliderHit (col : ControllerColliderHit) {

     if (!col.gameObject.tag) return;   
     
     var floorType : String = col.gameObject.tag;  

     switch(floorType) {
         case "Ground":
              if(canPlaySound) {
                   canPlaySound = false;
                   PlayStepSounds(groundSounds);
                   yield WaitForSeconds(audioStepLength);
                   canPlaySound = true;
              }
              break;
         case "Wood":
              if(canPlaySound) {
                   canPlaySound = false;
                   PlayStepSounds(woodSounds);
                   yield WaitForSeconds(audioStepLength);
                   canPlaySound = true;
              }
              break;
         default: //if the tag is not a floor type
         	  if(canPlaySound) {
                   canPlaySound = false;
                   PlayStepSounds(groundSounds);
                   yield WaitForSeconds(audioStepLength);
                   canPlaySound = true;
              }
              break;
     }
}

function PlayStepSounds (soundArray : AudioClip[]) {
	if (controller.isGrounded && controller.velocity.magnitude > 0.3) {
		PlayClipWhenFree(soundArray[Random.Range(0, soundArray.length)]);
		yield;
	} else {
		yield;
		//PlayClipWhenFree(soundArray[Random.Range(0, soundArray.length)]);
		//yield WaitForSeconds(audioStepLength);
	}
}

function PlayClipWhenFree(clip : AudioClip) {
	//if (audio.isPlaying == false) {
	audio.clip = clip;
	audio.Play();
	//yield WaitForSeconds(audioStepLength);
	//}
}

function MyWaitFunction(delay : float) {
	var timer = Time.time + delay;
	while (Time.time < timer){
		yield;
	}
}

function OnGUI () {
	if (playerBehaviour.isPlayerAlive == false) {
		if (GUI.Button(new Rect((Screen.width / 2) - 100, (Screen.height / 2) + 50, 200, 50), "Main Menu")) {
			Application.LoadLevel(0); // Load the main menu
		}
		if (GUI.Button(new Rect((Screen.width / 2) - 100, (Screen.height / 2) + 120, 200, 50), "Quit Game")) {
			Application.Quit(); // Quit the game
		}
		GUI.Label(new Rect(0, Screen.height / 2, Screen.width, 50), "You failed to Crack the Code...", playerBehaviour.deathMessageStyle);
	}
}