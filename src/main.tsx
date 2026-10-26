import React, { Suspense, lazy } from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Route, Routes, useLocation } from "react-router"
import App from "./App"
import "./index.css"

const PortfolioLayout = lazy(() => import("./portfolio/PortfolioLayout"))
const PortfolioHome = lazy(() => import("./portfolio/PortfolioHome"))
const CaseStudiesPage = lazy(() => import("./portfolio/CaseStudiesPage"))
const HowWeWorkPage = lazy(() => import("./portfolio/HowWeWorkPage"))
const DemoBuildsPage = lazy(() => import("./portfolio/DemoBuildsPage"))
const NotFoundPage = lazy(() => import("./portfolio/NotFoundPage"))

function ScrollManager() {
  const { pathname, hash } = useLocation()

  React.useEffect(() => {
    if (pathname.startsWith("/work")) return
    if (hash) {
      const id = decodeURIComponent(hash.slice(1))
      const target = document.getElementById(id)
      if (target) {
        window.requestAnimationFrame(() => target.scrollIntoView({ block: "start" }))
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}

function RouteFallback() {
  return (
    <div className="grid min-h-screen place-items-center bg-[#080808] text-[#f0ede8]">
      <p className="font-serif text-4xl">Rinayra</p>
    </div>
  )
}

function Root() {
  const basename = import.meta.env.BASE_URL.replace(/\/$/, "") || undefined

  return (
    <BrowserRouter basename={basename}>
      <ScrollManager />
      <Routes>
        <Route path="/" element={<App />} />
        <Route
          path="/work"
          element={
            <Suspense fallback={<RouteFallback />}>
              <PortfolioLayout />
            </Suspense>
          }
        >
          <Route index element={<PortfolioHome />} />
          <Route path="case-studies" element={<CaseStudiesPage />} />
          <Route path="case-studies/:slug" element={<CaseStudiesPage />} />
          <Route path="how-we-work" element={<HowWeWorkPage />} />
          <Route path="demos" element={<DemoBuildsPage />} />
          <Route path="demos/:slug" element={<DemoBuildsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        <Route
          path="*"
          element={
            <Suspense fallback={<RouteFallback />}>
              <NotFoundPage />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
)
