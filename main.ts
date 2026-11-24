// Funniest Time Machine Warning Label — burn entry.
// Writes one warning label (<=120 chars) to
// $MAKEFUN_OUTPUT_DIR/entry.txt. The joke is a grandfather-paradox
// hazard delivered as a deadpan safety notice: the punch lands on
// the last words, when the traveller has already disappointed
// a grandfather he has not met yet.
// Revision: "introduce yourself" replaces "shake hands" — a sharper
// paradox setup (introducing yourself to your own grandfather);
// "but" replaces "and" for a harder contrast with "has not met
// you yet"; "have already" tightened to "already".
import { writeFileSync, mkdirSync, readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { join } from "node:path";

const ENTRY =
  "WARNING: Do not introduce yourself to your grandfather. He has not met you yet, but you already disappointed him.";

// Validation: 1-120 chars, single line, no trailing newline.
if (ENTRY.length < 1 || ENTRY.length > 120) throw new Error(`length ${ENTRY.length} out of 1-120`);
if (ENTRY.includes("\n")) throw new Error("entry must be a single line");

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");

// Read-back check: file on disk must be byte-identical to ENTRY.
const back = readFileSync(outPath, "utf8");
if (back !== ENTRY) throw new Error("read-back mismatch");
if (back.endsWith("\n")) throw new Error("entry must not end with a newline");
const sha = createHash("sha256").update(back, "utf8").digest("hex");
console.log(`wrote ${ENTRY.length} chars, sha256 ${sha}, read-back OK`);
