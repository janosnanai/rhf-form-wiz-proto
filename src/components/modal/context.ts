import { createContext, useContext } from "react";

export const ModalContext = createContext({
  open: () => {
    return;
  },
  toggle: () => {
    return;
  },
  close: () => {
    return;
  },
});

export const useModalContext = () => useContext(ModalContext);
