var walkSounds : AudioClip[];
var audioStepLength = 0.6;
//Herp Derp look at mah footstep derp
function Awake () {	
	PlayStepSounds();
}

function PlayStepSounds () {
	var controller : CharacterController = GetComponent(CharacterController);

	while (true) {
		if (controller.isGrounded && controller.velocity.magnitude > 0.3) {
			audio.clip = walkSounds[Random.Range(0, walkSounds.length)];
			audio.Play();
			yield WaitForSeconds(audioStepLength);
		} else {
			yield;
		}
	}
}