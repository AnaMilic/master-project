import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function Logout() {
  const navigate = useNavigate();
  return (
    <LogoutButton
      onClick={() => {
        navigate("/");
        localStorage.removeItem("user");
      }}
    >
      Logout
    </LogoutButton>
  );
}

export default Logout;

const LogoutButton = styled.button`
  background-color: #f9f0e4;
  position: fixed;
  top: 1vh;
  right: 1vw;
  border: 1px solid grey;
  box-shadow: 2px 3px 5px #504e4e;
  width: 7vw;
  &:hover {
    border: 2px solid #39d05c;
  }
`;
