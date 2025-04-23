"use client";
import { createContext, useContext } from "react";
import { SessionProvider, useSession } from "next-auth/react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  return (
    <SessionProvider>
      <AuthContextProvider>{children}</AuthContextProvider>
    </SessionProvider>
  );
}

function AuthContextProvider({ children }) {
  const { data: session, status } = useSession();
  
  const isAuthenticated = status === "authenticated";
  const isLoading = status === "loading";
  const user = session?.user || null;

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);