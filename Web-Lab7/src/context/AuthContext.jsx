import { createContext, useContext, useReducer } from 'react';
import { login as loginRequest } from '../api/authApi.js';

const AuthContext = createContext(undefined);

const initialState = { user: null };

function authReducer(state, action) {
  switch (action.type) {
    case 'LOGGED_IN':
      return { user: action.user };
    case 'LOGGED_OUT':
      return { user: null };
    default:
      return state;
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  async function login(username, password) {
    const user = await loginRequest(username, password);
    dispatch({ type: 'LOGGED_IN', user });
  }

  function logout() {
    dispatch({ type: 'LOGGED_OUT' });
  }

  return (
    <AuthContext.Provider value={{ user: state.user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (ctx === undefined) {
    throw new Error('useAuth must be used inside an AuthProvider');
  }
  return ctx;
}