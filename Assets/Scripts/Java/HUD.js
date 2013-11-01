#pragma strict
var torchBarTexture : Texture2D;
var torchBarTextureEmpty : Texture2D;
var torchBatteryAmount : float;

var sprintBarTexture : Texture2D;
var sprintBarTextureEmpty : Texture2D;

var torchLight : Light;

var torchActive : boolean;

var torchDrainSpeed : float;

var canDrain : boolean;

var buttonOn : AudioClip;
var buttonOff : AudioClip;

var charMotor : CharacterMotor;

var stamina : float;
var maxStamina : float;
var staminaRechargeRate : float;
var staminaReductionRate : float;

var breathingSound : AudioClip;

var graphics : GameObject;

var footsteps : Footsteps;

var breathingVolumeRatio : float = 1 * maxStamina; //maxStamina divided by max volume

var messageStyle : GUIStyle;

var canDisplay : boolean;

var drawStartMessage : boolean;

var infiniteSprint : boolean;

var mainCam : GameObject;
var headBobbing : HeadBob;

function Start () {
	torchBatteryAmount = 100;
	stamina = 100;
	maxStamina = 100;
	
	torchActive = true;
	
	drawStartMessage = true;
	
	charMotor = GetComponent(CharacterMotor);
	footsteps = GetComponent(Footsteps);
	
	canDrain = true;
	headBobbing = mainCam.GetComponent(HeadBob);
	
	yield WaitForSeconds(6);
	drawStartMessage = false;
}

function Update () {
	//graphics.audio.volume = (1 / stamina); Volume is inversely proportional to stamina
	if (Input.GetKeyDown(KeyCode.F5))
	{
		canDisplay = !canDisplay;
	}
	if (Input.GetButtonUp("Torch"))
	{
		graphics.audio.clip = buttonOn;
		graphics.audio.Play();
		torchActive = !torchActive;
		Debug.Log("F PRESSED!");
	}
	
	if (Input.GetButton("Sprint") && stamina > 0) {
		charMotor.movement.maxForwardSpeed = 10;
		headBobbing.bobbingSpeed = 0.2;
		if (!infiniteSprint) {
			stamina -= staminaReductionRate * Time.deltaTime;
		}
		footsteps.audioStepLength = 0.2;
	}
	else {
		charMotor.movement.maxForwardSpeed = 6;
		footsteps.audioStepLength = 0.4;
		headBobbing.bobbingSpeed = 0.15;
	}
	if (!Input.anyKey) {
		stamina += (staminaRechargeRate * Time.deltaTime) * 2;
	}
	if (Input.anyKey && !Input.GetButton("Sprint")) {
		stamina += (staminaRechargeRate * Time.deltaTime);
	}
	
	if (stamina < 0) {
		stamina = 0;
	}
	else if (stamina > maxStamina) {
		stamina = maxStamina;
	}
	
	if (torchActive && torchBatteryAmount > 0)
	{
		if (canDrain)
		{
			torchLight.active = true;
			torchBatteryAmount -= torchDrainSpeed * Time.deltaTime;
		}
	}
	else
	{
		torchLight.active = false;
	}
	
	if (torchBatteryAmount < 0)
	{
		torchBatteryAmount = 0;
	}
	if (torchBatteryAmount > 100)
	{
		torchBatteryAmount = 100;
	}
}

function OnGUI () {
	DisplayStartMessage();
	GUIUtility.ScaleAroundPivot(Vector2(Screen.width/1920.0, Screen.height/900.0), Vector2(0.0, 0.0));
	GUI.color.a = 0.7;
	if (canDisplay) {
		DrawBar(50, 50, torchBarTexture, torchBarTextureEmpty, 100, torchBatteryAmount);
		DrawVerticalBar((torchBarTextureEmpty.width / 2) + (50 - (sprintBarTextureEmpty.width / 2)), 150, sprintBarTexture, sprintBarTextureEmpty, maxStamina, stamina);
	}
	GUI.depth = 3;
}

function DrawBar (barLeft : int, barTop : int, barTexture : Texture2D, emptyBarTexture : Texture2D, maxValue : float, curValue : float)
{
	var LocationRect:Rect = Rect(barLeft,barTop,emptyBarTexture.width,emptyBarTexture.height);
	var DrawRect:Rect = Rect(0,0,emptyBarTexture.width,emptyBarTexture.height);
    var DrawWidth:int;
    
    DrawWidth = emptyBarTexture.width*(curValue/maxValue);
    
    GUI.BeginGroup (LocationRect);
        GUI.DrawTexture (DrawRect, emptyBarTexture);
        GUI.BeginGroup (new Rect (0, 0, DrawWidth, emptyBarTexture.height));
            GUI.DrawTexture(DrawRect, barTexture);
        GUI.EndGroup ();
        //GUI.Label(Rect((DrawRect.width/2)-10,-5,40,50),curValue.ToString());
    GUI.EndGroup ();
}

function DrawVerticalBar (barLeft : int, barTop : int, barTexture : Texture2D, emptyBarTexture : Texture2D, maxValue : float, curValue : float)
{
	var LocationRect:Rect = Rect(barLeft,barTop,emptyBarTexture.width,emptyBarTexture.height);
	var DrawRect:Rect = Rect(0,0,emptyBarTexture.width,emptyBarTexture.height);
    var DrawHeight:int;
    
    DrawHeight = emptyBarTexture.height*(curValue/maxValue);
    
    GUI.BeginGroup (LocationRect);
        GUI.DrawTexture (DrawRect, emptyBarTexture);
        GUI.BeginGroup (new Rect (0, 0, emptyBarTexture.width, DrawHeight));
            GUI.DrawTexture(DrawRect, barTexture);
        GUI.EndGroup ();
        //GUI.Label(Rect((DrawRect.width/2)-10,-5,40,50),curValue.ToString());
    GUI.EndGroup ();
}

function DisplayStartMessage () {
	if (drawStartMessage == true) {
		GUI.Label(new Rect(0, Screen.height / 2, Screen.width, 50), "Crack the Code...", messageStyle);
	}
}