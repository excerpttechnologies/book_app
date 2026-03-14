

"use client";

import React, { useState } from "react";
import { useAdmin } from "../../AdminContext";
import ForgotPassword from "@/app/components/ForgotPassword";
import "./login.css";

interface LoginProps {
  close?: () => void;
  onLoginSuccess?: () => void;
}

export default function Login({ close, onLoginSuccess }: LoginProps) {
  const [isSignup, setIsSignup] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const { setIsAdmin } = useAdmin();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const navigateToAdminPanel = () => {
    window.location.href = "/admin/dashboard";
  };

  const showCustomAlert = (message: string, type: "success" | "error" = "success") => {
    // Create custom alert element
    const alertDiv = document.createElement("div");
    alertDiv.className = `custom-alert ${type}`;
    alertDiv.innerHTML = `
      <div class="custom-alert-content">
        <span>${message}</span>
        <button class="custom-alert-close">×</button>
      </div>
    `;
    
    // Add styles
    alertDiv.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${type === "success" ? "#4CAF50" : "#f44336"};
      color: white;
      padding: 16px;
      border-radius: 4px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 9999;
      animation: slideIn 0.3s ease-out;
      min-width: 300px;
      max-width: 400px;
    `;
    
    const content = alertDiv.querySelector('.custom-alert-content') as HTMLElement;
    if (content) {
      content.style.cssText = `
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 20px;
      `;
    }
    
    const closeBtn = alertDiv.querySelector('.custom-alert-close') as HTMLElement;
    if (closeBtn) {
      closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
        padding: 0;
        line-height: 1;
      `;
      closeBtn.onclick = () => {
        alertDiv.style.animation = "slideOut 0.3s ease-out forwards";
        setTimeout(() => {
          if (alertDiv.parentNode) {
            alertDiv.parentNode.removeChild(alertDiv);
          }
        }, 300);
      };
    }
    
    // Add keyframes for animation
    if (!document.querySelector('#custom-alert-styles')) {
      const style = document.createElement('style');
      style.id = 'custom-alert-styles';
      style.textContent = `
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes slideOut {
          from {
            transform: translateX(100%);
            opacity: 1;
          }
          to {
            transform: translateX(0);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }
    
    document.body.appendChild(alertDiv);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      if (alertDiv.parentNode) {
        alertDiv.style.animation = "slideOut 0.3s ease-out forwards";
        setTimeout(() => {
          if (alertDiv.parentNode) {
            alertDiv.parentNode.removeChild(alertDiv);
          }
        }, 300);
      }
    }, 5000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (isSignup) {
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match");
        setIsLoading(false);
        return;
      }
      if (formData.password.length < 6) {
        setError("Password must be at least 6 characters");
        setIsLoading(false);
        return;
      }
    }

    // Admin login logic
    if (!isSignup && formData.email === "omspiritual2025@gmail.com" && formData.password === "omikamari@78") {
      const history = {
        email: formData.email,
        name: "Admin",
        timestamp: new Date().toISOString(),
        type: "login",
      };

      const oldHistory = JSON.parse(localStorage.getItem("loginHistory") || "[]");
      localStorage.setItem("loginHistory", JSON.stringify([history, ...oldHistory]));

      localStorage.setItem("authToken", "adminToken");
      localStorage.setItem("userRole", "admin");
      localStorage.setItem("userEmail", formData.email);
      localStorage.setItem("userName", "Admin");
      
      setIsAdmin(true);

      showCustomAlert("Admin Login Successful! Redirecting to Admin Panel...");
      setIsLoading(false);
      navigateToAdminPanel();
      return;
    }

    try {
      const url = isSignup
        ? "/api/auth/signup"
        : "/api/auth/login";

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Something went wrong");
        setIsLoading(false);
        return;
      }

      const history = {
        email: formData.email,
        name: data.name || formData.name,
        timestamp: new Date().toISOString(),
        type: isSignup ? "signup" : "login",
      };

      const oldHistory = JSON.parse(localStorage.getItem("loginHistory") || "[]");
      localStorage.setItem("loginHistory", JSON.stringify([history, ...oldHistory]));

      localStorage.setItem("authToken", data.token);
      localStorage.setItem("userRole", data.role || "user");
      localStorage.setItem("userEmail", formData.email);
      localStorage.setItem("userName", data.name || formData.name);

      setIsAdmin(false);

      showCustomAlert(isSignup ? "Signup Successful!" : "Login Successful!");
      close?.();
      onLoginSuccess?.();
      window.location.reload();

    } catch (err) {
      setError("Connection error. Please try again later.");
      showCustomAlert("Unable to connect to server. Please try again.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const clearForm = () =>
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

  const handleToggleMode = () => {
    setIsSignup(!isSignup);
    clearForm();
    setError("");
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // Show ForgotPasswordOTP component if state is true
  if (showForgotPassword) {
    return (
      <ForgotPassword 
        onBackToLogin={() => setShowForgotPassword(false)}
        onClose={close}
      />
    );
  }

  return (
    <div className="login-overlay">
      <div className="login-box">
        <button className="close-btn" onClick={() => close?.()}>×</button>

        <h2>{isSignup ? "Create Account" : "Welcome Back"}</h2>
        <p className="login-subtitle">
          {isSignup ? "Sign up to get started" : "Sign in to your account"}
        </p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          {isSignup && (
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                required
                value={formData.name}
                onChange={handleChange}
                className="form-input"
              />
            </div>
          )}

          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              required
              value={formData.email}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          {/* Password Field - Always show toggle button */}
          <div className="form-group password-group">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              required
              value={formData.password}
              onChange={handleChange}
              className="form-input password-input"
            />
            <button
              type="button"
              className="password-toggle-btn"
              onClick={togglePasswordVisibility}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                  <line x1="1" y1="1" x2="23" y2="23"></line>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              )}
            </button>
          </div>

          {/* Confirm Password Field - Only for signup, always show toggle button */}
          {isSignup && (
            <div className="form-group password-group">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="form-input password-input"
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={toggleConfirmPasswordVisibility}
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              >
                {showConfirmPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                )}
              </button>
            </div>
          )}

          <button
            type="submit"
            className={`submit-btn ${isLoading ? "loading" : ""}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="spinner"></div>
                {isSignup ? "Creating Account..." : "Signing In..."}
              </>
            ) : isSignup ? (
              "Create Account"
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {/* Forgot Password Link - Only show in login mode */}
        {!isSignup && (
          <p className="forgot-password-link">
            <span 
              onClick={() => setShowForgotPassword(true)} 
              className="toggle-link"
              style={{ cursor: 'pointer', fontSize: '14px' }}
            >
              Forgot Password?
            </span>
          </p>
        )}

        <p className="toggle-text">
          {isSignup ? "Already have an account?" : "Don't have an account?"}
          <span onClick={handleToggleMode} className="toggle-link">
            {isSignup ? " Sign In" : " Sign Up"}
          </span>
        </p>
      </div>
    </div>
  );
}