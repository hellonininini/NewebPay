const crypto = require("crypto");

// postData 為需要加密的資料陣列
const postData = [];
const tradeInfo = await encrypt(postData);
const tradeSha = await encryptSHA256(tradeInfo);
console.log(tradeSha)

async function encrypt(postData) {
  // build query
  let post_data = new URLSearchParams(postData);
  post_data = post_data.toString();
  const cipher = crypto.createCipheriv("aes-256-cbc", setting.key, setting.iv);
  const encrypted = cipher.update(addPadding(post_data), "binary", "hex");

  return encrypted;
}

// SHA256加密
async function encryptSHA256(aes) {
  const setting = await self.getConfig();
  const query_string = `HashKey=${setting.key}&${aes}&HashIV=${setting.iv}`;
  const hash = crypto.createHash("sha256").update(query_string).digest("hex");
  const result = hash.toUpperCase();

  return result;
}

function addPadding(string, blockSize = 32) {
  const len = string.length;
  const pad = blockSize - (len % blockSize);
  const chr = String.fromCharCode(pad);
  string += chr.repeat(pad);

  return string;
}
