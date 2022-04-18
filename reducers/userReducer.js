import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: null,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const user = {
        accessToken: action.payload.accessToken,
        expirationTime: action.payload.expirationTime,
        email: action.payload.email,
      };
      localStorage.setItem("user", JSON.stringify(user));
      state.user = user;
    },
    getUser: (state, action) => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user?.expirationTime > Date.now()) {
        state.user = user;
      } else {
        localStorage.removeItem("user");
        state.user = null;
      }
    },
  },
});
export const { setUser, getUser } = userSlice.actions;
export default userSlice.reducer;
