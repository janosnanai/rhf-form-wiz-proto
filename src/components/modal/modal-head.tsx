import { Box, IconButton, Typography } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";

import { useModalContext } from "./context";

interface ModalHeadProps {
  title: string;
  closeButton?: boolean;
}

function ModalHead({ title, closeButton = true }: ModalHeadProps) {
  const { close } = useModalContext();

  return (
    <Box
      sx={{ display: "flex", gap: 3, justifyContent: "space-between", mb: 3 }}
    >
      <Typography variant="h5" sx={{ flexGrow: 1 }}>
        {title}
      </Typography>
      {closeButton && (
        <IconButton onClick={close}>
          <CloseIcon />
        </IconButton>
      )}
    </Box>
  );
}

export default ModalHead;
