private var timeOfDay : float;
public var sun : Transform;
public var sunLight : Light;
var sunRotation;
var intensityDuration = 3;
var blendAmount = 0;
var sunSpeed = 0.1;
public var skybox : Material;
var dayFogColor : Color;
var nightFogColor : Color;
							
var maxIntensity = 0.3;

enum DayState{ night, day };

var rotationLightIntensityRatio = maxIntensity / 1;
				
function Start () {
	//This is for debugging only
	//skybox.SetFloat("_Blend", 0);
}


function Update () {
	timeOfDay += Time.deltaTime; //Implement later
	sunRotation = sun.rotation.eulerAngles.x; //This gets the sun's rotation
	RenderSettings.fogColor = Color.Lerp(nightFogColor, dayFogColor, SkyboxBlend(sunRotation)); //This changes the fog colour based upon the SkyboxBlend output
	sun.Rotate(Vector3.right * sunSpeed); //This rotates the sun
	skybox.SetFloat("_Blend", SkyboxBlend(sunRotation)); //This changes the "_Blend" float of the skybox texture based upon the SkyboxBlend output
	sunLight.intensity = SkyboxBlend(sunRotation) * rotationLightIntensityRatio; //This changes the light intensity based upon the SkyboxBlend output
}

function SkyboxBlend(degrees : float) : float
{
    var radians = degrees * Mathf.Deg2Rad;
    var sin = Mathf.Sin(radians);
    return Mathf.Clamp01(sin);
}