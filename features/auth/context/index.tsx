"use client";
import { createContext, useContext, useEffect, useState } from "react";

import { User, Session } from "@supabase/supabase-js";
import { useQueryClient } from "@tanstack/react-query";

import { supabase } from "@/supabase/client";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const qc = useQueryClient();

  useEffect(() => {
    let mounted = true;

    // Get initial session
    const getInitialSession = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        // console.log("Initial session check:", { session, error });

        if (mounted) {
          if (session) {
            setSession(session);
            setUser(session.user);
            qc.setQueryData(["auth", "user"], session.user);
          } else {
            setSession(null);
            setUser(null);
            qc.setQueryData(["auth", "user"], null);
          }
          setLoading(false);
        }
      } catch (error) {
        console.error("Error getting initial session:", error);
        if (mounted) {
          setLoading(false);
        }
      }
    };

    getInitialSession();

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      // console.log("Auth state changed:", { event, session });

      if (mounted) {
        if (session) {
          setSession(session);
          setUser(session.user);
          qc.setQueryData(["auth", "user"], session.user);
        } else {
          setSession(null);
          setUser(null);
          qc.setQueryData(["auth", "user"], null);
        }
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [qc]);

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Sign out error:", error);
      throw error;
    }

    setUser(null);
    setSession(null);
    qc.setQueryData(["auth", "user"], null);
  };

  const value: AuthContextType = {
    user,
    session,
    loading,
    signOut,
  };

  // console.log("AuthProvider state:", { user, session, loading });

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};
