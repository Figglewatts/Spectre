public var weepingAngel : GameObject;
var player : GameObject;

var mainCamera : Camera;

var speedOfFollow : float;

var followActive : boolean;

var angelRenderedYet : boolean;

var firstEncounter : boolean = true;

var distanceFromPlayer : float;

var unEncounterMusic : AudioClip;

var encounterMusic : AudioClip;

var chaseMusic : AudioClip;

var playerBehaviour : PlayerBehaviour;

var canGenerateNumber : boolean = true;

var jumpScare : GameObject;

var isJumpScare : boolean = false;

var jumpScareSound : AudioClip;

var soundPlayer : GameObject;

var locationList : GameObject[];

var canGenerateSpawn : boolean;

function Start () {
	//weepingAngel = GameObject.Find("Follower");
	//player = GameObject.Find("Player");
	followActive = false;
	angelRenderedYet = false;
	
	DynamicMusic();
	
	JumpScare();
	
	jumpScare.renderer.active = false;
	
	playerBehaviour = player.GetComponent(PlayerBehaviour);
	
	canGenerateSpawn = true;
	
	Wait10minsThenFollow();
}

function Update () {
	distanceFromPlayer = Vector3.Distance(player.transform.position, weepingAngel.transform.position);
	//Debug.Log(followActive);
	/*if (mainCamera.OnWillRenderObject(weepingAngel) && !angelRenderedYet){
		followActive = true;
		angelRenderedYet = true;
	}*/
	
	var height = Terrain.activeTerrain.SampleHeight(transform.position) + Terrain.activeTerrain.transform.position.y;
	transform.position = new Vector3(transform.position.x, height, transform.position.z);
	
	FirstEncounter();
	
	if (followActive == true)
	{
		FollowPlayer();
	}
}

function MyWaitFunction(delay : float) {
	var timer = Time.time + delay;
	while (Time.time < timer){
		yield;
	}
}

function AI() {
//	if (followActive == false && firstEncounter == true){
//		mainCamera.audio.Pause();
//		if (mainCamera.audio.isPlaying == false) {
//			mainCamera.audio.clip = encounterMusic;
//			mainCamera.audio.Play();
//		}
//		var randomWait = Random.Range(3, 9);
//		yield MyWaitFunction(randomWait);
//		followActive = true;
//	}
//	
//	while (followActive == true) {
//		mainCamera.audio.Pause();
//		if (mainCamera.audio.isPlaying == false) {
//			mainCamera.audio.clip = chaseMusic;
//			mainCamera.audio.Play();
//		}
//		var randomWait2 = Random.Range(3, 9);
//		yield MyWaitFunction(randomWait2);
//		followActive = false;
//	}
}

function FirstEncounter() {
	if (firstEncounter == false) {
		GenerateRandomSpawn();
		var distanceFromPlayer = Vector3.Distance(transform.position, player.transform.position);
		
		if (distanceFromPlayer < 50) {
			isJumpScare = true;
			canGenerateSpawn = true;
			GenerateRandomSpawn();
			firstEncounter = true;
			followActive = true;
		}
	}
}

function FadeOutSound() {
	for (var i = 9; i > 0; i--) {
		mainCamera.audio.volume = i * 0.1;
		yield WaitForSeconds(0.5);
	}
}

function FadeInSound() {
	for (var i = 0; i < 9; i++) {
		mainCamera.audio.volume = i * 0.1;
		yield WaitForSeconds(0.5);
	}
}

function PlaySongWhenNoSong(clip : AudioClip) {
	//mainCamera.audio.Pause();
	if (mainCamera.audio.isPlaying == false) {
		//mainCamera.audio.clip = clip;
		//mainCamera.audio.Play();
	}
}

function ToggleFollowActive() {
	followActive = !followActive;
}

function FollowPlayer() {
	var rand : int;
	if (weepingAngel.renderer.isVisible == false)
	{
		weepingAngel.transform.LookAt(player.transform.position);
		weepingAngel.transform.position = Vector3.MoveTowards(weepingAngel.transform.position, player.transform.position, speedOfFollow*Time.deltaTime);
		
		if (canGenerateNumber == true) {
			rand = Random.Range(0, 99);
			canGenerateNumber = false;
		}
		if (rand > 0 && rand < 7) {
			playerBehaviour.Teleport(50);
		}
		if (rand > 7 && rand < 15) {
			isJumpScare = true;
		}
		if (rand > 15 && rand < 17) {
			canGenerateSpawn = true;
			GenerateRandomSpawn();
		}
	}
	else {
		canGenerateNumber = true;
	}
	if (distanceFromPlayer > 250) {
		weepingAngel.transform.position.z = player.transform.position.z - 100;
		weepingAngel.transform.position.y = player.transform.position.y;
		weepingAngel.transform.position.x = player.transform.position.x;
		isJumpScare = true;
	}
}

function DynamicMusic() {
	while(true)
	{
		if (followActive == false && firstEncounter == true){
			PlaySongWhenNoSong(encounterMusic);
			var randomWait = Random.Range(30, 60);
			yield MyWaitFunction(randomWait);
			followActive = true;
		}
		
		if (followActive == true && firstEncounter == true) {
			PlaySongWhenNoSong(chaseMusic);
			speedOfFollow = Random.Range(7, 14);
			var randomWait2 = Random.Range(30, 60);
			yield MyWaitFunction(randomWait2);
			followActive = false;
		}
		yield;
	}
}

function OnGUI () {

}

function JumpScare () {
	while(true) 
	{
		if(isJumpScare)
		{
			jumpScare.renderer.active = true;
			PlayJumpScareSound();
			yield WaitForSeconds (0.1);
			jumpScare.renderer.active = false;
			yield WaitForSeconds (jumpScareSound.length);
			isJumpScare = false;
			yield;
		}
		yield;
	}
}

function PlayJumpScareSound () {
	soundPlayer.audio.clip = jumpScareSound;
	soundPlayer.audio.Play();
	yield WaitForSeconds (jumpScareSound.length);
}

function GenerateRandomSpawn () {
	if (canGenerateSpawn == true) {
		var rand = Random.Range(0, locationList.Length);
	
		transform.position = locationList[rand].transform.position;
		
		canGenerateSpawn = false;
	}
}

function Wait10minsThenFollow () {
	while (true)
	{
		yield WaitForSeconds (600);
		isJumpScare = true;
		firstEncounter = true;
		followActive = true;
		yield;
	}
}