# How to CodeSplit React JS

Most projects today that we create using **React.js** start simple and over time we add more and more components with different degrees of complexity in them and in the end we build and deploy the app for the Users to access.

But are really delivering the app in the best state? If we look in to Build/Distribution folder we can see that it generated ***one .js*** and ***one .css*** and added the other asset that we use within the app ie: Images.
This single .js file may be small when the app started out but if the application has been growing it may have grown to size above 1mB and this can affect the Users first time loading the Application on its Browser.

So how can we change the way we build the application so that build instead of generating a **single .js** file generates **multiple *smaller*** ones that can be loaded as the user navigates through the App, effectively splitting the code?
Thankfully most bundlers(webPack/Vite) know how to this automatically on the build process and we just have to use Dynamic imports so that the Javascript code can load the smaller pieces at runtime.

In this blog post we will explain how to structure the code and how to use the Dynamic import or Lazy loading of components to effectively split the code in to manageable chunks so that they can be downloaded in Runtime allowing the first load of the App to be quicker and better for users with slow Internet

For the rest of the article we can assume the source(src) project/app has a structure like this:

```
└── src/
    ├── components/
    │    ├── Component1/
    │    │    ├── style.scss
    │    │    └── index.tsx
    │    └── Component2
    │         ├── style.scss
    │         └── index.tsx
    ├── pages/
    │    ├── Home/
    │    │   ├── components/
    │    │   │    ├── style.scss
    │    │   │    └── Component3.tsx
    │    │   ├── style.scss
    │    │   └── index.tsx
    │    └── Page1/
    │        ├── style.scss
    │        └── index.tsx
    ├── routes/
    │    └──main.tsx
    ├── App.tsx
    └── main.tsx
```
And it using the following libraries:
- React Router (https://reactrouter.com)
- Ant Design (https://ant.design/)

## How do make Dynamic Imports in React.js ?

We make use of the [**Suspense**](https://react.dev/reference/react/Suspense) and [**Lazy**](https://react.dev/reference/react/lazy) from **React.js** to make the import of components be dynamic

Here is a simple example of the usage of this component and function:

```
import { FunctionComponent, lazy, Suspense } from "react"
import { Flex, Typography } from "antd"
// Components
import SuspenseFallback from "../../components/SuspenseFallback"

// Dynamic imports
const Component1 = lazy(() => import("./components/Component1"))

const FatherComponent: FunctionComponent = () => {
  return (
    <Flex vertical align="center" justify="center" style={{ height: "100%" }}>
      <Typography.Title>Home Page</Typography.Title>

      <Suspense fallback={<SuspenseFallback />}>
        <Component1 />
      </Suspense>
    </Flex>
  )
}

export default FatherComponent
```
As we can see in the example we wrap the **Component1** in the **Suspense** and we also specify a *fallback* in case the component is taking a longer time than expected to load.

## What can we dynamically import in our applications ?

### Are you using React Router ?

If your application is using [React-Router](https://reactrouter.com)(v6 or Latest) we already have good starting point of what we can Dynamically import because we don’t need to have **EVERY** Page being loaded as soon as the User enters the App and these pages can be split in to chunks.

On the ***routes*** we normally import the pages like this:

```
import { BrowserRouter, Route, Routes } from "react-router-dom"
import NormalLayout from "../layouts/NormalLayout";
import Home from "../pages/Home"
import Page1 from '../pages/Page1'
import NotFound from '../pages/NotFound'

const MainRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<NormalLayout />}>
          <Route index element={<Home />} />
          <Route path='/page1' element={<Page1 />} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default MainRoutes
```
**What can we change so the pages are safely imported and displayed ?**

#### Wrap the BrowserRouter in a Suspense:

We can wrap the **BrowserRouter** in a [**Suspense**](https://react.dev/reference/react/Suspense), import the Page1 and NotFound with the **lazy()** and add a simple fallback. Something like this:
```
import { Suspense, lazy } from "react-router-dom"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import NormalLayout from "../layouts/NormalLayout";
import SuspenseFallback from "../../components/SuspenseFallback"
import Home from "../pages/Home"

const Page1 = lazy(() => import('../pages/Page1'))
const NotFound = lazy(() => import('../pages/NotFound'))

const MainRoutes = () => {
  return (
    <Suspense fallback={<SuspenseFallback />}>
      <BrowserRouter>
        <Routes>
          <Route element={<NormalLayout />}>
            <Route index element={<Home />} />
            <Route path='/page1' element={<Page1 />} />
            <Route path='*' element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  )
}

export default MainRoutes
```
This will result in the Page1 and NotFound being split in to two new index-{somehash}.js

