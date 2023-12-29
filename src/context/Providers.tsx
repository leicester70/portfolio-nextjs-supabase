"use client";
import { Provider } from "react-redux";
import { store } from "./store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dotenv from "dotenv";
import { useEffect, useState, createContext } from "react";
import {
  createClientComponentClient,
  Session,
} from "@supabase/auth-helpers-nextjs";

interface Props {
  children: React.ReactNode;
}
export const SessionContext = createContext<Session | null>(null);

export function Providers({ children }: Props) {
  // session context here too (not best practices?)
  const supabase = createClientComponentClient();
  const [session, setSession] = useState<Session | null>(null);
  useEffect(() => {
    const fetchSessionData = async () => {
      try {
        const response = await supabase.auth.getSession();
        if (response.error) throw response.error;
        setSession(response.data.session);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSessionData();
  }, []);
  dotenv.config();
  return (
    <>
      <Provider store={store}>
        <SessionContext.Provider value={session}>
          {children}
          <ToastContainer />
        </SessionContext.Provider>
      </Provider>
    </>
  );
}
