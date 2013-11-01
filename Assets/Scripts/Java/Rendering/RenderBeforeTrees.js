#pragma strict

function Start(){
    renderer.material.renderQueue=2800; // Sets the place in the Render Queue to 2800, 100 before the Billboard Trees are rendered,
    									// mainly due to a silly bug in Unity's particle systems. #firstworldproblems
}

function Update () {

}