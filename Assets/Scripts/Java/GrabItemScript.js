var image : Texture2D;

var handIcon : Texture2D;

var pickupSound : AudioClip;

var isPickupable : boolean;

var isPictureNote : boolean;

var readNote : boolean;

var itemNameToDisplay : String;

var itemTextStyle : GUIStyle;

var noteTextStyle : GUIStyle;

var player : GameObject;

var noteText : String;

var noteImage : Texture2D;

var paperTexture : Texture2D;

var crumpledTexture : Texture2D;

var mainCamera : Camera;

var paperSize : int;

var isNote : boolean;

var hud : HUD;

var itemPickedUp : boolean;

var console : Console;

var isItem : boolean;

var processedTextArray : String[];

var processedText : String;

var codeWindow : CodeWindow;

var canInteractWith : boolean;

var mouseX : MouseLook;
var mouseY : MouseLook;

function Start () {
	Screen.lockCursor = true;
	itemNameToDisplay = "";
	mainCamera = FindCamera();
	hud = GetComponent(HUD);
	console = GetComponent(Console);
	
	codeWindow = player.GetComponent(CodeWindow);
	
	mouseX = player.GetComponent(MouseLook);
	mouseY = mainCamera.GetComponent(MouseLook);
}

function Update () {
    if (Input.GetButtonDown("Interact") && isPickupable == true && isNote == true && canInteractWith == true){
    	ProcessNoteText();
    	Debug.Log("Mousebutton is down and pickup is true!");
    	player.audio.clip = pickupSound;
    	player.audio.Play();
    	readNote = true;
    	if (readNote == true) {
    		Debug.Log("readNote is true");
    	}
    }
}

function FixedUpdate() {
	var hit : RaycastHit;
    //var ray: Ray = mainCamera.transform.forward;
    if (Physics.Raycast(mainCamera.transform.position, mainCamera.transform.forward ,hit)){
        var itemValues: ItemScript = hit.transform.GetComponent(ItemScript);
        if (itemValues){ //If the object has ItemScript attached
        	var isPickup : boolean = itemValues.pickupable;
        	isPickupable = isPickup;
        	var distanceFromObject = Vector3.Distance(hit.transform.position, player.transform.position);
        	if (distanceFromObject < 3.5) {
        		canInteractWith = true;
	        	if (hit.transform.tag == "Note") {
	        		itemNameToDisplay = 'Read note';
	        		isNote = true;
	        		if (itemValues.textNote != null) {
	        			noteText = itemValues.textNote;
	        		}
	        		if (itemValues.imageNote != null) {
	        			noteImage = itemValues.imageNote;
	        			isPictureNote = true;
	        		}
	        		else {
	        			isPictureNote = false;
	        		}
	        	} else if (hit.transform.tag == "FogNote") {
	        		itemNameToDisplay = 'Read note';
	        		isNote = true;
	        		RenderSettings.fogMode = FogMode.Linear;
	        		RenderSettings.fogStartDistance = 50;
	        		RenderSettings.fogEndDistance = 200;
	        		if (itemValues.textNote != null) {
	        			noteText = itemValues.textNote;
	        		}
	        		if (itemValues.imageNote != null) {
	        			noteImage = itemValues.imageNote;
	        			isPictureNote = true;
	        		}
	        		else {
	        			isPictureNote = false;
	        		}
	        	}
	        	else {
	        		isNote = false;
	        	}
	        	if (hit.transform.tag == "Item") {
	        		itemNameToDisplay = itemValues.itemName;
	        		isItem = true;
	        		Debug.Log("is item");
	        		if (Input.GetButtonDown("Interact")){
	        			Debug.Log("interact");
	        			Destroy(hit.transform.gameObject);
	        			player.audio.clip = pickupSound;
    					player.audio.Play();
    					hud.torchBatteryAmount += 50;
    					itemPickedUp = true;
	        		}
	        	}
        	}
        	else {
        		canInteractWith = false;
        		readNote = false;
        	}
        }
        else { //If it doesn't have the script, assume it's not pickupable
        	isPickupable = false;
        	itemNameToDisplay = "";
        }
    }
}

function OnGUI () {
	GUI.Label(new Rect((Screen.width / 2), (Screen.height / 2), 200, 50), itemNameToDisplay, itemTextStyle);
	
	if(readNote == true) {
		mouseX.enabled = false;
    	mouseY.enabled = false;
		Screen.lockCursor = false;
		GUIUtility.ScaleAroundPivot(Vector2(Screen.width/1920.0, Screen.height/900.0), Vector2(Screen.width / 2.0, Screen.height / 2.0));
		if(!isPictureNote) {
			Debug.Log("Drawing textures...");
			GUI.DrawTexture(new Rect((Screen.width / 2) - ((210 * paperSize) / 2), (Screen.height / 2) - ((297 * paperSize) / 2), (210 * paperSize), (297 * paperSize)), paperTexture);
			GUI.Label(new Rect((Screen.width / 2) - ((208 * paperSize) / 2), (Screen.height / 2) - ((295 * paperSize) / 2), (208 * paperSize), (295 * paperSize)), processedText, noteTextStyle);
			Debug.Log("Textures drawn...");
		}
		
		if(isPictureNote) {
			GUI.DrawTexture(new Rect((Screen.width / 2) - ((noteImage.width) / 2), (Screen.height / 2) - ((noteImage.height) / 2), (noteImage.width), (noteImage.height)), crumpledTexture);
			GUI.DrawTexture(new Rect((Screen.width / 2) - ((noteImage.width) / 2), (Screen.height / 2) - ((noteImage.height) / 2), (noteImage.width), (noteImage.height)), noteImage);
		}
		
		
		if(GUI.Button(new Rect((Screen.width / 2) - 50, (Screen.height / 2) + ((297 * paperSize) / 2), 100, 50), "Exit")) {
			readNote = false;
			isPictureNote = false;
			Screen.lockCursor = true;
			mouseX.enabled = true;
    		mouseY.enabled = true;
		}
	}
	
	if(itemPickedUp == true) {
		console.WriteLine("Picked up 2 Batteries");
		itemPickedUp = false;
	}
	
	
}

function FindCamera ()
{
    if (camera)
       return camera;
    else
       return Camera.main;
}

function ProcessNoteText () {
	processedTextArray = noteText.Split(" "[0]);
	processedText = "";
	for(var word : String in processedTextArray)
	{
		if (word == "&1") {
			word = codeWindow.codeNumber1.ToString();
		}
		else if (word == "&2") {
			word = codeWindow.codeNumber2.ToString();
		}
		else if (word == "&3") {
			word = codeWindow.codeNumber3.ToString();
		}
		else if (word == "&4") {
			word = codeWindow.codeNumber4.ToString();
		}
		else if (word == "&5") {
			word = codeWindow.codeNumber5.ToString();
		}
		processedText += (word + " ");
	}
}