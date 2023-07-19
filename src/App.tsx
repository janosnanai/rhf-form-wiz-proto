import { Button } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";

import MyModal from "./components/modal";
import ModalHead from "./components/modal/modal-head";
import { useModalContext } from "./components/modal/context";
import OldUserWiz from "./features/user-wiz__old";
import UserWiz from "./features/user-wiz";

function OldUserWizModalButton() {
  const { open } = useModalContext();
  return (
    <Button
      onClick={open}
      startIcon={<AddIcon />}
      variant="contained"
      sx={{ m: 5 }}
    >
      {"create new user (old)"}
    </Button>
  );
}

function UserWizModalButton() {
  const { open } = useModalContext();
  return (
    <Button
      onClick={open}
      startIcon={<AddIcon />}
      variant="contained"
      sx={{ m: 5 }}
    >
      {"create new user"}
    </Button>
  );
}

function OldUserWizModalContent() {
  return (
    <>
      <ModalHead title="create new user (old)" />
      <OldUserWiz />
    </>
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
    <>
      <MyModal
        slots={{
          outerContent: <OldUserWizModalButton />,
          modalContent: <OldUserWizModalContent />,
        }}
        closeOnOutclick={false}
      />
      <MyModal
        slots={{
          outerContent: <UserWizModalButton />,
          modalContent: <UserWizModalContent />,
        }}
        closeOnOutclick={false}
      />
    </>
  );
}

export default App;
