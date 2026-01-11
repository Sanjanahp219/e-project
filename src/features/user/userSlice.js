import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: !!localStorage.getItem("user"),
  profile: JSON.parse(localStorage.getItem("user")) || null
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.profile = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout(state) {
      state.isLoggedIn = false;
      state.profile = null;
      localStorage.removeItem("user");
    }
  }
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
