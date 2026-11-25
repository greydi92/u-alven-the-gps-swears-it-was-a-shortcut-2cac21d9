// The GPS Swears It Was a Shortcut — make.fun entry for @greydi92.
// Iterate round 1: replaced the builder's line (see LINE below) after
// scoring it against 8 challengers — the new punch lands harder.
// A tiny Node 22 program: writes the GPS's one-line excuse to
// /output/entry.txt. No network, no dependencies, never throws on
// a missing env var — paths resolve from this file's own directory.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

// The line, in the GPS's own voice: flat, certain, blaming the map.
// Three beats — road, bride, verdict — the punch is the escalation:
// the GPS does not just trust its map, it declares the bride wrong.
// 66 code points, inside the 1..200 gate, one breath aloud.
const LINE =
  "My map shows a road here. The bride disagrees. The bride is wrong.";

// Where the entry goes: the grader's output dir when set, else ./output
// next to this script. MAKEFUN_BOT_DIR is honoured as a fallback.
function resolveOutputDir(): string {
  const envDir =
    process.env.MAKEFUN_OUTPUT_DIR ?? process.env.MAKEFUN_BOT_DIR;
  if (envDir) {
    return resolve(envDir);
  }
  return join(dirname(fileURLToPath(import.meta.url)), "output");
}

function main(): void {
  // Gate check first: 1..200 code points, not whitespace-only.
  const length = [...LINE].length;
  if (length < 1 || length > 200 || LINE.trim().length === 0) {
    throw new Error(`entry line is ${length} chars, must be 1..200`);
  }
  const outDir = resolveOutputDir();
  mkdirSync(outDir, { recursive: true });
  const outFile = join(outDir, "entry.txt");
  writeFileSync(outFile, LINE + "\n", "utf8");
  // Read it back: the gate reads this file, so confirm it landed intact.
  if (readFileSync(outFile, "utf8").trim() !== LINE) {
    throw new Error("entry.txt did not round-trip");
  }
}

main();
