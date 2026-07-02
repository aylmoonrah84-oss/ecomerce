import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout";
import Home from "../Pages/Home";
import Protected from "../Layout/Protected";
import Cart from "../Pages/Cart";
import Profile from "../Pages/Profile";
import UnProtected from "../Layout/UnProtected";
import Auth from "../Pages/Auth";
import Products from "../Pages/Products";
import ProductDetails from "../Pages/ProductDetails/Index";
import About from "../Pages/About/indedx";
import NotFound from "../Pages/NotFound";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [{
      index: true,
      element : <Home/>
    },
    {
      element: <Protected/>,
      children:[{
        path:'/card',
        element:<Cart/>
      },
      {
        path:'/profile',
        element: <Profile/>
      }
    ]
    },
    {
      element:<UnProtected/>,
      children:[{
        path:'/auth',
        element:<Auth/>
      },
    ],
    },
    {
      path:'products/:categoryId/:categoryName',
      element:<Products/>
    },
    {
      path:'product-details/:id/:name',
      element:<ProductDetails/>
    },{
      path:'about',
      element:<About/>,
    },
     {
        path: "*",
        element: <NotFound/>,
      },
    ],
  },
]);
export default router
