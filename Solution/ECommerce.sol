pragma solidity ^0.4.23;

contract ECommerce {

    uint totalItems;

    struct Item {
        uint id;
        string name;
        uint price;
        bool available;
        address seller;
        address buyer;
        bool exists;
    }

    mapping (uint => Item) items;

    event Purchased(uint id, string name, address indexed seller, address indexed buyer, uint price);
    event Added(uint id, string name, uint price, address indexed seller, bool available, bool exists);
    event Total(uint totalItems);
    event Availability(bool available);

    constructor () public {
        totalItems = 0;
    }

    function checkItemsTotal() public returns (uint total) {
        emit Total(totalItems);
        return totalItems;
    }

    function addItem (string _name, uint _price) public returns (bool success, uint id, string name, uint price, address seller, bool available) {
        uint itemId = totalItems;

        require(!items[itemId].exists, "An item already exists at this ID.");
        require(bytes(_name).length > 0, "Item name cannot be empty.");
        require(_price > 0, "Price must be greater than zero (0).");

        address sellerAddress = msg.sender;


        items[itemId] = Item({
            id: itemId,
            name: _name,
            available: true,
            price: (_price * 1000000), // The conversion for TRX to sun is 1 : 1000000
            seller: sellerAddress,
            buyer: 0,
            exists: true
        });

        totalItems += 1;

        emit Added(items[itemId].id, items[itemId].name, items[itemId].price, items[itemId].seller, items[itemId].available, items[itemId].exists);
        return (true, items[itemId].id, items[itemId].name, items[itemId].price, items[itemId].seller, items[itemId].available);
    }

    function checkItem(uint _id) public returns (uint itemId, string name, uint price, bool available,  address seller, address buyer, bool exists) {
      emit Availability(items[_id].available);
      return (items[_id].id, items[_id].name, items[_id].price, items[_id].available, items[_id].seller, items[_id].buyer, items[_id].exists);
    }

    function buyItem(uint _id) public payable returns (bool success, uint id, string name, address  seller, address  buyer, uint price) {
        require(items[_id].exists == true, "This item does not exist. Please check the id and try again.");
        require(items[_id].available == true, "This item is no longer available.");
        require(items[_id].seller != 0, "This item has no seller");
        require(items[_id].buyer == 0, "This item is no longer available");
        require(items[_id].price == msg.value, "Not enough TRX to buy this item.");

        address _buyerAddress = msg.sender;

        _handlePurchase(_id, _buyerAddress, msg.value);

        emit Purchased(_id, items[_id].name, items[_id].seller, items[_id].buyer, items[_id].price);

        return (true, _id, items[_id].name, items[_id].seller, items[_id].buyer, items[_id].price);
    }

    function _handlePurchase(uint _id, address _buyerAddress, uint _value) internal {
        items[_id].available = false;
        items[_id].buyer = _buyerAddress;
        items[_id].seller.transfer(_value);
    }

}
