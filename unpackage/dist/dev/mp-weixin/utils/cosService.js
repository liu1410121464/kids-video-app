"use strict";
const common_vendor = require("../common/vendor.js");
const utils_cosConfig = require("./cosConfig.js");
let cosInstance = null;
function getCOSInstance() {
  if (cosInstance)
    return cosInstance;
  cosInstance = new common_vendor.CosCloud({
    SecretId: utils_cosConfig.COS_SECRET_ID,
    SecretKey: utils_cosConfig.COS_SECRET_KEY
  });
  return cosInstance;
}
function parseCOSKey(url) {
  const cosUrlMatch = url.match(
    /^https?:\/\/[^/]+\.cos\.[^/]+\.myqcloud\.com\/(.+)/
  );
  if (cosUrlMatch) {
    return decodeURIComponent(cosUrlMatch[1]);
  }
  return url;
}
function isCOSUrl(url) {
  if (!url)
    return false;
  return /^https?:\/\/[^/]+\.cos\.[^/]+\.myqcloud\.com\//.test(url);
}
function getCOSObjectUrl(cosKey) {
  return new Promise((resolve, reject) => {
    const cos = getCOSInstance();
    cos.getObjectUrl(
      {
        Bucket: utils_cosConfig.COS_BUCKET,
        Region: utils_cosConfig.COS_REGION,
        Key: cosKey,
        Sign: true,
        Expires: utils_cosConfig.COS_URL_EXPIRES
      },
      (err, data) => {
        if (err) {
          common_vendor.index.__f__("error", "at utils/cosService.js:82", "[COS SDK] getObjectUrl 失败:", err);
          reject(err);
          return;
        }
        common_vendor.index.__f__("log", "at utils/cosService.js:86", "[COS SDK] getObjectUrl 成功:", data.Url);
        resolve(data.Url);
      }
    );
  });
}
function getSignedVideoUrl(fileUrl) {
  return new Promise(async (resolve, reject) => {
    try {
      const cosKey = parseCOSKey(fileUrl);
      common_vendor.index.__f__("log", "at utils/cosService.js:104", "[COS SDK] 解析 Key:", cosKey);
      const signedUrl = await getCOSObjectUrl(cosKey);
      common_vendor.index.__f__("log", "at utils/cosService.js:107", "[COS SDK] 签名播放链接:", signedUrl);
      resolve(signedUrl);
    } catch (err) {
      common_vendor.index.__f__("error", "at utils/cosService.js:111", "[COS SDK] 签名失败:", err);
      reject(err);
    }
  });
}
exports.getSignedVideoUrl = getSignedVideoUrl;
exports.isCOSUrl = isCOSUrl;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/cosService.js.map
