import { Hono } from "hono";
import { handle } from "hono/aws-lambda";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { github_crawler } from "./github_crawler";

export const app = new Hono();

app.use(cors());
app.use(logger());

app.get("/", async (c) => {
  console.log(c.req.query());
  return c.json({
    status: 200,
    params: c.req.query(),
  });
});

app.get("/crawler/github", async (c) => {
  const username = c.req.query("username");

  if (!username) {
    return c.json({
      status: 400,
      message: "username is required",
    });
  }

  try {
    //const _repos = await github_crawler(username);
    const repos = await github_crawler(username);
    //const repos = [];

    /*for (const repo of _repos) {
      repos.push(repo.name);
    }*/
    return c.json({
      status: 200,
      //num: repos.length,
      repos,
    });
  } catch (e) {
    return c.json({
      status: 500,
      message: JSON.stringify(e),
    });
  }
});

export const handler = handle(app);
