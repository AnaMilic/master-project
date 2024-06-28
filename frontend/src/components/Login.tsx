import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    try {
      const reqBody = JSON.stringify({
        user: {
          email,
          password,
        },
      });
      if (!reqBody) return;
      console.log(reqBody);

      const res = await fetch("http://localhost:5050/api/users/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: reqBody,
      });
      const formattedResponse = await res.json();
      if (res.status === 200) {
        localStorage.setItem("user", reqBody);
        setEmail("");
        setPassword("");
        navigate("/mainPage");
      } else {
        alert(`Login failed! ${formattedResponse}`);
      }
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  return (
    <LoginFragment>
      <form onSubmit={handleSubmit}>
        <FormInput
          type="email"
          id="email"
          name="email"
          value={email}
          placeholder="Email"
          required
          onChange={(e) => setEmail(e.target.value)}
        ></FormInput>
        <FormInput
          type="password"
          id="password"
          name="password"
          value={password}
          placeholder="Password"
          required
          onChange={(e) => setPassword(e.target.value)}
        ></FormInput>
        <LoginButton>Login</LoginButton>
      </form>
    </LoginFragment>
  );
}

export default Login;

const LoginFragment = styled.div`
  width: 30vw;
  height: 40vh;
  background: rgb(247, 223, 192);
  margin-left: 30vw;
  border-radius: 5px;
  padding: 5%;
  align-content: center;
`;
const FormInput = styled.input`
  width: 100%;
  border: none;
  border-bottom: 1px solid grey;
  background: none;
  margin: 20px 0px;
`;
const LoginButton = styled.button`
  background-color: #f9f0e4;
  padding: 10px;
  width: 100%;
  color: grey;
  margin-top: 20px;
  border: 1px solid gray;
  box-shadow: 2px 3px 5px #504e4e;
  &:hover {
    border: 2px solid #39d05c;
  }
`;
