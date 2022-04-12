// var web3 = new Web3(window.solana);
var web3 = solanaWeb3;
var sender = {
    pubKey : null,
    balance : 0
}


function setHeader()
{
              document.getElementById("submitbtn").style.visibility = "hidden";
              document.getElementById("currnet").style.visibility = "visible";
              var solnet = document.getElementById("network")
              if(solnet.value === "mainnet-beta")
              document.getElementById("currnet").innerHTML = "Network ---> Mainnet"
              if(solnet.value === "devnet")
              document.getElementById("currnet").innerHTML = "Network ---> Devnet"
              if(solnet.value === "testnet")
              document.getElementById("currnet").innerHTML = "Network ---> Testnet"
              let connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl(solnet.value), 'confirmed');
      
              connection.getBalance(provider.publicKey).then(function (value) {
      
              console.log("Balance: " + (value/1000000000) + " SOL");
              var money = document.getElementById("balance").innerText = (value/1000000000 + " SOL");
            })
}
  
console.log("Solana web3: ",solanaWeb3);
async function ConnectPhantomWallet() {

    window.solana.on("connect", () => document.getElementById("status").innerText="Connected")
      const isPhantomInstalled = window.solana && window.solana.isPhantom;
      if ( isPhantomInstalled ) {
        if ("solana" in window) {
          const provider = window.solana;
          console.log("Phantom is Present");
          if (provider.isPhantom) {
            if (!provider.isConnected) {
              try {   
                document.getElementById("buffer").style.visibility = "hidden";
                document.getElementById("enter").style.visibility = "visible";
                document.getElementById("details").style.visibility = "visible";
                document.getElementById("address_p").style.visibility = "visible";
                document.getElementById("balance").style.visibility = "visible";
                document.getElementById("balance_p").style.visibility = "visible";
                document.getElementById("tranotify").style.visibility = "visible";
                document.getElementById("tranotify_p").style.visibility = "visible";
                document.getElementById("sendSol").style.visibility = "visible";
                document.getElementById("addresssol").style.visibility = "visible";
                document.getElementById("solvalue").style.visibility = "visible";
                document.getElementById("network").style.visibility = "visible";
                document.getElementById("currnet").style.visibility = "visible";
                document.getElementById("submitbtn").style.visibility = "hidden";
                // document.getElementById("network").style.visibility = "visible";
                // document.getElementById("meme").style.visibility = "hidden";
                document.getElementById("disconnectSol").style.visibility = "visible";
                    
                // var solnet = document.getElementById("network");
                var solnet = document.getElementById("network")
                if(solnet.value === "mainnet-beta")
                document.getElementById("currnet").innerHTML = "Network ---> Mainnet"
                if(solnet.value === "devnet")
                document.getElementById("currnet").innerHTML = "Network ---> Devnet"
                if(solnet.value === "testnet")
                document.getElementById("currnet").innerHTML = "Network ---> Testnet"
                // let connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl(solnet.value), 'confirmed');



                var test = await window.solana.connect();
                sender.pubKey = test.publicKey;
                let provider = window.solana;
                console.log("Address ---> ",test.publicKey.toString());
                var public_key = document.getElementById("address_p").innerText = ("Address: " + test.publicKey.toString());
                // var solnet = document.getElementById("network")
                // if(solnet.value === "mainnet-beta")
                // document.getElementById("currnet").innerHTML = "Network ---> Mainnet"
                // if(solnet.value === "devnet")
                // document.getElementById("currnet").innerHTML = "Network ---> Devnet"
                // if(solnet.value === "testnet")
                // document.getElementById("currnet").innerHTML = "Network ---> Testnet"
                let connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl(solnet.value), 'confirmed');
        
                connection.getBalance(provider.publicKey).then(function (value) {
        
                console.log("Balance: " + (value/1000000000) + " SOL");
                var money = document.getElementById("balance").innerText = (value/1000000000 + " SOL");
        
                });
                return window.solana;
              } catch (err) {
              }
            } else {
              await window.solana.connect();
              return window.solana;
            }    
          }
        } else {
          return false;
        }
      } else {
        return false;
        
      }
  }
  var provider = window.solana
  async function SendPhantom()
  {
    // var web3 = solanaWeb3;
    var receiver = document.getElementById("addresssol");
    var solvalue = document.getElementById("solvalue");
    try {
      var finalReceiver = new web3.PublicKey(receiver.value);
    } catch (error) {
      alert(error.message)
    }
    
    var sol = solvalue.value
    if(solvalue.value < 0)
    {
      alert("Enter SOL value greater than 0 to transact")
    }
    console.log("Receiver's Address ---> ", receiver.value);
    console.log("SOL value to be sent ---> ",solvalue.value);
    var recieverWallet = new web3.PublicKey(finalReceiver);

    console.log("Empty receiver  --->  ",receiver.value);
    var sol = solvalue.value
    console.log("SOL VALUE ---> ",solvalue.value);

    var solnet = document.getElementById("network")
    if(solnet.value === "mainnet-beta")
    document.getElementById("currnet").innerHTML = "Network ---> Mainnet"
    if(solnet.value === "devnet")
    document.getElementById("currnet").innerHTML = "Network ---> Devnet"
    if(solnet.value === "testnet")
    document.getElementById("currnet").innerHTML = "Network ---> Testnet"
    let connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl(solnet.value), 'confirmed');

    console.log("Receive wallet ---> ",finalReceiver.toString());
    console.log("Sender address ---> ",sender.pubKey.toString() );  

    var transaction = await new web3.Transaction().add(
      web3.SystemProgram.transfer({
        fromPubkey: sender.pubKey,
        toPubkey: new web3.PublicKey(recieverWallet),
        lamports: sol * web3.LAMPORTS_PER_SOL //Investing 1 SOL. Remember 1 Lamport = 10^-9 SOL.
      }),
    );
  
    // Setting the variables for the transaction
    transaction.feePayer = sender.pubKey;
    let blockhashObj = await connection.getRecentBlockhash();
    transaction.recentBlockhash = await blockhashObj.blockhash;
  
    // Transaction constructor initialized successfully
    if(transaction) {
      console.log("Txn created successfully");
    }
    try {
      // var web3 = solanaWeb3;
    // Request creator to sign the transaction (allow the transaction)
    let signed = await provider.signTransaction(transaction);
    // The signature is generated
    let signature = await connection.sendRawTransaction(signed.serialize());
    // Confirm whether the transaction went through or not
    await connection.confirmTransaction(signature);
  
    //Signature will be printed here
    console.log("Signature: ", signature);
    var tranotify = document.getElementById("tranotify").innerText = ("Signature " + signature)

    alert("Transaction Successful")  
    } catch (error) {
      alert("Transaction Cancelled")
      document.getElementById("tranotify").innerText = ("Error " + error.message)
    }
    
  }
  
async function DisconnectPhantom(){
  window.solana.disconnect();
  window.solana.request({ method: "disconnect" });
  // window.solana.on('disconnect', () => console.log("::::: Phantom Disconnected ::::"))
  window.solana.on('disconnect', () => {
    document.getElementById("status").innerText=("Disconnected");
    document.getElementById("address_p").innerText = ("Address: " );
    document.getElementById("balance").innerText = (" SOL");
    document.getElementById("tranotify").innerText = "Siganture"
    document.getElementById("disconnectSol").style.visibility = "hidden";
    document.getElementById("submitbtn").style.visibility = "visible";
    document.getElementById("network").style.visibility = "hidden";
    document.getElementById("currnet").style.visibility = "hidden";
  })
  window.solana.disconnect();
  alert("Wallet Disconnected");
}