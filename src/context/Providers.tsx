"use client";
import { Provider } from "react-redux";
import { store } from "./store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dotenv from "dotenv";

interface Props {
  children: React.ReactNode;
}

export function Providers({ children }: Props) {
  dotenv.config();
  return (
    <>
      <Provider store={store}>
        {children}
        <ToastContainer />
      </Provider>
    </>
  );
}
