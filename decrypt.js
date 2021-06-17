const crypto = require("crypto");

const TradeInfo; // TradeInfo 為藍新回傳資料
const key = "Ch3YlpyjOVR25QCP"; // 藍新商店key
const iv = "123123"; // 藍新商店iv
const tradeInfo = await decrypt(TradeInfo, key, iv);
console.log(tradeInfo);

// 解密訂單資料
async function decrypt(TradeInfo, key, iv) {
  let decrypt = crypto.createDecipheriv("aes256", key, iv);
  decrypt.setAutoPadding(false);
  const text = decrypt.update(TradeInfo, "hex", "binary");
  const plainText = text + decrypt.final("binary");
  const result = plainText.replace(/[\x00-\x20]+/g, "");

  return result;

  // const cipher = crypto.createDecipheriv(
  //   "aes-256-cbc",
  //   key,
  //   iv
  // );
  // const decrypted = cipher.update(TradeInfo, "hex", "binary");
  // const result = stripPadding(decrypted);
  // return result;
}

function stripPadding (string) {
    const sub = string.substr(-1, 1);
    const slast = sub.charCodeAt();
    const slastc = String.fromCharCode(slast);
    const regex = new RegExp(`${slastc}{${slast}}`);
    if (string.match(regex).length > 0) {
      return string.substr(0, string.length - slast);
    }
    return false;
}
