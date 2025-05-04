import React from 'react';
import MainLayout from '../../components/layout/MainLayout/MainLayout';
import LoginForm from '../../components/auth/LoginForm/LoginForm';
import './AuthPages.css';

const LoginPage = () => {
  return (
    <MainLayout>
      <div className="auth-page">
        <h1>Sign In</h1>
        <p className="auth-subtitle">Welcome back to Velora Watches</p>
        <LoginForm />
        <div className="auth-alt-option">
          <p>Don't have an account? <a href="/signup">Create account</a></p>
        </div>
      </div>
    </MainLayout>
  );
};

export default LoginPage;