import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { hydrateUser } from "@/redux/slices/authSlice";

const useHydrateAuth = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(hydrateUser());
  }, [dispatch]);
};

export default useHydrateAuth;
