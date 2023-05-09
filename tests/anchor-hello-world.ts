import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import * as assert from "assert";
import { AnchorHelloWorld } from "../target/types/anchor_hello_world";

describe("anchor-hello-world", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  const program = anchor.workspace.AnchorHelloWorld;

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
  
    // Ensure it has the right data
    assert.equal(tweetAccount.author.toBase58(), program.provider.wallet.publicKey.toBase58());
    assert.equal(tweetAccount.topic, 'veganism');
    assert.equal(tweetAccount.content, 'Hummus, am I right?');
    assert.ok(tweetAccount.timestamp);
  })

  it('can send a new tweet without a topic', async() => {
      // Call the "SendTweet" instruction.
      const tweet = anchor.web3.Keypair.generate();
      await program.rpc.sendTweet('', 'gm', {
        accounts: {
          tweet: tweet.publicKey,
          author: program.provider.wallet.publicKey,
          systemProgram: anchor.web3.SystemProgram.programId,
        }, 
        signers: [tweet],
      });

      // Fetch the account details of the created tweet.
      const tweetAccount = await program.account.tweet.fetch(tweet.publicKey);
    
      // Ensure it has the right data
      assert.equal(tweetAccount.author.toBase58(), program.provider.wallet.publicKey.toBase58());
      assert.equal(tweetAccount.topic, '');
      assert.equal(tweetAccount.content, 'gm');
      assert.ok(tweetAccount.timestamp);
    })
});
