import axios from "axios";
import * as fs from "fs";

const ACCESS_TOKEN = process.env.GITHUB_ACCESS_TOKEN;

const main = async () => {
  const repos = [];
  let page = 1;

  while (true) {
    try {
      const api = axios.create({
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      });
      const data = await api.get(
        `https://api.github.com/users/aws-samples/repos?per_page=100&page=${page}`
      );
      if (data.data.length === 0) {
        break;
      }
      repos.push(...data.data);
    } catch (e) {
      console.log(e);
      console.log("page: ", page);
      fs.writeFileSync("aws-samples.json", JSON.stringify(repos, null, 2));
    }
    page += 1;
  }
  fs.writeFileSync("aws-samples.json", JSON.stringify(repos, null, 2));
};

main();
