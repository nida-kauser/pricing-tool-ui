// src/routes/index.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import CreateAndManageProduct from "../pages/CreateAndManageProduct";
import PricingOptimization from "../pages/PricingOptimization";
import { ROUTES } from "../constant/routes";
import LoginPage from "../pages/auth/Login";
import SignupPage from "../pages/auth/Signup";

const AppRoutes = () => {
  const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));

  const isAuthenticated = !!accessToken;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignupPage />} />
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />


        <Route
          path={ROUTES.HOME}
          element={
            isAuthenticated ? <Home /> : <Navigate to="/auth/login" replace />
          }
        />
        <Route
          path={ROUTES.CREATEANDMANAGEPRODUCT}
          element={
            isAuthenticated ? <CreateAndManageProduct /> : <Navigate to="/auth/login" replace />
          }
        />
        <Route
          path={ROUTES.PRICE_OPTIMIZATION}
          element={
            isAuthenticated ? <PricingOptimization /> : <Navigate to="/auth/login" replace />
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
