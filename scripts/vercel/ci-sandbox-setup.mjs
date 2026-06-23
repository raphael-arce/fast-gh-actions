/**
 * One-time setup script: creates a Vercel Sandbox snapshot with all CI
 * dependencies pre-installed (npm packages, Playwright browsers, Docker,
 * Supabase images).
 *
 * Run locally after `vercel link && vercel env pull`:
 *   node scripts/ci-sandbox-setup.mjs
 */
import { Sandbox } from "@vercel/sandbox";

const SANDBOX_NAME = "ci-base";

// Playwright's Chromium dependencies for Amazon Linux 2023
const PLAYWRIGHT_DEPS = [
  "nss",
  "alsa-lib",
  "at-spi2-atk",
  "cups-libs",
  "libdrm",
  "libXcomposite",
  "libXdamage",
  "libXrandr",
  "mesa-libgbm",
  "pango",
  "gtk3",
  "liberation-fonts",
  "xorg-x11-fonts-misc",
  "xorg-x11-server-Xvfb",
  "libXScrnSaver",
  "libXcursor",
  "libXi",
  "libXtst",
  "libxkbcommon",
];

async function run(sandbox, cmd, args = [], opts = {}) {
  console.log(`> ${cmd} ${args.join(" ")}`);
  const result = await sandbox.runCommand(cmd, args, {
    stdout: process.stdout,
    stderr: process.stderr,
    ...opts,
  });
  if (result.exitCode !== 0) {
    throw new Error(
      `Command failed with exit code ${result.exitCode}: ${cmd} ${args.join(" ")}`,
    );
  }
  return result;
}

console.log("Creating sandbox and installing all dependencies...\n");

const sandbox = await Sandbox.create({
  name: SANDBOX_NAME,
  runtime: "node22",
  resources: { vcpus: 4 },
  timeout: 30 * 60 * 1000,
  persistent: true,
  keepLastSnapshots: { count: 2 },
});

console.log(`Sandbox "${sandbox.name}" created.\n`);

// Install and start Docker (no systemd in Firecracker, start daemon directly)
await run(sandbox, "sudo", ["dnf", "install", "-y", "docker"]);
await sandbox.runCommand({
  cmd: "sudo",
  args: ["dockerd"],
  detached: true,
  stdout: process.stdout,
  stderr: process.stderr,
});
// Wait for Docker daemon to be ready
await run(sandbox, "bash", [
  "-c",
  "until sudo docker info >/dev/null 2>&1; do sleep 1; done",
]);
console.log("Docker daemon is running.");
await run(sandbox, "sudo", ["usermod", "-aG", "docker", "vercel-sandbox"]);

// Install Supabase CLI
await run(sandbox, "npm", ["install", "-g", "supabase@latest"]);

// Install Playwright system dependencies
await run(sandbox, "sudo", ["dnf", "install", "-y", ...PLAYWRIGHT_DEPS]);

// Clone repo and install npm deps
await run(sandbox, "git", [
  "clone",
  "--depth=1",
  "https://github.com/raphael-arce/fast-gh-actions.git",
  ".",
]);
await run(sandbox, "npm", ["ci"]);

// Install Playwright browsers (chromium only to match config)
await run(sandbox, "npx", ["playwright", "install", "chromium"]);

// Pull Supabase Docker images by starting and stopping
console.log("\nPulling Supabase Docker images...");
await run(sandbox, "supabase", [
  "start",
  "--exclude",
  "edge-runtime,imgproxy,logflare,postgres-meta,realtime,storage-api,supavisor,vector",
]);
await run(sandbox, "supabase", ["stop"]);

// Stop the sandbox — triggers automatic snapshot
console.log("\nStopping sandbox to create snapshot...");
await sandbox.stop();

console.log(`\nSnapshot created. Sandbox: "${SANDBOX_NAME}"`);
console.log("Run `node scripts/ci-sandbox-run.mjs` to test it.");
