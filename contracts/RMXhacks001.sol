// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

//  ________  _____ ______      ___    ___ ________  ________  ________  _________    ___    ___
// |\   __  \|\   _ \  _   \   |\  \  /  /|\   __  \|\   __  \|\   __  \|\___   ___\ |\  \  /  /|
// \ \  \|\  \ \  \\\__\ \  \  \ \  \/  / \ \  \|\  \ \  \|\  \ \  \|\  \|___ \  \_| \ \  \/  / /
//  \ \   _  _\ \  \\|__| \  \  \ \    / / \ \   ____\ \   __  \ \   _  _\   \ \  \   \ \    / /
//   \ \  \\  \\ \  \    \ \  \  /     \/ __\ \  \___|\ \  \ \  \ \  \\  \|   \ \  \   \/  /  /
//    \ \__\\ _\\ \__\    \ \__\/  /\   \|\__\ \__\    \ \__\ \__\ \__\\ _\    \ \__\__/  / /
//     \|__|\|__|\|__|     \|__/__/ /\ __\|__|\|__|     \|__|\|__|\|__|\|__|    \|__|\___/ /
//     https://www.rmx.party   |__|/ \|__|                                          \|___|/

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import {LicenseVersion, CantBeEvil} from "@a16z/contracts/licenses/CantBeEvil.sol";

import "./HelloSvgs.sol";

contract RMXhacks001 is
    ERC721Enumerable,
    ERC721Burnable,
    AccessControl,
    CantBeEvil
{
    using Counters for Counters.Counter;
    using Strings for uint256;
    using HelloSvgs for string;

    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    Counters.Counter private _tokenIdCounter;
    mapping(uint256 => string) private _tokenSVGs;
    string private _contractMetadataURI;
    string public constant description =
        unicode"Say hello to the first experiment of our RMXhacks series. Powered by ERC-4337, mint two separate NFTs with one click — no wallet needed, no signature needed. We’re testing for usability, without the frills (pizza bagel included).";
    string public constant contractMoreDescription =
        unicode"\n\nRead more about RMXhacks here: https://mirror.xyz/rmxparty.eth/bSbFlMzy7X7NNW11tLc-HYWeMt6NvReTDVTQUkI_UcQ";
    string public constant jsonbase = "data:application/json;base64,";
    string public constant imgbase = "data:image/svg+xml;base64,";

    constructor()
        ERC721("RMXhacks-001", "RMXhacks-001")
        CantBeEvil(LicenseVersion.PUBLIC)
    {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(MINTER_ROLE, msg.sender);

        _contractMetadataURI = _initializeContractMetadataURI();
    }

    function mintNFT() public onlyRole(MINTER_ROLE) {
        _tokenIdCounter.increment();
        uint256 newTokenId = _tokenIdCounter.current();
        _safeMint(msg.sender, newTokenId);

        if (newTokenId % 2 == 0) {
            _tokenSVGs[newTokenId] = HelloSvgs.createSvgPizzaBagel();
        } else {
            _tokenSVGs[newTokenId] = HelloSvgs.createSvgHelloWorld();
        }
    }

    function setTokenSVG(
        uint256 tokenId,
        string memory svg
    ) public onlyRole(DEFAULT_ADMIN_ROLE) {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI set of nonexistent token"
        );
        require(bytes(svg).length != 0, "SVG: svg must be provided");

        _tokenSVGs[tokenId] = svg;
    }

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721) returns (string memory) {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );

        return
            string(
                abi.encodePacked(
                    jsonbase,
                    Base64.encode(_formatTokenURI(tokenId))
                )
            );
    }

    function _formatTokenURI(
        uint256 tokenId
    ) internal view returns (bytes memory) {
        return
            bytes(
                string(
                    abi.encodePacked(
                        "{",
                        _formatTokenNameJson(tokenId),
                        _formatTokenDescriptionJson(),
                        _formatTokenImageURIJson(tokenId),
                        "}"
                    )
                )
            );
    }

    function _formatTokenNameJson(
        uint256 tokenId
    ) internal pure returns (string memory) {
        string memory _tokenName;
        if (tokenId % 2 == 0) {
            _tokenName = '"Pizza, Bagel!"';
        } else {
            _tokenName = '"Hello, World!"';
        }
        return string(abi.encodePacked('"name": ', _tokenName, ","));
    }

    function _formatTokenDescriptionJson()
        internal
        pure
        returns (string memory)
    {
        return string(abi.encodePacked('"description": "', description, '",'));
    }

    function _formatTokenImageURIJson(
        uint256 tokenId
    ) internal view returns (string memory) {
        return
            string(
                abi.encodePacked(
                    '"image": "',
                    imgbase,
                    Base64.encode(bytes(_tokenSVGs[tokenId])),
                    '"'
                )
            );
    }

    function contractURI() public view returns (string memory) {
        return _contractMetadataURI;
    }

    function setContractURI(
        string memory uri
    ) public onlyRole(DEFAULT_ADMIN_ROLE) {
        _contractMetadataURI = uri;
    }

    function _initializeContractMetadataURI()
        internal
        pure
        returns (string memory)
    {
        return
            string(
                abi.encodePacked(
                    jsonbase,
                    Base64.encode(
                        bytes(
                            string(
                                abi.encodePacked(
                                    "{",
                                    _formatContractNameJson(),
                                    _formatContractDescriptionJson(),
                                    _formatContractImageURIJson(),
                                    "}"
                                )
                            )
                        )
                    )
                )
            );
    }

    function _formatContractNameJson() internal pure returns (string memory) {
        return string(abi.encodePacked(unicode'"name": "RMXhacks—001",'));
    }

    function _formatContractDescriptionJson()
        internal
        pure
        returns (string memory)
    {
        return
            string(
                abi.encodePacked('"description": "', description, contractMoreDescription, '",')
            );
    }

    function _formatContractImageURIJson()
        internal
        pure
        returns (string memory)
    {
        return
            string(
                abi.encodePacked(
                    '"image": "',
                    imgbase,
                    Base64.encode(bytes(HelloSvgs.createSvgCollection())),
                    '"'
                )
            );
    }

    // The following functions are overrides required by Solidity.

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId,
        uint256 batchSize
    ) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    function _burn(uint256 tokenId) internal override(ERC721) {
        super._burn(tokenId);
    }

    function supportsInterface(
        bytes4 interfaceId
    )
        public
        view
        override(ERC721, ERC721Enumerable, AccessControl, CantBeEvil)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
