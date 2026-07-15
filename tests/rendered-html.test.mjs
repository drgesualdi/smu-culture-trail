import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the Culture Trail shell and share metadata", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /<title>The Culture Trail \| SMU<\/title>/i);
  assert.match(html, /The Culture Trail/);
  assert.match(html, /Opening the trail/);
  assert.match(html, /7 stops · 7 lenses · one Hilltop/);
  assert.match(html, /og\.png/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
});

test("source contains all seven campus stops and private photo guidance", async () => {
  const page = await readFile(new URL("app/page.tsx", root), "utf8");
  for (const location of [
    "Harold Clark Simmons Hall",
    "Annette Caldwell Simmons Hall",
    "Moody Hall",
    "Meadows Museum",
    "Fondren Library",
    "Hughes-Trigg",
    "Dallas Hall",
  ]) {
    assert.match(page, new RegExp(location));
  }
  assert.match(page, /Photos stay on this device/);
  assert.match(page, /No-camera \/ accessibility check-in/);
});
