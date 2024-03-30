import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";

import ButtonIcon from "./ButtonIcon";
import { useDarkMode } from "../contexts/DarkModeContext";
function DarkModeToggle() {
  const { darkMode, handleSwitch } = useDarkMode();
  return (
    <ButtonIcon onClick={handleSwitch}>
      {darkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
    </ButtonIcon>
  );
}

export default DarkModeToggle;
