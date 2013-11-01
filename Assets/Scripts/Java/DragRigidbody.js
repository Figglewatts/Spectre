var spring = 50.0;
var damper = 5.0;
var drag = 10.0;
var angularDrag = 5.0;
var distance = 3.0; // assign in inspector
var attachToCenterOfMass = false;
var canPickup : boolean;
var throwForce : float;
var mainCamera : Camera;
var handTexture : Texture2D;
var canDisplayHand : boolean;
var position : Rect;
var hit : RaycastHit;

var friction : float;
var speed : float;
var lerpSpeed : float;
private var xDeg : float;
private var yDeg : float;
private var fromRotation : Quaternion;
private var toRotation : Quaternion;

var mouseX : MouseLook;
var mouseY : MouseLook;

var oldDrag;
var oldAngularDrag;

private var springJoint : SpringJoint;

function Start ()
{
	canPickup = true;
	
	position = Rect((Screen.width - handTexture.width) / 2, (Screen.height - 
        handTexture.height) /2, handTexture.width, handTexture.height);
        
    Screen.lockCursor = true;
        
    mouseX = GetComponent(MouseLook);
    mouseY = mainCamera.GetComponent(MouseLook);
    
    UpdateCursor();
}

function Update ()
{
	if (Input.GetKeyUp(KeyCode.R))
	{
		mouseX.enabled = true;
		mouseY.enabled = true;
	}
	var hitTemp : RaycastHit;
	if (Physics.Raycast(mainCamera.ScreenPointToRay(new Vector2(Screen.width / 2, Screen.height / 2)),  hit, 4))
	{
		if (hitTemp.rigidbody && !hitTemp.rigidbody.isKinematic)
		{
			canDisplayHand = true;
		}
		else
		{
			canDisplayHand = false;
		}
	}
	
	if (!Input.GetMouseButton (1))
	{
		canPickup = true;
	}
	//var numberOfIterations : int;
	//Debug.Log(canDisplayHand + numberOfIterations.ToString());
	// Make sure the user pressed the mouse down
	if (!Input.GetMouseButtonDown (0))
		return;
	//Screen.lockCursor = true;
	var mainCamera = FindCamera();
		
	// We need to actually hit an object
	if (!Physics.Raycast(mainCamera.ScreenPointToRay(new Vector2(Screen.width / 2, Screen.height / 2))))
		return;
	// We need to hit a rigidbody that is not kinematic
	if (!hit.rigidbody || hit.rigidbody.isKinematic)
	{
		return;
	}
	
	if (!springJoint)
	{
		var go = new GameObject("Rigidbody dragger");
		var body : Rigidbody = go.AddComponent ("Rigidbody") as Rigidbody;
		springJoint = go.AddComponent ("SpringJoint");
		body.isKinematic = true;
	}
	
	springJoint.transform.position = hit.point;
	if (attachToCenterOfMass)
	{
		var anchor = transform.TransformDirection(hit.rigidbody.centerOfMass) + hit.rigidbody.transform.position;
		anchor = springJoint.transform.InverseTransformPoint(anchor);
		springJoint.anchor = anchor;
	}
	else
	{
		springJoint.anchor = Vector3.zero;
	}
	
	springJoint.spring = spring;
	springJoint.damper = damper;
	springJoint.maxDistance = distance;
	springJoint.connectedBody = hit.rigidbody;
	
	StartCoroutine ("DragObject", hit.distance);
}

function DragObject (distance : float)
{
	oldDrag = springJoint.connectedBody.drag;
	oldAngularDrag = springJoint.connectedBody.angularDrag;
	springJoint.connectedBody.drag = drag;
	springJoint.connectedBody.angularDrag = angularDrag;
	while (Input.GetMouseButton (0) && canPickup == true)
	{
		var ray = mainCamera.ScreenPointToRay(new Vector2(Screen.width / 2, Screen.height / 2));
		springJoint.transform.position = ray.GetPoint(distance);
		yield;
		
		if (Input.GetKey(KeyCode.R))
		{
			mouseX.enabled = false;
			mouseY.enabled = false;
			xDeg += Input.GetAxis("Input X") * speed * friction;
        	yDeg -= Input.GetAxis("Input Y") * speed * friction;
        	fromRotation = hit.transform.rotation;
        	toRotation = Quaternion.Euler(yDeg,xDeg,0);
        	hit.transform.rotation = Quaternion.Lerp(fromRotation,toRotation,Time.deltaTime  * lerpSpeed);
		}
		if (Input.GetKeyUp(KeyCode.R))
		{
			springJoint.connectedBody.drag = oldDrag;
			springJoint.connectedBody.angularDrag = oldAngularDrag;
			mouseX.enabled = true;
			mouseY.enabled = true;
		}
		
		if (Input.GetMouseButton (1))
		{
			canPickup = false;
			springJoint.connectedBody.drag = oldDrag;
			springJoint.connectedBody.angularDrag = oldAngularDrag;
			springJoint.connectedBody.AddForce(mainCamera.transform.forward * throwForce);
		}
	}
	if (springJoint.connectedBody)
	{
		springJoint.connectedBody.drag = oldDrag;
		springJoint.connectedBody.angularDrag = oldAngularDrag;
		springJoint.connectedBody = null;
	}
}

function FindCamera ()
{
	if (camera)
		return camera;
	else
		return Camera.main;
}

function OnGUI () 
{
	GUIUtility.ScaleAroundPivot(Vector2(Screen.width/1920.0, Screen.height/900.0), Vector2(Screen.width/2, Screen.height/2));
	if (canDisplayHand == true)
	{
		//GUI.DrawTexture(position, handTexture);
	}
}

function UpdateCursor ()
{
	while (true)
	{
		Screen.lockCursor = true;
		yield;
	}
}