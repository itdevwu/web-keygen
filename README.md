<div align="center">

# Web Keygen

_Crypto-safe key/password generator with no dependencies._

</div>

## Idea

Web Keygen is designed to be a simple, lightweight, and secure key/password generator. It is built with pure native JavaScript and has no dependencies. It is designed to be used in a browser environment, without transmitting any data over the network.

The crypto-safe random number generator is implemented using the [`window.crypto.getRandomValues()`](https://developer.mozilla.org/docs/Web/API/Crypto/getRandomValues) function, which leverages the browser's built-in cryptographic random number generator that uses entropy from the underlying operating system.

## Requirements

- A [modern web browser that supports the `window.crypto.getRandomValues()`](https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues#browser_compatibility) API.
- Read and understood the [LICENSE](LICENSE) file.
- Read and understood the [Q&A](#qa) section.

## Deploy

### Clone the Repository

Download the repository to your local machine:

```shell
git clone https://github.com/itdevwu/web-keygen.git
```

### Run

Open the `index.html` file in your browser would be enough to run the application.

If you want to host it on a server, you can use the following command to start a simple HTTP server (e.g. Python's built-in HTTP server):

```shell
# Python 3.x
python -m http.server
```

If you want to use a server for production, you can use a more advanced server like [Nginx](https://nginx.org/), [Apache](https://httpd.apache.org/) or [Caddy](https://caddyserver.com/).

## Q&A

### Why not use `Math.random()`?

`Math.random()` is not cryptographically secure. It's a pseudo-random number generator (PRNG) that generates numbers based on a seed value, which makes it predictable.

### Does it transmit any data over the network?

Except the loading of the application itself, it does not transmit any data over the network. It can be used offline without any issues.

### If I host it on a server, do I need to set up HTTPS (SSL/TLS)?

Generally speaking, crypto suites such as SSL, TLS, ECH, etc., are designed to secure the communication between the client and the server. In this case, the application does not communicate with the server.

However, it is still recommended to use HTTPS, because it provides extra security for the application itself, and it's a good practice to use HTTPS whenever possible.

### Can I trust this application?

I wrote this application to make it trustworthy for myself. However, it's only designed for educational purposes. All the code is open-source and can be reviewed or audited by anyone.

You may use at your own risk. As this project is licensed under the Apache License 2.0, the author(s) will not be liable for any damages or losses caused by the use of this application.

### May I use it in production?

It's licensed under the Apache License 2.0. You may use it in compliance with the license terms.

It's recommended to review the code, test it, and audit it before using it. Although you can use it in production, it's initially designed for educational purposes to demonstrate usage of the crypto-safe API in a browser environment.

### If you can't make sure it's flawless, why call it "crypto-safe"?

The term "crypto-safe", or "cryptographic secure", refers to the use of a set of cryptographic algorithms and protocols, that proves mathematically to be secure against some known attacks.

In this case, the term "crypto-safe" refers to the use of a standard crypto-safe API, which is a part of the Web Cryptography API. The Web Cryptography API is designed and implemented by the browser vendors. This means your trust in this application is based on your trust in the browser vendors and the underlying operating system.

Using such terms is not a guarantee of the application's security, but a reference to the use of a standard cryptographic API. Even if the RNG is secure, the application itself may be flawed or compromised due to other reasons such as bugs, misconfigurations, etc.

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

