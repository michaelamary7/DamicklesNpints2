
// types/auth.types.ts
interface User {
    id: string;
    username: string;
    email: string;
    password: string;
  }
  
  interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
  }
  
  export type { User, AuthState };