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

    event Purchased(uint id, string name, address indexed seller, address indexed buyer, bool available);
    event Added(uint id, string name, uint price, address indexed seller, bool available, bool exists, uint totalItems);

    constructor () public {
        totalItems = 0;
    }

    function checkItemsTotal() public view returns (uint total) {
        return totalItems;
    }

    function addItem (string _name, uint _price) public {
        uint itemId = totalItems;
        require(!items[itemId].exists);

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

        emit Added(items[itemId].id, items[itemId].name, items[itemId].price, items[itemId].seller, items[itemId].available, items[itemId].exists, totalItems);
    }

    function buyItem(uint _id) public payable returns (bool success, address seller, address buyer) {
        require(items[_id].exists == true, "This item does not exist. Please check the id and try again.");
        require(items[_id].available == true, "This item is no longer available.");
        require(items[_id].seller != 0, "This item has no seller");
        require(items[_id].buyer == 0, "This item is no longer available");
        require(items[_id].price == msg.value, "Not enough TRX to buy this item.");

        address _buyerAddress = msg.sender;

        _handlePurchase(_id, _buyerAddress, msg.value);

        emit Purchased(_id, items[_id].name, items[_id].seller, items[_id].buyer, items[_id].available);

        return (true, items[_id].seller, items[_id].buyer);
    }

    function _handlePurchase(uint _id, address _buyerAddress, uint _value) internal {
        items[_id].available = false;
        items[_id].buyer = _buyerAddress;
        items[_id].seller.transfer(_value);
    }

    /* For testing only */
    /* function fetchItem(uint8 _id) public view returns (uint itemId, string name, uint price, bool availability,  address seller, address buyer, bool exists){
        return (items[_id].id, items[_id].name, items[_id].price, items[_id].available, items[_id].seller, items[_id].buyer, items[_id].exists);
    } */
}
