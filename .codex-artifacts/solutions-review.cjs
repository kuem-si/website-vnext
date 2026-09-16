const {
  chromium,
} = require("C:/Users/mladen.simeunovic/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright");
const fs = require("node:fs");
const assert = require("node:assert/strict");
const base = process.env.REVIEW_BASE || "http://127.0.0.1:4444";
(async () => {
  const browser = await chromium.launch({
    executablePath:
      "C:/Users/mladen.simeunovic/AppData/Local/ms-playwright/chromium-1234/chrome-win64/chrome.exe",
  });
  const results = [],
    errors = [];
  try {
    for (const width of [2276, 1920, 1440, 1024, 768, 390]) {
      const page = await browser.newPage({
        viewport: { width, height: 1000 },
        reducedMotion: "reduce",
      });
      page.on("pageerror", (e) => errors.push(`${width}: ${e.message}`));
      page.on("console", (e) => {
        if (e.type() === "error") errors.push(`${width}: ${e.text()}`);
      });
      await page.goto(base + "/resitve", { waitUntil: "networkidle" });
      await page.evaluate(async () => {
        await document.fonts.ready;
        document
          .querySelectorAll('img[loading="lazy"]')
          .forEach((img) => (img.loading = "eager"));
        await Promise.all(
          [...document.images].map((img) => img.decode().catch(() => {})),
        );
        document.querySelector("astro-dev-toolbar")?.remove();
      });
      const result = await page.evaluate(() => ({
        width: innerWidth,
        scrollWidth: document.documentElement.scrollWidth,
        overflow: [...document.querySelectorAll("main *")]
          .filter(
            (el) =>
              el.getClientRects().length &&
              !el.closest(
                "svg,.hp-nexavia-mark,.sol-section-nav,.sol-ambient",
              ) &&
              (el.getBoundingClientRect().left < -1 ||
                el.getBoundingClientRect().right > innerWidth + 1),
          )
          .map((el) => String(el.className)),
        missingImages: [...document.images]
          .filter((img) => !img.complete || !img.naturalWidth)
          .map((img) => img.src),
        deadAnchors: [...document.querySelectorAll('a[href^="#"]')]
          .filter((a) => !document.getElementById(a.hash.slice(1)))
          .map((a) => a.href),
        h1: document.querySelectorAll("h1").length,
        active: document
          .querySelector('[aria-current="page"]')
          ?.getAttribute("href"),
        canonical: document.querySelector('link[rel="canonical"]').href,
        animations: document
          .getAnimations()
          .filter((a) => a.playState === "running").length,
        mainFlow: [...document.querySelectorAll(".sol-flow-hero strong")].map(
          (el) => el.textContent,
        ),
        flowIcons: document.querySelectorAll(".sol-flow ol .hp-icon").length,
      }));
      results.push(result);
      await page.screenshot({
        path: `.codex-artifacts/solutions-${width}.png`,
        fullPage: true,
      });
      await page.screenshot({
        path: `.codex-artifacts/solutions-top-${width}.png`,
      });
      for (const id of [
        "zajem",
        "povezljivost",
        "integracije",
        "nexavia-kai",
        "noc",
      ]) {
        await page.locator(`.sol-section-nav a[href="#${id}"]`).click();
        const y = await page
          .locator("#" + id)
          .evaluate((el) => el.getBoundingClientRect().top);
        assert(
          y >= (width <= 580 ? 72 : width <= 1200 ? 78 : 88),
          `Header overlap at ${width}, ${id}: ${y}`,
        );
      }
      if (width === 390) {
        const menu = page.locator(".hp-menu");
        await menu.focus();
        await page.keyboard.press("Enter");
        assert.equal(await menu.getAttribute("aria-expanded"), "true");
        await page.keyboard.press("Tab");
        assert.equal(
          await page.locator(":focus").getAttribute("href"),
          "/resitve",
        );
        await page.keyboard.press("Escape");
        assert.equal(await menu.getAttribute("aria-expanded"), "false");
        assert.equal(
          await page.locator(":focus").getAttribute("class"),
          "hp-menu",
        );
        await page.locator("[data-sol-dashboard]").click();
        assert.equal(
          await page.locator("#solutions-dashboard").evaluate((el) => el.open),
          true,
        );
        await page.keyboard.press("Escape");
        assert.equal(
          await page.locator("#solutions-dashboard").evaluate((el) => el.open),
          false,
        );
        await page.locator('.hp-footer a[href="/#zgodbe"]').click();
        await page.waitForURL("**/#zgodbe");
        await page.evaluate(() => document.fonts.ready);
        const y = await page
          .locator("#zgodbe")
          .evaluate((el) => el.getBoundingClientRect().top);
        assert(
          y >= 70 && y < innerHeightFallback(),
          `Cross-page hash position ${y}`,
        );
        await page.locator('.hp-footer a[href="/resitve"]').click();
        await page.waitForURL("**/resitve");
        await page.reload();
        assert.match(await page.title(), /^Rešitve \| KUEM/);
      }
      if (width === 1440) {
        const links = await page
          .locator('a[href^="/"]')
          .evaluateAll((els) => [
            ...new Set(els.map((a) => a.getAttribute("href"))),
          ]);
        result.links = [];
        for (const href of links) {
          const response = await page.request.get(base + href);
          result.links.push({ href, status: response.status() });
          if (href.startsWith("/#")) {
            const html = await response.text();
            assert(
              html.includes(`id="${href.slice(2)}"`),
              `Missing home target ${href}`,
            );
          }
        }
      }
      await page.close();
    }
    const page = await browser.newPage({
      viewport: { width: 1440, height: 1000 },
    });
    await page.goto(base + "/resitve");
    const normalAnimations = await page.evaluate(
      () =>
        document.getAnimations().filter((a) => a.playState === "running")
          .length,
    );
    assert(normalAnimations > 0);
    fs.writeFileSync(
      ".codex-artifacts/solutions-review.json",
      JSON.stringify({ results, errors, normalAnimations }, null, 2),
    );
    console.log(JSON.stringify({ results, errors, normalAnimations }, null, 2));
    for (const r of results) {
      assert.equal(r.scrollWidth, r.width);
      assert.deepEqual(r.overflow, []);
      assert.deepEqual(r.missingImages, []);
      assert.deepEqual(r.deadAnchors, []);
      assert.equal(r.h1, 1);
      assert.equal(r.flowIcons, 10);
      assert.equal(r.active, "/resitve");
      assert.equal(r.canonical, "https://www.kuem.si/resitve");
      assert.equal(r.animations, 0);
      for (const link of r.links || [])
        assert.equal(link.status, 200, link.href);
    }
    assert.deepEqual(errors, []);
  } finally {
    await browser.close();
  }
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
function innerHeightFallback() {
  return 1000;
}
