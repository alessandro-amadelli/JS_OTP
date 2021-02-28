# JS_OTP_ENCRYPTION
## JavaScript One Time Pad encryption implementation

This very simple web site lets you encrypt and decrypt using One Time Pad (OTP) encryption
which is an encryption algorithm that offers perfect secrecy via a single
use key.

### Pros
Perfect secrecy: as long as an attacker doesn't have the key associated with the cyhertext,
it can't decode the message in any way but by trying and guess the key.
Very simple implementation and usage

### Cons
You have to exchange the key in a secret and secure way.
The key is the same length of the original message, meaning that if you have a very large text, the
key will be large too.
