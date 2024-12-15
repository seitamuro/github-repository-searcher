import axios from "axios";

export const github_crawler = async (username: string) => {
  const repos = [];
  let page = 1;

  while (true) {
    const data = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=100&page=${page}`
    );
    if (data.data.length === 0) {
      break;
    }

    console.log(data.data);
    repos.push(...data.data);
    page += 1;
  }

  return repos;
};
