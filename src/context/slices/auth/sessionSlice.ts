import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { Session } from "@supabase/supabase-js";

// Define a type for the slice state
interface SessionState {
  value: Session | null;
}

// Define the initial state using that type
const initialState: SessionState = {
  value: null,
};

export const sessionSlice = createSlice({
  initialState,
  name: "sessionState",
  reducers: {
    assignNewSession: (state)=>{
      state.value = 
    }
  },
});
