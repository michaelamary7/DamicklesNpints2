import React from 'react';
import { FC } from 'react';
import RegisterForm from '../../components/auth/RegisterForm';

const RegisterPage: FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;