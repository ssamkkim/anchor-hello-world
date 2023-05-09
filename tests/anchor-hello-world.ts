import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { AnchorHelloWorld } from "../target/types/anchor_hello_world";

describe("anchor-hello-world", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());
  const program = anchor.workspace.AnchorHelloWorld as Program<AnchorHelloWorld>;

  it('can send a new tweet', async() => {
    // Call the "SendTweet" instruction.
    const tweet = anchor.web3.Keypair.generate();
    await program.rpc.sendTweet('veganism', 'Hummus, am I right?', {
      accounts: {
        // Accounts here...
        tweet: tweet.publicKey,
        author: program.provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      }, 
      signers: [
        // Key pairs of signers here...
        tweet,
      ],
    });

    // Fetch the account details of the created tweet.
    const tweetAccount = await program.account.tweet.fetch(tweet.publicKey);
    console.log(tweetAccount);
  })
});
