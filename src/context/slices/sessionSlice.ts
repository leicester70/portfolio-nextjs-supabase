// unused (fornow)
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Session } from "@supabase/supabase-js";

// Define a type for the slice state
interface SessionState {
  // session is Retrieved from middleware.ts and to used when needed
  session: Session | null;
}

// Define the initial state using that type
const initialState: SessionState = {
  session: null,
};

export const sessionSlice = createSlice({
  initialState,
  name: "sessionState",
  reducers: {
    setSession: (state, action: PayloadAction<Session>) => {
      state.session = action.payload;
    },
  },
});

export const { setSession } = sessionSlice.actions;
export default sessionSlice.reducer;
