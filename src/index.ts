import { Probot } from "probot";
import check from "./check";

export = (app: Probot) => {
  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
  app.log("tlb loaded.");
  app.on([
    "pull_request.opened",
    "pull_request.edited",
    "pull_request.synchronize",
    "pull_request_review",
    "pull_request_review_comment",
  ], async context => {
    let pr = context.payload.pull_request;
    let tasks = check(pr.body);

    let status = {
      name: "tlb",
      head_branch: "",
      head_sha: pr.head.sha,
      started_at: (new Date).toISOString(),
      completed_at: (new Date).toISOString(),
      conclusion: "action_required",
      status: "in_progress",
      output: {
        title: (tasks.total - tasks.remaining) + " / " + tasks.total + " completed",
        summary: tasks.remaining + " task" + (tasks.remaining > 1 ? "s" : "") + " left",
        text: "Checking if any tasks need to be completed before merging."
      },
      request: {
        retires: 3,
        retryAfter: 3
      },
    } 

    if (tasks.remaining === 0) {
      status.status = "completed";
      status.conclusion = "success";
      status.completed_at = (new Date).toISOString();
      status.output.summary = "Tasks completed";
    }

    return context.octokit.checks.create(context.repo(status))
  });
};
