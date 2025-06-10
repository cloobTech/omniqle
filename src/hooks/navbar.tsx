import { useAppDispatch, useAppSelector } from "@src/hooks/redux_hook";
import { showNavbar, hideNavbar, toggleNavbar } from "@src/slice/navbar";

const useNavbar = () => {
  const dispatch = useAppDispatch();
  const { isVisible } = useAppSelector((state) => state.navbar);

  const displayNav = () => {
    dispatch(showNavbar());
  };

  const hideNav = () => {
    dispatch(hideNavbar());
  };

  const toogleNav = () => {
    dispatch(toggleNavbar());
  };
  return { displayNav, hideNav, toogleNav, isVisible };
};

export default useNavbar;
