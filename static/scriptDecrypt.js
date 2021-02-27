document.addEventListener("DOMContentLoaded", () => {

  document.querySelector("#btnDecrypt").onclick = () => {
    decryptMsg();
  }
});

function showPageMsg(msgClass, msgText){
  let msg = document.querySelector("#pageMsg");

  msg.setAttribute("class",msgClass);
  msg.innerText = msgText;
}


function decryptMsg(){
  let ciphertext = document.querySelector("#cipherText").value;
  let otpkey = document.querySelector("#OTPKey").value;

  let cipherarray = ciphertext.split(" ");
  console.log(cipherarray);

  if (otpkey.length < cipherarray.length) {
    showPageMsg("alert alert-danger", "Key is too short...");
    return false;
  }

  let plaintextarray = [];
  for(i=0;i < otpkey.length; i++) {
    bitVal = otpkey[i].charCodeAt(0) ^ parseInt(cipherarray[i]);
    plaintextarray.push(String.fromCharCode(parseInt(bitVal)));
  }
  console.log(plaintextarray);
  let plaintext = plaintextarray.join("");

  writePlainText(plaintext);
}

function writePlainText(pText) {
  let plainDiv = document.querySelector("#plainText");
  let plainLabel = document.querySelector("#labelPlaintext");

  plainLabel.innerText = "Plain text message";
  plainDiv.innerText = pText;
  plainDiv.style.display = "block";
}
