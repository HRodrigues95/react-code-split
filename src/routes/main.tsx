import { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom"
// Components
// Layouts
import NormalLayout from "../layouts/NormalLayout";
// Pages
import Home from "../pages/Home"

// Normal imports
// import Page1 from '../pages/Page1'
// import NotFound from '../pages/NotFound'
// Dynamic imports
const NotFound = lazy(() => import('../pages/NotFound'))
const Page1 = lazy(() => import('../pages/Page1'))
const Page2 = lazy(() => import('../pages/Page2'))

const MainRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<NormalLayout />}>
          <Route index element={<Home />} />
          <Route path='/page1' element={<Page1 />} />
          <Route path='/page2' element={<Page2 />} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default MainRoutes
