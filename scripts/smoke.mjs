import { chromium } from "@playwright/test";
import { existsSync } from "node:fs";
import assert from "node:assert/strict";
const executablePath =
  process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH ||
  (existsSync("/usr/bin/chromium") ? "/usr/bin/chromium" : undefined);
const browser = await chromium.launch({
  executablePath,
  headless: true,
  args: ["--no-sandbox"],
});
const base = process.env.DORI_TEST_URL || "http://127.0.0.1:3000";
const errors = [];
let checks = 0;
try {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
  });
  page.on("pageerror", (error) => errors.push(error.message));
  for (const route of [
    "/",
    "/demo/inicio",
    "/demo/explorar",
    "/demo/perfil",
    "/demo/publicar",
    "/acceso",
    "/privacidad",
  ]) {
    const response = await page.goto(base + route);
    assert.equal(response.status(), 200, route);
    await page.locator("h1,h2").first().waitFor();
    assert.equal(
      await page
        .locator("img")
        .evaluateAll((images) =>
          images.every((image) => image.complete && image.naturalWidth > 0),
        ),
      true,
      `Images: ${route}`,
    );
    checks++;
  }
  await page.goto(base + "/demo/explorar");
  await page.getByRole("button", { name: "Aves", exact: true }).click();
  assert.equal(await page.locator(".photo-card").count(), 1);
  checks++;
  await page.getByRole("button", { name: "Todas", exact: true }).click();
  assert.equal(await page.locator(".photo-card").count(), 4);
  checks++;
  await page
    .getByRole("button", { name: "Ver Una pausa entre las ramas" })
    .click();
  await page.getByRole("dialog").waitFor();
  await page.keyboard.press("Escape");
  assert.equal(await page.getByRole("dialog").count(), 0);
  checks++;
  await page.goto(base + "/demo/inicio");
  await page
    .getByRole("button", { name: "Guardar en favoritos de demostración" })
    .first()
    .click();
  assert.equal(
    await page
      .getByRole("button", { name: "Quitar de favoritos de demostración" })
      .count(),
    1,
  );
  checks++;
  const like = page.getByRole("button", { name: /24 Me gusta/ }).first();
  await like.click();
  assert.equal(
    await page
      .getByRole("button", { name: /25 Me gusta/ })
      .getAttribute("aria-pressed"),
    "true",
  );
  checks++;
  await page.goto(base + "/demo/perfil");
  await page.getByRole("tab", { name: "Favoritos de ejemplo" }).click();
  assert.equal(await page.locator(".photo-card").count(), 2);
  checks++;
  await page.goto(base + "/demo/publicar");
  await page.getByLabel("Título", { exact: true }).fill("Una mañana tranquila");
  await page.getByRole("combobox").selectOption("Aves");
  await page.getByRole("button", { name: "Revisar demostración" }).click();
  await page
    .getByRole("status")
    .filter({ hasText: "Vista previa completada" })
    .waitFor();
  checks++;
  await page.goto(base + "/acceso");
  assert.equal(
    await page
      .getByRole("button", { name: "Entrar — próximamente" })
      .isDisabled(),
    true,
  );
  await page.getByRole("button", { name: "Con invitación" }).click();
  assert.equal(
    await page.getByLabel("Código de invitación").isDisabled(),
    true,
  );
  checks++;
  await page.goto(base + "/demo/no-existe");
  assert.equal(
    await page.getByText("This page could not be found.").count(),
    1,
  );
  checks++;
  await page.goto(base + "/");
  await page.screenshot({ path: "/tmp/dori-desktop.png", fullPage: true });
  await page.setViewportSize({ width: 390, height: 844 });
  for (const route of [
    "/",
    "/demo/explorar",
    "/demo/inicio",
    "/demo/perfil",
    "/demo/publicar",
    "/acceso",
  ]) {
    await page.goto(base + route);
    assert.equal(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
      true,
      `Mobile overflow: ${route}`,
    );
    checks++;
  }
  await page.goto(base + "/");
  await page.getByRole("button", { name: "Abrir menú" }).click();
  await page.getByRole("link", { name: "Explorar", exact: true }).click();
  await page.waitForURL("**/demo/explorar");
  checks++;
  await page.screenshot({ path: "/tmp/dori-mobile.png", fullPage: true });
  assert.deepEqual(errors, []);
  checks++;
  console.log(
    `${checks} checks passed; desktop and mobile screenshots saved in /tmp.`,
  );
} finally {
  await browser.close();
}
