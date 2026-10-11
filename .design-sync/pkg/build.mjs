#!/usr/bin/env node
// Design-sync pre-build (cfg.buildCmd): emits the .d.ts tree for index.ts and
// compiles the site's Tailwind stylesheet. Run from the repo root.
import { execFileSync } from 'node:child_process';
import { readFileSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';

const pkg = resolve('.design-sync/pkg');
const repo = resolve('.');
rmSync(join(pkg, 'types'), { recursive: true, force: true });
execFileSync(join(repo, 'node_modules/.bin/tsc'), ['-p', join(pkg, 'tsconfig.json')], { stdio: 'inherit' });

// tsc keeps `@/x` path aliases in emitted .d.ts - rewrite to relative paths
// inside the types tree so ts-morph resolves them without the tsconfig.
const typesRoot = join(pkg, 'types');
const walk = (d) => readdirSync(d).flatMap((n) => {
  const p = join(d, n);
  return statSync(p).isDirectory() ? walk(p) : p.endsWith('.d.ts') ? [p] : [];
});
for (const f of walk(typesRoot)) {
  const src = readFileSync(f, 'utf8');
  const out = src.replace(/(["'])@\/([^"']+)\1/g, (_, q, p) => {
    let rel = relative(dirname(f), join(typesRoot, p)).split('\\').join('/');
    if (!rel.startsWith('.')) rel = './' + rel;
    return q + rel + q;
  });
  if (out !== src) writeFileSync(f, out);
}

execFileSync(
  join(repo, '.ds-sync/node_modules/.bin/tailwindcss'),
  ['-i', join(pkg, 'styles.src.css'), '-o', join(pkg, 'dist/taqeemak.css')],
  { stdio: 'inherit', cwd: repo },
);
