import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Pages~~~
// import Home from "./pages/Home";
// import ProductsPage from "./pages/ProductsPage";
// import SelectedProduct from "./pages/SelectedProduct";
// import RegisterPage from "./pages/RegisterPage";
// import LoginPage from "./pages/LoginPage";
// import Cart from "./pages/Cart";
// import PaymentPage from "./pages/PaymentPage";
// import Success from "./pages/Success";
// import ShippingAddress from "./pages/ShippingAddress";
// import ProfilePage from "./pages/Profile";
// import OrdersPage from "./pages/OrdersPage";
// import WishListPage from "./pages/WishList";

//COMPONENTS
import Loading from "./components/Loading";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ErrorPage from "./pages/ErrorPage";

//LAZY LOADING PAGES
const LazyHome = React.lazy(() => import("./pages/Home"));
const LazyProductsPage = React.lazy(() => import("./pages/ProductsPage"));
const LazySelectedProduct = React.lazy(() => import("./pages/SelectedProduct"));
const LazyRegisterPage = React.lazy(() => import("./pages/RegisterPage"));
const LazyLoginPage = React.lazy(() => import("./pages/LoginPage"));
const LazyCart = React.lazy(() => import("./pages/Cart"));
const LazyPaymentPage = React.lazy(() => import("./pages/PaymentPage"));
const LazySuccess = React.lazy(() => import("./pages/Success"));
const LazyShippingAddress = React.lazy(() => import("./pages/ShippingAddress"));
const LazyProfilePage = React.lazy(() => import("./pages/Profile"));
const LazyOrdersPage = React.lazy(() => import("./pages/OrdersPage"));
const LazyWishListPage = React.lazy(() => import("./pages/WishList"));

function App() {
  const user = useSelector((state) => state.user.currentUser);
  const location = useLocation();
  const [active, setActive] = useState(true);

  useEffect(() => {
    if (
      location.pathname === "/payment" ||
      location.pathname === "/success" ||
      location.pathname === "/shipping"
    ) {
      setActive(false);
    } else {
      setActive(true);
    }
  }, [location]);

  return (
    <div>
      {active && <Navbar />}
      <React.Suspense fallback={<Loading />}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<LazyHome />} />
          <Route path={"/products/:category"} element={<LazyProductsPage />} />
          <Route path="/product/:id" element={<LazySelectedProduct />} />
          <Route
            path="/register"
            element={user ? <Navigate to="/" /> : <LazyRegisterPage />}
          />
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <LazyLoginPage />}
          />
          <Route path="/cart" element={<LazyCart />} />
          <Route
            path="/payment"
            element={!user ? <Navigate to="/login" /> : <LazyPaymentPage />}
          />
          <Route
            path="/success"
            element={!user ? <Navigate to="/login" /> : <LazySuccess />}
          />
          <Route
            path="/shipping"
            element={!user ? <Navigate to="/login" /> : <LazyShippingAddress />}
          />
          <Route
            path="/profile"
            element={!user ? <Navigate to="/login" /> : <LazyProfilePage />}
          />
          <Route
            path="/myOrders"
            element={!user ? <Navigate to="/login" /> : <LazyOrdersPage />}
          />
          <Route
            path="/wishList"
            element={!user ? <Navigate to="/login" /> : <LazyWishListPage />}
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </React.Suspense>
      {active && <Footer />}
      <ToastContainer />
    </div>
  );
}

export default App;
