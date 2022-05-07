
const bucket = require("../config/Firebase");
const uuid = require('uuid-v4');
const fs = require('fs');

async function UploadImage(name, folder) {
  const path = "./uploads/" + name;
  const metadata = {
    metadata: {
      // This line is very important. It's to create a download token.
      firebaseStorageDownloadTokens: uuid(),
    },
    contentType: "image/png",
    cacheControl: "public, max-age=31536000",
  };

  const tasks = await bucket.upload(path, {
    // Support for HTTP requests made with `Accept-Encoding: gzip`
    gzip: true,
    metadata: metadata,
    destination: folder + name,
  });

  const urls = await tasks[0].getSignedUrl({
    action: "read",
    expires: "03-09-2491",
  });

  // Delete image
  fs.unlinkSync(path);

  return urls[0];
}

module.exports = {
  UploadImage,
};
