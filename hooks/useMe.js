import { useEffect, useState } from "react";
import { db } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { getUser, setUserData } from "../reducers/userReducer";
import { query, collection, onSnapshot, where } from "firebase/firestore";

export default function useMe() {
  const [state, setstate] = useState({
    loading: false,
  });
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);

  useEffect(() => {
    const getUserData = async () => {
      setstate({ ...state, loading: true });
      try {
        const queryEmail = query(
          collection(db, "users"),
          where("email", "==", userState?.userAuth?.email)
        );
        onSnapshot(queryEmail, (snapshot) => {
          setstate({
            ...state,
            loading: false,
            data: { id: snapshot.docs[0].id, ...snapshot.docs[0].data() },
          });
          dispatch(
            setUserData({
              ...snapshot.docs[0].data(),
              id: snapshot.docs[0].id,
              timestamp: Date.now(),
            })
          );
        });
      } catch (error) {
        console.log(error);
        setstate({ ...state, loading: false, error: error });
      }
    };
    if (!userState?.userAuth) {
      setstate({ error: true, loading: false });
      dispatch(getUser());
    }
    if (userState?.userAuth && !userState?.userData) {
      getUserData();
    }
    if (userState?.userData) {
      setstate({ ...state, loading: false, data: userState?.userData });
    }
  }, [userState, dispatch]);

  return { ...state };
}
