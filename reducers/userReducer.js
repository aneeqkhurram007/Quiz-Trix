import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  userAuth: null,
  userData: null,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      if (action.payload === null) {
        state.userAuth = null;
        localStorage.removeItem("user");
      } else {
        const user = {
          accessToken: action.payload.accessToken,
          expirationTime: action.payload.expirationTime,
          email: action.payload.email,
        };
        localStorage.setItem("user", JSON.stringify(user));
        state.userAuth = user;
      }
    },
    getUser: (state, action) => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user?.expirationTime > Date.now()) {
        state.userAuth = user;
      } else {
        localStorage.removeItem("user");
        state.userAuth = null;
      }
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
  },
});
export const { setUser, getUser, setUserData } = userSlice.actions;
export default userSlice.reducer;
