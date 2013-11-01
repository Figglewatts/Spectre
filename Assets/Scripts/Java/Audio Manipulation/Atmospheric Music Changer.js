#pragma strict
var atmosphericMusic : AudioClip[];
//var numberOfLoops : int;
var weepingAngel : GameObject;
var player : GameObject;
var lastAudioClipPlayed : AudioClip;
var distanceFromPlayer : float;
var hasPlayed : boolean;

function Start () {
	hasPlayed = false;
	ChangeMusic();
}

function Update () {
	distanceFromPlayer = Vector3.Distance(weepingAngel.transform.position, player.transform.position);
}

function ChangeMusic () {
	while(true)
	{
		if (!hasPlayed) {
			yield WaitForSeconds(6);
		}
		if(distanceFromPlayer < 50) {
			hasPlayed = true;
			audio.clip = atmosphericMusic[2];
			lastAudioClipPlayed = audio.clip;
			audio.Play();
			yield WaitForSeconds(lastAudioClipPlayed.length);
		}
		else if(distanceFromPlayer >= 50 && distanceFromPlayer < 100) {
			hasPlayed = true;
			audio.clip = atmosphericMusic[1];
			lastAudioClipPlayed = audio.clip;
			audio.Play();
			yield WaitForSeconds(lastAudioClipPlayed.length);
		}
		else if(distanceFromPlayer >= 100) {
			hasPlayed = true;
			audio.clip = atmosphericMusic[0];
			lastAudioClipPlayed = audio.clip;
			Debug.Log(lastAudioClipPlayed);
			audio.Play();
			Debug.Log("about to wait");
			yield WaitForSeconds(lastAudioClipPlayed.length);
			Debug.Log("waited");
		}
		/*for(var i = 0; i < atmosphericMusic.length; i++)
		{
			audio.clip = atmosphericMusic[i];
			audio.Play();
			yield WaitForSeconds(atmosphericMusic[i].length * numberOfLoops);
		}*/
		yield;
	}
}