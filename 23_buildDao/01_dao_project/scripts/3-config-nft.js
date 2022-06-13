import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const editionDrop = sdk.getEditionDrop("0x6e08F7982bDF8bA0B2092D0d0c08dc5829232b6d");

(async () => {
  try {
    await editionDrop.createBatch([
      {
        name: "Leaf Village Headband",
        description: "This NFT will give you access to BMDAO!",
        image: readFileSync("scripts/assets/NFTDrop.png"),
      },
    ]);
    console.log("✅ Successfully created a new NFT in the drop!");
  } catch (error) {
    console.error("failed to create the new NFT", error);
  }
})();