import React from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import {useNavigate} from "react-router-dom";

const Signup = props => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const navigate = useNavigate();

    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const signup = () => {
       try {
           props.signup({ username, password });
           navigate("/login");
        } catch (error) {
          console.error("Login error:", error);
          // 显示错误提示（如设置错误状态）
        }
    }

    return (
        <Container>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter username" value={username} onChange={onChangeUsername} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter password" value={password} onChange={onChangePassword} />
                </Form.Group>
                <Button variant="primary" onClick={signup}>
                    Sign up
                </Button>
            </Form>
        </Container>
    );
}
export default Signup;