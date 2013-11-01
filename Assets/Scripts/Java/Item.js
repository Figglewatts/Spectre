class Item extends MonoBehaviour
{
	private var _itemName : String;
	
	private var _itemDescription : String;
	
	private var _itemID : int;
	
	private var _itemObject : GameObject;
	
	enum type { weapon, consumable, object, important, asset };
	
	private var _itemType : type;
	
	private var _itemIcon : Texture;
	
	public function main() {
		
	}
	
	function get itemName() : String { return _itemName; }
	function set itemName(value : String) { _itemName = value; }
	
	function get itemDescription() : String { return _itemDescription; }
	function set itemDescription(value : String) { _itemDescription = value; }
	
	function get itemID() : int { return _itemID; }
	function set itemID(value : int) { _itemID = value; }
	
	function get itemObject() : GameObject { return _itemObject; }
	function set itemObject(value : GameObject) { _itemObject = value; }
	
	function get itemType() : type { return _itemType; }
	function set itemType(value : type) { _itemType = value; }
	
	function get itemIcon() : Texture { return _itemIcon; }
	function set itemIcon(value : Texture) { _itemIcon = value; }
	
	function Update () {
	}
}