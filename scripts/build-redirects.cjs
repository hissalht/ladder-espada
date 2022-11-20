const fs = require("fs");
const path = require("path");

const username = process.env.CHALLONGE_USERNAME;
const apiKey = process.env.CHALLONGE_API_KEY;

const redirection = `/api/*  https://${username}:${apiKey}@api.challonge.com/v1/tournaments/:splat  200`;
fs.writeFile(
  path.resolve(__dirname, "../public/_redirects"),
  redirection,
  (err) => {
    if (err) {
      console.error("❌ Failed to write _redirects file");
      console.error(err);
      return process.exit(1);
    }

    console.log("✅ _redirects file successfully created !");
  }
);
