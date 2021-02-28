document.addEventListener("DOMContentLoaded", () => {

  document.querySelector("#cipherText").addEventListener('keyup', event => {
    cleanFields();
  });

  document.querySelector("#btnDecrypt").onclick = () => {
    decryptMsg();
  }

  document.querySelector("#btnCopyPlain").onclick = () => {
    copyPlain();
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

  if (otpkey.length < cipherarray.length) {
    showPageMsg("alert alert-danger", "Key is too short...");
    return false;
  }

  let plaintextarray = [];
  for(i=0;i < otpkey.length; i++) {
    bitVal = otpkey[i].charCodeAt(0) ^ parseInt(cipherarray[i]);
    plaintextarray.push(String.fromCharCode(parseInt(bitVal)));
  }

  let plaintext = plaintextarray.join("");

  writePlainText(plaintext);
}

function writePlainText(pText) {
  let plainDiv = document.querySelector("#plainText");

  plainDiv.innerText = pText;
  plainDiv.parentElement.style.display = "block";
}

function copyPlain() {
  let newT = document.createElement("textarea");
  let plainDiv = document.querySelector("#plainText");

  newT.value = plainDiv.innerText;
  plainDiv.appendChild(newT);

  newT.select();
  document.execCommand("copy");

  newT.remove();
}

function cleanFields() {
  let ciph = document.querySelector("#cipherText");

  if (ciph.innerText.length == 0) {
    document.querySelector("#OTPKey").value = "";
    document.querySelector("#OTPKey").value = "";
    document.querySelector("#plainText").innerText = "";
    document.querySelector(".cipherDiv").style.display = "none";
  }

}
