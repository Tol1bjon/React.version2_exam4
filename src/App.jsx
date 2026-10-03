import React, { lazy, Suspense } from 'react';
import Layout from './Layout/Layout';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Spinner } from './components/ui/spinner';
import BrandInfo from './Pages/Brand-Info/BrandInfo';


const Home = lazy(() => import('./Pages/Home/Home'))
const Company = lazy(() => import('./Pages/Company/Company'))
const Error = lazy(() => import('./Pages/ERROR/Error'))
const Services = lazy(() => import('./Pages/Services/Services'))
const Reviews = lazy(() => import('./Pages/Reviews/Reviews'))
const Contacts = lazy(() => import('./Pages/Contacts/Contacts'))
const InfoCar = lazy(() => import('./Pages/InfoCar/InfoCar'))
const CarDetails = lazy(() => import('./Pages/InfoCar/CarDetails'))
const Credit = lazy(() => import('./Pages/Credit/Credit'))
const CreditInfo = lazy(() => import('./Pages/Credit/Credit_Info'))
const Like = lazy(() => import('./Pages/Like/Like'))
const Compare = lazy(() => import('./Pages/Compare/Compare'))



const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      children: [
        {
          index: true,
          element: <Suspense fallback={<div className='h-[100vh] w-[100%] flex items-center justify-center'><Spinner/></div>}><Home/></Suspense>
        },
        {
          path: "/company",
          element: <Suspense fallback={<div className='h-[100vh] w-[100%] flex items-center justify-center'><Spinner/></div>}><Company/></Suspense>
        },
        {
          path: "/services",
          element: <Suspense fallback={<div className='h-[100vh] w-[100%] flex items-center justify-center'><Spinner/></div>}><Services/></Suspense>
        },
        {
          path: "/reviews",
          element: <Suspense fallback={<div className='h-[100vh] w-[100%] flex items-center justify-center'><Spinner/></div>}><Reviews/></Suspense>
        },
        {
          path: "/contacts",
          element: <Suspense fallback={<div className='h-[100vh] w-[100%] flex items-center justify-center'><Spinner/></div>}><Contacts/></Suspense>
        },
        {
          path: "/catalog",
          element: <Suspense fallback={<div className='h-[100vh] w-[100%] flex items-center justify-center'><Spinner/></div>}><BrandInfo/></Suspense>
        },
        {
          path: "/brand/:name",
          element: <Suspense fallback={<div className='h-[100vh] w-[100%] flex items-center justify-center'><Spinner/></div>}><BrandInfo/></Suspense>
        },
        {
          path: "/infocar/:id",
          element: <Suspense fallback={<div className='h-[100vh] w-[100%] flex items-center justify-center'><Spinner/></div>}><InfoCar/></Suspense>
        },
        {
          path: "/car-info/:id",
          element: <Suspense fallback={<div className='h-[100vh] w-[100%] flex items-center justify-center'><Spinner/></div>}><CarDetails/></Suspense>
        },
        {
          path: "/credit",
          element: <Suspense fallback={<div className='h-[100vh] w-[100%] flex items-center justify-center'><Spinner/></div>}><Credit/></Suspense>
        },
        {
          path: "/credit/info/:offerId",
          element: <Suspense fallback={<div className='h-[100vh] w-[100%] flex items-center justify-center'><Spinner/></div>}><CreditInfo/></Suspense>
        },
        {
          path: "/like",
          element: <Suspense fallback={<div className='h-[100vh] w-[100%] flex items-center justify-center'><Spinner/></div>}><Like/></Suspense>
        },
        {
          path: "/compare",
          element: <Suspense fallback={<div className='h-[100vh] w-[100%] flex items-center justify-center'><Spinner/></div>}><Compare/></Suspense>
        }
      ]
    },
    {
      path: "*",
      element: <Suspense fallback={<div className='h-[100vh] w-[100%] flex items-center justify-center'><Spinner/></div>}><Error/></Suspense>
    }
  ]);

  return <RouterProvider router={router}/>
}

export default App;
