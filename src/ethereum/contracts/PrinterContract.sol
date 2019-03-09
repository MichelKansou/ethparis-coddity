pragma solidity 0.4.24;

import "chainlink/solidity/contracts/Chainlinked.sol";

contract PrinterContract is Chainlinked {
    address public owner;

    // Helper constant for testnets: 1 request = 1 LINK
    uint256 constant private ORACLE_PAYMENT = 1 * LINK;
    uint256 public currentLicencePrice;

    address constant ROPSTEN_ENS = 0x112234455C3a32FD11230C42E7Bccd4A84e02010;
    bytes32 constant ROPSTEN_CHAINLINK_ENS = 0xead9c0180f6d685e43522fcfe277c2f0465fe930fb32b5b415826eacf9803727;

    // Creates constants for the JobIDs within the documentation.
    bytes32 constant GET_BYTES32_JOB = bytes32("5b280bfed77646d297fdb6e718c7127a");
    bytes32 constant POST_BYTES32_JOB = bytes32("469e74c5bca740c0addba9ea67eecc51");
    bytes32 constant INT256_JOB = bytes32("93032b68d4704fa6be2c3ccf7a23c107");
    bytes32 constant INT256_MUL_JOB = bytes32("e055293deb37425ba83a2d5870c57649");
    bytes32 constant UINT256_JOB = bytes32("fb5fb7b18921487fb26503cb075abf41");
    bytes32 constant UINT256_MUL_JOB = bytes32("493610cff14346f786f88ed791ab7704");
    bytes32 constant BOOL_JOB = bytes32("7ac0b3beac2c448cb2f6b2840d61d31f");

    event newCreatedLicence(address indexed creator, bytes32 indexed licenceHash);


    constructor() public {
        owner = msg.sender;
        setChainlinkWithENS(ROPSTEN_ENS, ROPSTEN_CHAINLINK_ENS);
    }

    struct CreateLicence {
        address creator;
        string objectHash;
        bool exists;
    }

    struct AssignLicence {
        address assignedAccount;
        string objectHash;
        uint counter;
    }

    mapping (address => uint) accountBalance;

    mapping (bytes32 => bytes32) licenseRequests;
    mapping (bytes32 => address) userRequests;
    mapping (bytes32 => CreateLicence) licenceStruct;
    mapping (bytes32 => AssignLicence[]) assignedList;
    mapping (address => uint256) deposits;

    function createLicence(string memory objectHash) public {
        require(bytes(objectHash).length > 0);
        bytes32 licenceHash = keccak256(bytes(objectHash));
        require(!licenceStruct[licenceHash].exists);

        // push licence by sender address
        licenceStruct[licenceHash] = CreateLicence(msg.sender, objectHash, true);
        emit newCreatedLicence(msg.sender, licenceHash);
    }

    function getLicence(string objectHash) external view returns (address _creator, string memory _objectHash, bytes32 _licenceHash) {
        require(bytes(objectHash).length > 0);

        bytes32 licenceHash = keccak256(bytes(objectHash));
        require(licenceStruct[licenceHash].exists);

        return (licenceStruct[licenceHash].creator,
        licenceStruct[licenceHash].objectHash,
        licenceHash);
    }

    function setLicence(string objectHash) external payable {
        require(bytes(objectHash).length > 0);

        bytes32 licenceHash = keccak256(bytes(objectHash));

        require(licenceStruct[licenceHash].exists);
        require(msg.value != 0);

        deposits[msg.sender] = msg.value;

        this.requestLicencePrice(licenceHash);
    }

    function getBalance() external view returns (uint256 amount) {
        return (accountBalance[msg.sender]);
    }

    function withdraw() external {

        uint256 value = accountBalance[msg.sender];

        // Try sending ether.
        if (!msg.sender.send(value))
            revert();  // In case of failure revert the transaction.

        accountBalance[msg.sender] -= value;
    }

    // Creates a Chainlink request with the uint256 multiplier job
    function requestLicencePrice(bytes32 _licenceHash)
    public
    onlyOwner
    {
        // newRequest takes a JobID, a callback address, and callback function as input
        Chainlink.Request memory req = newRequest(UINT256_MUL_JOB, this, this.fulfill.selector);
        // Adds a URL with the key "get" to the request parameters
        req.add("url", "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD");

        req.add("path", "USD");
        // Sends the request with 1 LINK to the oracle contract
        bytes32 requestId = chainlinkRequest(req, ORACLE_PAYMENT);
        licenseRequests[requestId] = _licenceHash;
        userRequests[requestId] = msg.sender;
    }

    // fulfill receives a uint256 data type
    function fulfill(bytes32 _requestId)
    public
        // Use recordChainlinkFulfillment to ensure only the requesting oracle can fulfill
    recordChainlinkFulfillment(_requestId)
    {
        bytes32 licenceHash = licenseRequests[_requestId];
        address sender = userRequests[_requestId];

        require(currentLicencePrice != 0);

        address to = licenceStruct[licenceHash].creator;
        accountBalance[to] += deposits[sender];

        delete deposits[sender];
        delete userRequests[_requestId];
        delete licenseRequests[_requestId];
    }

    // withdrawLink allows the owner to withdraw any extra LINK on the contract
    function withdrawLink()
    public
    onlyOwner
    {
        LinkTokenInterface link = LinkTokenInterface(chainlinkToken());
        require(link.transfer(msg.sender, link.balanceOf(address(this))), "Unable to transfer");
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }
}
