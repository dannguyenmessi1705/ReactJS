import styled from "styled-components";
import useUser from "../features/authentication/useUser";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";

const FullPage = styled.div`
  height: 100dvh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectRoute({ children }) {
  // 1. Lấy thông tin user
  const { isLoading, isAuthenticated, fetchStatus } = useUser(); // fetchStatus: trang thái của việc fetch user
  const navigate = useNavigate();

  // 2. Nếu không có user thì redirect đến trang login
  useEffect(() => {
    if (!isAuthenticated && !isLoading && fetchStatus !== "fetching")
      navigate("/login");
  }, [isAuthenticated, isLoading, fetchStatus, navigate]);

  // 3. Nếu đang loading thì hiển thị spinner
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  // 4. Nếu có user thì render children
  if (isAuthenticated) return children;
}

export default ProtectRoute;
