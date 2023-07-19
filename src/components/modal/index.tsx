import React, { useState } from "react";
import { Box, Modal as MUIModal } from "@mui/material";

import { ModalContext } from "./context";

interface ModalProps {
  closeOnOutclick?: boolean;
  slots: {
    outerContent: React.ReactNode;
    modalContent: React.ReactNode;
  };
}

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

function MyModal({ closeOnOutclick = true, slots }: ModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  function handleOpen() {
    setIsOpen(true);
  }

  function handleToggle() {
    setIsOpen((prev) => !prev);
  }

  function handleClose() {
    setIsOpen(false);
  }

  return (
    <ModalContext.Provider
      value={{ open: handleOpen, toggle: handleToggle, close: handleClose }}
    >
      {slots.outerContent}
      <MUIModal
        open={isOpen}
        onClose={closeOnOutclick ? handleClose : () => null}
      >
        <Box sx={modalStyle}>{slots.modalContent}</Box>
      </MUIModal>
    </ModalContext.Provider>
  );
}

export default MyModal;
