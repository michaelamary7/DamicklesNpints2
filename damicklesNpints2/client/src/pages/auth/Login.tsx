import { FC } from 'react'; 
import LoginForm from '../../components/auth/LoginForm'; // Add import statement for 'LoginForm' component 
import React from 'react'; // Add import statement for 'React' module 

const LoginPage: FC = () => { 
    return ( 
    <div className="min-h-screen flex items-
    center justify-center bg-gray-50"> 
    <LoginForm /> 
    </div> 
    ); 
}; 

export default LoginPage;