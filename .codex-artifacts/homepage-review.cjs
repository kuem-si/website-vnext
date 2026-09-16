const {
  chromium,
} = require("C:/Users/mladen.simeunovic/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright");
const fs = require("node:fs");
const assert = require("node:assert/strict");
const base = "http://127.0.0.1:4444";
(async () => {
  const browser = await chromium.launch({
    executablePath:
      "C:/Users/mladen.simeunovic/AppData/Local/ms-playwright/chromium-1234/chrome-win64/chrome.exe",
  });
  const results = [];
  const errors = [];
  for (const width of [1440, 1920, 2276, 1024, 768, 390]) {
    const page = await browser.newPage({
      viewport: { width, height: 1000 },
      reducedMotion: "reduce",
    });
    page.on("pageerror", (e) => errors.push(`${width}: ${e.message}`));
    page.on("console", (e) => {
      if (e.type() === "error") errors.push(`${width}: ${e.text()}`);
    });
    await page.goto(base + "/", { waitUntil: "networkidle" });
    await page.evaluate(async () => {
      await document.fonts.ready;
      document
        .querySelectorAll('img[loading="lazy"]')
        .forEach((img) => (img.loading = "eager"));
      await Promise.all(
        [...document.images].map((img) => img.decode().catch(() => {})),
      );
    });
    await page.waitForTimeout(150);
    const result = await page.evaluate(() => {
      const box = (el) => {
        const b = el.getBoundingClientRect();
        return { x: b.x, y: b.y, width: b.width, height: b.height };
      };
      const visible = (el) =>
        !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
      return {
        width: innerWidth,
        scrollWidth: document.documentElement.scrollWidth,
        overflowing: [...document.querySelectorAll("main *")]
          .filter(
            (el) =>
              visible(el) &&
              !el.closest("svg,.hp-nexavia-mark") &&
              (el.getBoundingClientRect().right > innerWidth + 1 ||
                el.getBoundingClientRect().left < -1),
          )
          .map((el) => el.className)
          .slice(0, 20),
        images: [...document.images]
          .filter((img) => !img.complete || !img.naturalWidth)
          .map((img) => img.src),
        h1: document.querySelectorAll("h1").length,
        deadAnchors: [...document.querySelectorAll('a[href^="#"]')]
          .filter(
            (a) => !document.getElementById(a.getAttribute("href").slice(1)),
          )
          .map((a) => a.outerHTML),
        container: box(document.querySelector(".hp-wrap")),
        heroTitleSize: getComputedStyle(document.querySelector("h1")).fontSize,
        footerNavPosition: getComputedStyle(
          document.querySelector(".hp-footer nav"),
        ).position,
        cardDescriptions: [...document.querySelectorAll(".hp-card p")].map(
          (el) => parseFloat(getComputedStyle(el).fontSize),
        ),
        apiPath: document.querySelector("[data-api-path]").getAttribute("d"),
        apiTarget: box(document.querySelector("#platforma-korak")),
        animations: document
          .getAnimations()
          .filter((a) => a.playState === "running").length,
      };
    });
    results.push(result);
    await page.screenshot({
      path: `.codex-artifacts/home-polished-${width}.png`,
      fullPage: true,
    });
    if (width === 390) {
      const menu = page.locator(".hp-menu");
      await menu.focus();
      await page.keyboard.press("Enter");
      assert.equal(await menu.getAttribute("aria-expanded"), "true");
      await page.keyboard.press("Tab");
      assert.equal(await page.locator(":focus").textContent(), "Rešitve");
      await page.keyboard.press("Escape");
      assert.equal(await menu.getAttribute("aria-expanded"), "false");
      assert.equal(
        await menu.evaluate((el) => el === document.activeElement),
        true,
      );
      await menu.click();
      await page.locator('#homepage-nav a[href="#o-nas"]').click();
      assert.equal(await menu.getAttribute("aria-expanded"), "false");
      const offset = await page
        .locator("#o-nas")
        .evaluate((el) => el.getBoundingClientRect().top);
      assert(offset >= 72, `Sticky header overlaps section: ${offset}`);
      await page.locator("[data-nexavia-contact]").click();
      assert.equal(
        await page.locator(":focus").getAttribute("id"),
        "nexavia-povprasevanje",
      );
      await page.locator("[data-dashboard-open]").click();
      assert.equal(
        await page.locator("#dashboard-preview").evaluate((el) => el.open),
        true,
      );
      await page.keyboard.press("Escape");
      assert.equal(
        await page.locator("#dashboard-preview").evaluate((el) => el.open),
        false,
      );
      assert.equal(
        await page.locator(":focus").getAttribute("data-dashboard-open"),
        "",
      );
      await page.locator(".hp-stories summary").first().click();
      assert.equal(
        await page.locator(".hp-stories details").first().getAttribute("open"),
        "",
      );
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
      }
    }
    await page.close();
  }
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
  });
  await page.goto(base + "/");
  await page.waitForTimeout(300);
  const motion = await page.evaluate(
    () =>
      document.getAnimations().filter((a) => a.playState === "running").length,
  );
  assert(motion > 0, "Expected automatic flow animation");
  await page.goto(base + "/sl/");
  assert.equal(await page.title(), "KUEM | Od naprave do odločitve");
  await browser.close();
  fs.writeFileSync(
    ".codex-artifacts/homepage-review.json",
    JSON.stringify({ results, errors, motion }, null, 2),
  );
  console.log(JSON.stringify({ results, errors, motion }, null, 2));
  assert.equal(errors.length, 0, "Browser errors");
  for (const result of results) {
    assert.equal(
      result.scrollWidth,
      result.width,
      `Overflow at ${result.width}`,
    );
    assert.equal(
      result.overflowing.length,
      0,
      `Element overflow at ${result.width}`,
    );
    assert.equal(result.images.length, 0, "Missing images");
    assert.equal(result.h1, 1, "Single h1");
    assert.equal(
      result.footerNavPosition,
      "static",
      "Footer navigation must stay in the footer",
    );
    assert.equal(result.deadAnchors.length, 0, "Broken section links");
    assert.equal(result.animations, 0, "Reduced motion");
    assert(Math.min(...result.cardDescriptions) >= 14, "Card text too small");
    for (const link of result.links || [])
      assert.equal(link.status, 200, link.href);
  }
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
