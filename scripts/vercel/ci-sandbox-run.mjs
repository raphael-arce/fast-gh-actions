/**
 * CI test runner: forks a single Vercel Sandbox from a pre-built snapshot,
 * starts Supabase, uploads latest code, and runs all Playwright tests.
 *
 * Usage (from GH Actions or locally):
 *   VERCEL_TOKEN=... node scripts/ci-sandbox-run.mjs
 */
import { Sandbox } from "@vercel/sandbox";

const BASE_SANDBOX = "ci-base";
const RUN_ID = process.env.GITHUB_RUN_ID || Date.now();

// Fork from the pre-built snapshot (repo already cloned inside)
console.log("Forking sandbox from snapshot...");
const sandbox = await Sandbox.fork({
  sourceSandbox: BASE_SANDBOX,
  name: `ci-run-${RUN_ID}`,
  resources: { vcpus: 4 },
  timeout: 15 * 60 * 1000,
  persistent: false,
  env: {
    CI: "true",
    VITE_SUPABASE_URL: process.env.VITE_SUPABASE_URL,
    VITE_SUPABASE_ANON_KEY: process.env.VITE_SUPABASE_ANON_KEY,
    TEST_SUPABASE_SERVICE_ROLE_KEY: process.env.TEST_SUPABASE_SERVICE_ROLE_KEY,
    TEST_MAILPIT_URL: process.env.TEST_MAILPIT_URL,
  },
  teamId: process.env.VERCEL_TEAM_ID,
  projectId: process.env.VERCEL_PROJECT_ID,
  token: process.env.VERCEL_TOKEN,
});

try {
  // Start Docker + Supabase (images cached in snapshot, just container creation)
  console.log("Starting Docker...");
  await sandbox.runCommand({ cmd: "sudo", args: ["dockerd"], detached: true });
  await sandbox.runCommand("bash", [
    "-c",
    "until sudo docker info >/dev/null 2>&1; do sleep 1; done",
  ]);

  console.log("Starting Supabase...");
  const supabaseStart = await sandbox.runCommand({
    cmd: "supabase",
    args: [
      "start",
      "--exclude",
      "edge-runtime,imgproxy,logflare,postgres-meta,realtime,storage-api,supavisor,vector",
    ],
    stdout: process.stdout,
    stderr: process.stderr,
  });

  if (supabaseStart.exitCode !== 0) {
    console.error("Supabase failed to start");
    process.exit(1);
  }

  // Pull latest code (snapshot has the repo, just fetch the PR ref)
  console.log("Pulling latest code...");
  if (process.env.GITHUB_SHA) {
    await sandbox.runCommand("git", ["pull"]);
    await sandbox.runCommand("npm", ["ci"]);
  }

  // Wait for Supabase
  await sandbox.runCommand("bash", [
    "-c",
    "until curl -s http://127.0.0.1:54321/rest/v1/ >/dev/null; do sleep 1; done",
  ]);
  console.log("Supabase is ready!");

  // Run all tests
  console.log("Running Playwright tests...");
  const result = await sandbox.runCommand({
    cmd: "npx",
    args: ["playwright", "test", "--project=chromium"],
    stdout: process.stdout,
    stderr: process.stderr,
  });

  await sandbox.stop();
  process.exit(result.exitCode);
} finally {
  await sandbox.stop();
  process.exit(0);
}