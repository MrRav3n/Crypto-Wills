pragma solidity ^0.5.8;

contract CryptoWills {

    constructor(address _MrJohn) public {
        mainPersons.push(_MrJohn);
        notariesNames[_MrJohn] = "MrJohn";
        notaries.push(_MrJohn);
        notaryCount++;

    }

    mapping(address => mapping(address => bool)) public mainPerson;
    mapping(address => mapping(address => bool)) public mainDelPerson;
    mapping(address => mapping(address => bool)) public mainDelPersonMain;
    uint public notaryCount;
    mapping (address => uint) public notaryVotes;
    mapping (address => uint) public mainPersonVotes;
    mapping (address => uint) public notaryDelVotes;
    mapping (address => uint) public mainPersonDelVotes;
    mapping (address => bool) public bannedNotaries;
    address[] public notaries;
    mapping(address => string) public notariesNames;
    mapping (uint => SingleWill) wills;
    address[] public mainPersons;
    mapping(address => Pesels[]) ownedWills;

    struct SingleWill {
        string name;
        string date;
        string content;
        uint[] currentDate;
        address[] creator;
        string will;
    }

    struct Pesels{
        uint pesel;
    }



    function isMainPerson(address _address) public view returns(bool){
        for(uint i=0; i<mainPersons.length; i++) {
            if(mainPersons[i]==_address) {
                return true;
            }
        }
        return false;
    }

    function isNotary(address _address) public view returns(bool){
        for(uint i=0; i<notaries.length; i++) {
            if(notaries[i]==_address) {
                return true;
            }
        }
        return false;

    }

    function addNotary(address _newNotary, string memory _name)  onlyMainPerson(msg.sender) public {
        require(mainPerson[msg.sender][_newNotary]==false);
        notaryVotes[_newNotary]++;
        if(bytes(notariesNames[_newNotary]).length==0) {
            notariesNames[_newNotary] = _name;
        }

        mainPerson[msg.sender][_newNotary]=true;
        if(notaryVotes[_newNotary]>(mainPersons.length/2)) {
            notaries.push(_newNotary);
            notaryCount++;
        }
    }

    function removeNotary(address _Notary) onlyMainPerson(msg.sender) public {
        require(mainDelPerson[msg.sender][_Notary]==false);
        notaryDelVotes[_Notary]++;
        mainDelPerson[msg.sender][_Notary]=true;
        if(notaryDelVotes[_Notary]>(mainPersons.length/2)) {
            bannedNotaries[_Notary]=true;
        }
    }

    function addMainPerson(address _newMainPerson) onlyMainPerson(msg.sender) public {
        require(mainPerson[msg.sender][_newMainPerson]==false);
        mainPersonVotes[_newMainPerson]++;
        mainPerson[msg.sender][_newMainPerson]=true;
        if(mainPersonVotes[_newMainPerson]==mainPersons.length) {
            mainPersons.push(_newMainPerson);
        }
    }

    function removeMainPerson(address _MainPerson) onlyMainPerson(msg.sender) public {
        require(mainDelPersonMain[msg.sender][_MainPerson]==false);
        mainPersonDelVotes[_MainPerson]++;
        mainDelPersonMain[msg.sender][_MainPerson]=true;
        if(mainPersonDelVotes[_MainPerson]==mainPersons.length) {
            for(uint i=0; i<mainPersons.length; i++) {
                if(mainPersons[i] == _MainPerson) {
                    delete mainPersons[i];
                }
            }
        }
    }

    modifier onlyNotary(address _address) {
        bool x;
        for(uint i=0; i<notaries.length; i++) {
            if(notaries[i]==_address) {
                x = true;
            }
        }
        if(bannedNotaries[_address]==true) {
            x = false;
        }
        require(
            x == true
        );
        _;
    }
    modifier onlyMainPerson(address _address) {
        bool x = false;
        for(uint i=0; i<mainPersons.length; i++) {
            if(mainPersons[i]==_address) {
                x = true;
            }
        }
        require(
            x == true
        );
        _;
    }
    modifier owningPesel(uint _pesel, address _sender) {
        bool x;
        for(uint i=0; i<ownedWills[ _sender].length; i++) {
            if(ownedWills[ _sender][i].pesel == _pesel) {
                x = true;
            }
        }
        require(
            x == true
        );
        _;
    }
    string content;
    uint[] currentDate;
    address[] creator;
    string will;

    function showFirstPartM(uint _pesel) public view onlyMainPerson(msg.sender) returns (string memory, string memory, string memory) {
        string memory a = showName(_pesel);
        string memory b = showDate(_pesel);
        string memory c = showContent(_pesel);

        return(a, b, c);
    }

    function showSecoundPartM(uint _pesel) public view onlyMainPerson(msg.sender) returns (uint[] memory, address[] memory, string memory) {
        uint[] memory d = showCurrentDate(_pesel);
        address[] memory e = showCreator(_pesel);
        string memory f = showWill(_pesel);
        return(d, e, f);
    }

    function showFirstPartN(uint _pesel) public view onlyNotary(msg.sender) owningPesel(_pesel, msg.sender) returns (string memory, string memory, string memory) {
        string memory a = showName(_pesel);
        string memory b = showDate(_pesel);
        string memory c = showContent(_pesel);

        return(a, b, c);
    }

    function showSecoundPartN(uint _pesel) public view onlyNotary(msg.sender) owningPesel(_pesel, msg.sender) returns (uint[] memory, address[] memory, string memory) {
        uint[] memory d = showCurrentDate(_pesel);
        address[] memory e = showCreator(_pesel);
        string memory f = showWill(_pesel);
        return(d, e, f);
    }

    function showName(uint _pesel) private view returns( string memory ) {
        return(wills[_pesel].name);
    }
    function showDate(uint _pesel) private view returns( string memory ) {
        return(wills[_pesel].date);
    }
    function showContent(uint _pesel) private view returns( string memory ) {
        return(wills[_pesel].content);
    }
    function showCurrentDate(uint _pesel) private view returns( uint[] memory ) {
        return(wills[_pesel].currentDate);
    }
    function showCreator(uint _pesel) private view returns( address[] memory ) {
        return(wills[_pesel].creator);
    }
    function showWill(uint _pesel) private view returns( string memory ) {
        return(wills[_pesel].will);
    }
    function whoHasCreated(address _address) public view returns( string memory ) {
        return(notariesNames[_address]);
    }

    function addWill(uint pesel, string memory _name, string memory _date, string memory _content, string memory _will) public onlyNotary(msg.sender)  {
        ownedWills[msg.sender].push(Pesels(pesel));
        require(bytes(_will).length!=0);
        wills[pesel].name = _name;
        wills[pesel].date = _date;
        wills[pesel].content = _content;
        wills[pesel].currentDate.push(block.timestamp);
        wills[pesel].creator.push(msg.sender);
        wills[pesel].will = _will;
    }

}
