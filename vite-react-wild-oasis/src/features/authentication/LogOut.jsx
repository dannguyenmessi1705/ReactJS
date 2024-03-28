import { HiArrowRightOnRectangle } from "react-icons/hi2";
import useLogout from "./useLogout";

import ButtonIcon from "../../ui/ButtonIcon";
import SpinnerMini from "../../ui/SpinnerMini";

export default function LogOut() {
  const { logout, isLogingOut } = useLogout();
  return (
    <ButtonIcon onClick={logout} disabled={isLogingOut}>
      {isLogingOut ? <SpinnerMini /> : <HiArrowRightOnRectangle />}
    </ButtonIcon>
  );
}
