
document.addEventListener('DOMContentLoaded', () => {

  //Event listener to generate encryption key each time the user types a new character in
  //secret message field
  document.querySelector("#plainText").addEventListener('keyup', event => {
    updateKey();
  });

  //Button to generate a new key
  document.querySelector("#btnNewKey").onclick = () => {
    updateKey();
  }

  //Button to encrypt message
  document.querySelector("#btnEncrypt").onclick = () => {
    encryptText();
  }

  //Button to copy key to clipboard
  document.querySelector("#btnCopyKey").onclick = () => {
    copyKey();
  }

  //Button to copy ciphertext to clipboard
  document.querySelector("#btnCopyCipher").onclick = () => {
    copyCipher();
  }

});

function showPageMsg(msgClass, msgText){
  /**
  Shows a message on top of the page, like an error or a warning
  */
  let msg = document.querySelector("#pageMsg");

  msg.setAttribute("class",msgClass);
  msg.innerText = msgText;
}

function generateKey(keyLength) {
  /**
  This function randomly generates a key of the same length of the plaintext.
  */

  //Possible characters in key
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charLength = characters.length;

  let keyArray = [];
  for (var i=0; i < keyLength; i++) {
    keyArray.push(characters.charAt(Math.floor(Math.random() * charLength)) );
  }

  let keyString = keyArray.join("");

  return keyString;
}

function updateKey() {
  /**
  This function let user update the key by generating a new random one.
  */
  let newKey = "";
  let plaintext = document.querySelector("#plainText");
  let len = plaintext.value.length;
  let otpKey = document.querySelector("#OTPKey");
  if (len > 0) {
    newKey = generateKey(len);
  } else {
    let cipherDiv = document.querySelector("#cipherText");
    cipherDiv.innerText = "";
    cipherDiv.parentElement.style.display = "none";

  }
  otpKey.value = newKey;
}

function encryptText() {
  /**
  The function encrypts text executing the bitwise XOR operation between the
  plain text and the key.
  */
  let plaintext = document.querySelector("#plainText");
  let len = plaintext.value.length;
  let otpKey = document.querySelector("#OTPKey");
  let keyLen = otpKey.value.length;

  //Check if the key has the correct length
  if (keyLen < len) {
    showPageMsg("alert alert-danger", "Incorrect key length...the key has to be at least as long as the plain text.");
    return false;
  }

  cipherArray = [];
  for (var i=0; i < len; i++) {
    let bitVal = plaintext.value[i].charCodeAt(0) ^ otpKey.value[i].charCodeAt(0);
    cipherArray.push(bitVal);
  }

  let ciphertext = cipherArray.join(" ");

  writeCypherText(ciphertext);
}

function writeCypherText(cText) {
  /**
  This function write the ciphertext rendering the div visible
  */
  let textDiv = document.querySelector("#cipherText");

  textDiv.innerText = cText;
  textDiv.parentElement.style.display = "block";
}

function copyKey(){
  /**
  Copy key to clipboard
  */
  document.querySelector("#OTPKey").select()
  document.execCommand("copy");
}

function copyCipher() {
  /**
  Copy enctypted text to clipboard
  */
  let newT = document.createElement("textarea");
  let ciphDiv = document.querySelector("#cipherText");

  newT.value = ciphDiv.innerText;
  ciphDiv.appendChild(newT);

  newT.select();
  document.execCommand("copy");

  newT.remove();
}
