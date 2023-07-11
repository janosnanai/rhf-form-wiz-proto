import { Button } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";

import MyModal from "./components/modal";
import ModalHead from "./components/modal/modal-head";
import { useModalContext } from "./components/modal/context";
import UserWiz from "./features/user-wiz";

function UserWizModalButton() {
  const { open } = useModalContext();
  return (
    <Button
      onClick={open}
      startIcon={<AddIcon />}
      variant="contained"
      sx={{ m: 5 }}
    >
      create new user
    </Button>
  );
}

function UserWizModalContent() {
  return (
    <>
      <ModalHead title="create new user" />
      <UserWiz />
    </>
  );
}

function App() {
  return (
    <MyModal
      slots={{
        outerContent: <UserWizModalButton />,
        modalContent: <UserWizModalContent />,
      }}
      closeOnOutclick={false}
    />
  );
}

export default App;
