# cf-worker-previews-repro

A minimal reproduction for a Workers Builds / Worker Previews issue.

**The issue:** a Worker connected to Workers Builds from the dashboard gets a
`npx wrangler preview` build on **every** push to a non-production branch. The
build runs at root directory `/` with watch paths `*`, which ignores the Worker's
configured root and watch paths, and it fails because the config has no
`previews` block. The dashboard and the builds API offer no way to turn this off.

## Layout

```
workers/demo/worker.js      hello world
workers/demo/wrangler.toml  name = "previews-repro-demo", no `previews` block
```

The Worker sits in a subdirectory on purpose, as in a monorepo.

## Steps

1. Fork or clone this repo into a GitHub account connected to Cloudflare.
2. Deploy the Worker once so that it exists:
   `cd workers/demo && npx wrangler deploy`
3. In the dashboard, open **Workers & Pages → previews-repro-demo → Settings →
   Build → Connect**, and connect the repo with:
   - Production branch: `main`
   - Root directory: `workers/demo`
   - Deploy command: `npx wrangler deploy`
   - Build watch paths: include `workers/demo/*`
4. Push a commit to any other branch. It does not need to touch `workers/demo`.
5. Watch the GitHub checks on the push, or the Worker's build list.

**Expected:** no build, or at least a way to switch branch builds off.

**Actual:** a `Workers Builds: previews-repro-demo` build using a trigger named
after the branch, with `root_directory: "/"` and `deploy_command:
"npx wrangler preview"`. It fails with `Your Wrangler configuration is missing
a \`previews\` block`.

Test branch push: 2026-09-30T18:51:47Z
