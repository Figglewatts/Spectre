var stabSounds : AudioClip[];
public var weepingAngel : GameObject;
var player : GameObject;
var mainCamera : Camera;

var distanceFromPlayer;

var stabCoolDown : float;
var coolDownTime : float;

var canPlayStab : boolean;

var followPlayer : FollowPlayerWhenOOSight;

function Start () {
	stabCoolDown = 0;
	coolDownTime = 10.0f;
	canPlayStab = true;
	followPlayer = GetComponent(FollowPlayerWhenOOSight);
}

function Update () {
	distanceFromPlayer = Vector3.Distance(weepingAngel.transform.position, player.transform.position);
	
	//Debug.Log(distanceFromPlayer);
	
	if (stabCoolDown > 0){
		stabCoolDown -= Time.deltaTime;
	}
	
	if (stabCoolDown < 0){
		stabCoolDown = 0;
	}
	
	if (distanceFromPlayer < 50){
		canPlayStab = true;
	}
	
	//if (distanceFromPlayer < 1.2){
	//	canScream = true;
	//}
	
	if (followPlayer.followActive == true) {
		if (stabCoolDown == 0 && weepingAngel.renderer.isVisible == false && canPlayStab == true){
			PlayStab();
			stabCoolDown = coolDownTime;
			canPlayStab = false;
		}
	}
}

function PlayStab () {
	var rand = Random.Range(0, stabSounds.Length);
		
	audio.clip = stabSounds[rand];
	audio.Play();
}