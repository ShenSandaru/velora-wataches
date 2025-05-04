import React from 'react';
import MainLayout from '../../components/layout/MainLayout/MainLayout';
import SignUpForm from '../../components/auth/SignUpForm/SignUpForm';
import './AuthPages.css';

const SignUpPage = () => {
  return (
    <MainLayout>
      <div className="auth-page">
        <h1>Create an Account</h1>
        <p className="auth-subtitle">Join Velora Watches to access exclusive offers and track your orders</p>
        <SignUpForm />
        <div className="auth-alt-option">
          <p>Already have an account? <a href="/login">Login</a></p>
        </div>
      </div>
    </MainLayout>
  );
};

export default SignUpPage;