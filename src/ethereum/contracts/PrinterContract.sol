pragma solidity >=0.4.22 <0.6.0;

contract PrinterContract {
    address public owner;

    event newCreatedLicence(address indexed creator, bytes32 licenceHash);

    constructor() public {
        owner = msg.sender;
    }

    struct CreateLicence {
        address creator;
        string objectHash;
        bool exists;
    }

    mapping (bytes32 => CreateLicence ) licenceStruct;

    function createLicence(string memory objectHash) public {
        require(bytes(objectHash).length > 0);
        bytes32 licenceHash = keccak256(bytes(objectHash));
        require(!licenceStruct[licenceHash].exists);

        // push licence by sender address
        licenceStruct[licenceHash] = CreateLicence(msg.sender, objectHash, true);
        emit newCreatedLicence(msg.sender, licenceHash);
    }

    function getLicence(string calldata objectHash) external view returns (address _creator, string memory _objectHash, bytes32 _licenceHash) {
        require(bytes(objectHash).length > 0);

        bytes32 licenceHash = keccak256(bytes(objectHash));
        require(licenceStruct[licenceHash].exists);

        return (licenceStruct[licenceHash].creator,
        licenceStruct[licenceHash].objectHash,
        licenceHash);
    }
}
