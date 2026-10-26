const prefetchers: Record<string, () => Promise<unknown>> = {
  "/work": () => import("./PortfolioHome"),
  "/work/case-studies": () => import("./CaseStudiesPage"),
  "/work/how-we-work": () => import("./HowWeWorkPage"),
  "/work/demos": () => import("./DemoBuildsPage"),
}

export function warm(path: string) {
  const load = prefetchers[path]
  if (load) void load()
}
