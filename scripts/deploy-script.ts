import hre from "hardhat";

async function main() {

const NFT = await hre.ethers.getContractFactory("RMXhacks001");
    const nft = await NFT.deploy();

    await nft.deployed();

    console.log("deployed to:", nft.address);
}

main().then(() => process.exit(0)).catch(error => {
    console.error(error);
    process.exit(1);
});
