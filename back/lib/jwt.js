class JWT {
  constructor({ crypto }) {
    this.crypto = crypto;
  }

  createToken(payloadData) {
    const header = this.encode({ tpy: "JWT", alg: "HS256" });
    const payload = this.encode(payloadData);
    const signature = this.createSignature([header, payload]);

    return [header, payload, signature].join(".");
  }

  encode(value) {
    return Buffer.from(JSON.stringify(value)).toString("base64Url");
  }

  decode(encodedValue) {
    return JSON.parse(Buffer.from(encodedValue, "base64Url").toString("utf-8"));
  }

  createSignature(sourceArr, salt = "web7722") {
    const splitArr = sourceArr.join(".");
    return this.crypto
      .createHmac("sha256", salt)
      .update(splitArr)
      .digest("base64Url");
  }

  verifyToken(token, salt) {
    const [header, payload, signature] = token.split(".");
    const newSignature = this.createSignature([header, payload], salt);
    if (newSignature !== signature) {
      throw new Error("토큰값이 다릅니다");
    }

    return this.decode(payload);
  }
}

module.exports = JWT;
