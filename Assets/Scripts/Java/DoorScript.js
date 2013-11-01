#pragma strict
var doorMoveSound : AudioClip;
var canPlayAudio : boolean;

var oldVelocity : float;
var crashThreshold : float;

function Start () {
	oldVelocity = rigidbody.velocity.sqrMagnitude;
	crashThreshold *= crashThreshold;
	
	canPlayAudio = true;
}

function FixedUpdate () {
	if (canPlayAudio)
	{
		if (oldVelocity - rigidbody.velocity.sqrMagnitude > crashThreshold)
		{
			AudioPlayer();
		}
		else
		{
			canPlayAudio = true;
		}
	}
	oldVelocity = rigidbody.velocity.sqrMagnitude;
}

function AudioPlayer () {
	if (canPlayAudio == true)
	{
		audio.PlayOneShot(doorMoveSound);
		canPlayAudio = false;
	}
}