import { Octokit } from "octokit";

const octokit = new Octokit({
    auth: import.meta.env.VITE_SOME_KEY,
});

export default octokit;
