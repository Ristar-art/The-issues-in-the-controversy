#!/usr/bin/env node
// CRAP = comp * (1 - cov)^3 + comp.  Per-function metric; flags risky code.
// Inputs: coverage/coverage-final.json (vitest --coverage) + escomplex on src.

import { readFileSync, existsSync, mkdirSync, writeFileSync, readdirSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import { cwd } from 'node:process';
import escomplex from 'typhonjs-escomplex';

const ROOT = cwd();
const COVERAGE_FILE = resolve(ROOT, 'coverage/coverage-final.json');
const OUT_DIR = resolve(ROOT, 'reports/crap');
const THRESHOLD = Number(process.env.CRAP_THRESHOLD ?? 30);
const SKIP_DIRS = new Set(['node_modules', '.svelte-kit', '.vercel', 'build', 'reports', 'stories']);

if (!existsSync(COVERAGE_FILE)) {
  console.error(`[crap] missing ${relative(ROOT, COVERAGE_FILE)} — run: npm run test:coverage`);
  process.exit(1);
}

const coverage = JSON.parse(readFileSync(COVERAGE_FILE, 'utf8'));

function srcFiles() {
  const out = [];
  function walk(dir) {
    for (const e of readdirSync(dir, { withFileTypes: true })) {
      const p = join(dir, e.name);
      if (e.isDirectory()) {
        if (SKIP_DIRS.has(e.name)) continue;
        walk(p);
      } else if (/\.(ts|js|mjs)$/.test(e.name) && !/\.d\.ts$/.test(e.name)) {
        out.push(p);
      }
    }
  }
  walk(resolve(ROOT, 'src'));
  return out;
}

function lineCoverage(file) {
  const entry = Object.values(coverage).find((c) => resolve(c.path) === resolve(file));
  if (!entry) return null;
  const stmts = entry.statementMap ?? {};
  const counts = entry.s ?? {};
  const byLine = new Map();
  for (const [id, loc] of Object.entries(stmts)) {
    const hit = (counts[id] ?? 0) > 0;
    for (let l = loc.start.line; l <= loc.end.line; l++) {
      const prev = byLine.get(l);
      byLine.set(l, prev === undefined ? hit : prev || hit);
    }
  }
  return byLine;
}

function functionCoverage(byLine, startLine, endLine) {
  if (!byLine) return 0;
  let covered = 0;
  let total = 0;
  for (let l = startLine; l <= endLine; l++) {
    if (!byLine.has(l)) continue;
    total++;
    if (byLine.get(l)) covered++;
  }
  return total === 0 ? 1 : covered / total;
}

const findings = [];

for (const file of srcFiles()) {
  const src = readFileSync(file, 'utf8');
  let report;
  try {
    report = escomplex.analyzeModule(src, { commonjs: false, logicalor: true, switchcase: true });
  } catch {
    continue;
  }
  const lines = lineCoverage(file);
  for (const fn of report.methods) {
    const comp = fn.cyclomatic;
    const start = fn.lineStart;
    const end = fn.lineEnd;
    const cov = functionCoverage(lines, start, end);
    const crap = comp * Math.pow(1 - cov, 3) + comp;
    findings.push({
      file: relative(ROOT, file),
      fn: fn.name || '<anonymous>',
      line: start,
      complexity: comp,
      coverage: Number((cov * 100).toFixed(1)),
      crap: Number(crap.toFixed(2))
    });
  }
}

findings.sort((a, b) => b.crap - a.crap);

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(join(OUT_DIR, 'crap.json'), JSON.stringify(findings, null, 2));

const risky = findings.filter((f) => f.crap > THRESHOLD);

console.log(`\nCRAP report — threshold ${THRESHOLD}\n`);
console.log('crap   complex  cov%   file:line  fn');
console.log('-----  -------  -----  ---------  --');
for (const f of findings.slice(0, 30)) {
  const flag = f.crap > THRESHOLD ? '!' : ' ';
  console.log(
    `${flag} ${String(f.crap).padStart(5)}  ${String(f.complexity).padStart(7)}  ${String(f.coverage).padStart(5)}  ${f.file}:${f.line}  ${f.fn}`
  );
}
console.log(`\nTotal functions: ${findings.length}  Risky (>${THRESHOLD}): ${risky.length}`);
console.log(`Full report: reports/crap/crap.json`);

if (process.argv.includes('--fail-on-risky') && risky.length > 0) {
  process.exit(1);
}
