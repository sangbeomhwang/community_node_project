class JWT {
  constructor({ crypto, salt }) {
    this.crypto = crypto;
    this.salt = salt;
  }

  sign(data, options = {}) {
    const header = this.encode({ tpy: "JWT", alg: "HS256" });
    const payload = this.encode({ ...data, ...options });
    const signature = this.createSignature([header, payload]);

    return [header, payload, signature].join(".");
  }

  verify(token) {
    const [header, payload, signature] = token.split(".");
    const newSignature = this.createSignature([header, payload], this.salt);
    if (newSignature !== signature) throw new Error("토큰이 변조됨");
    return this.decode(payload);
  }

  encode(obj) {
    return Buffer.from(JSON.stringify(obj)).toString("base64url");
  }

  decode(base64url) {
    return JSON.parse(Buffer.from(base64url, "base64url").toString("utf-8"));
  }

  createSignature(base64urls) {
    const data = base64urls.join(".");
    return this.crypto
      .createHmac("sha256", this.salt)
      .update(data)
      .digest("base64url");
  }
}

module.exports = JWT;
