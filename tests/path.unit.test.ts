import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

import { isSitePath } from "../app/lib/path";

describe("isSitePath()", () => {
  test("ルート相対 URL パスを受け入れる", () => {
    expect(isSitePath("/path/to/file")).toBe(true);
  });

  test.for([
    "https://example.com",
    "//example.com",
    "/\\example.com",
    "/\t/example.com",
    "/\n/example.com",
    "/\r/example.com",
  ])("別のホストを指す %j を受け入れない", (path) => {
    expect(isSitePath(path)).toBe(false);
  });
});

describe("withBase()", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  test("ベースパスが / の場合はそのままのパスを返す", async () => {
    vi.stubEnv("BASE_URL", "/");
    const { withBase } = await import("../app/lib/path");

    expect(withBase("/path/to/file")).toBe("/path/to/file");
  });

  test("ベースパスを付けたパスを返す", async () => {
    vi.stubEnv("BASE_URL", "/base");
    const { withBase } = await import("../app/lib/path");

    expect(withBase("/path/to/file")).toBe("/base/path/to/file");
  });
});
