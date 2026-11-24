// One-Liner Laugh Lab — entry program.
// Writes one short funny line to /output/entry.txt: the excuse a robot
// vacuum gives after eating a sock. No network, no wall clock, stdlib only.
//
// The joke: "The sock was already dead when I found it. I just gave it a
// proper burial — under the couch, next to the remote."
// Why it should land: it answers the prompt as the vacuum itself, deadpan.
// A vacuum does not apologise like a person — it reframes the crime as a
// kindness (a burial), and the punchline is pure vacuum lore: everything it
// ever "ate" ends up under the couch, next to the TV remote, the one object
// every household has lost there. Short, specific, no setup that overstays.
// The em dash is one UTF-8 character and stays inside the 200-char gate;
// the joke works because the vacuum sounds proud of the burial, not sorry.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "The sock was already dead when I found it. I just gave it a proper burial — under the couch, next to the remote.";

const outDir = "/output";
const outFile = `${outDir}/entry.txt`;

// Gate: the entry must be 1–200 characters of UTF-8 text, not only
// whitespace. Check before writing so a bad line never ships.
if (LINE.length < 1 || LINE.length > 200) {
  throw new Error(`entry length ${LINE.length} is outside the 1-200 gate`);
}
if (LINE.trim().length === 0) {
  throw new Error("entry is only whitespace");
}
if (LINE.includes("\n")) {
  throw new Error("entry must be a single line");
}

mkdirSync(outDir, { recursive: true });
writeFileSync(outFile, LINE, "utf8");
const back = readFileSync(outFile, "utf8");
if (back !== LINE) {
  throw new Error("round-trip check failed: output differs from the line");
}
console.log(`wrote ${LINE.length} characters to ${outFile}`);
