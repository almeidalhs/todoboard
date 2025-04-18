import logo from './logo.svg';
import './App.css';
import React, {useEffect} from 'react';
import {Routes, Route, Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import AddTodo from "./components/add-todo";
import TodosList from "./components/todos-list";
import Login from "./components/login";
import Signup from "./components/signup";

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from "react-bootstrap/Navbar";
import TodosDataService from "./services/todos";
import axios from "axios";

function App() {
  const [user, setUser] = React.useState(null);
  const [token, setToken] = React.useState('');
  const [error, setError] = React.useState('');

  // App.js
  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    if (savedToken) {
      axios.defaults.headers.common["Authorization"] = `Token ${savedToken}`; // ✅ 注意前缀是 Token 不是 token
      setToken(savedToken);
      setUser(savedUser);
    }
  }, []);

    async function login(user = null) {
      try {
        const response = await TodosDataService.login(user);
        const token = response.data.token || response.data.key;
        setToken(token);
        setUser(user.username);
        localStorage.setItem('token', token);
        localStorage.setItem('user', user.username);
        axios.defaults.headers.common["Authorization"] = `Token ${token}`;
      } catch (e) {
        console.log(e);
        setError(e.toString());
      }

    }

    async function logout() {
      setToken('')
      setUser('')
      localStorage.setItem('token', '');
      localStorage.setItem('user', '');
    }

    async function signup(user = null) {
      TodosDataService.signup(user).then((response) => {
        setToken(response.data.token);
        setUser(user.username);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', user.username);
      }).catch(e => {
        console.log(e);
        setError(e.toString());
      })
    }

  return (

    <div className="App">
    <Navbar bg="primary" variant="dark">
      <div className="container-fluid">
        <Navbar.Brand>TodosApp</Navbar.Brand>
        <Nav className="me-auto">
          <Container>
            <Link to={"/todos"} className="nav-link">Todos</Link>
            {user? (
              <div>
                <Link className="nav-link" onClick={logout}>Logout({user})</Link>
              </div>
            ): (
              <>
                <Link to="/login" className="nav-link">Login</Link>
                <Link to="/signup" className="nav-link">Signup</Link>
              </>
            )}
          </Container>
        </Nav>
      </div>
    </Navbar>

      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<TodosList token={token} />} />
          <Route path="/todos">
            <Route index element={<TodosList token={token} />} />
            <Route path="create" element={<AddTodo token={token} />} />
            <Route path=":id" element={<AddTodo token={token} />} />
          </Route>
          <Route path="/login" element={<Login login={login} />} />
          <Route path="/signup" element={<Signup signup={signup} />} />
        </Routes>
      </div>

      <footer className="text-center text-lg-start bg-light text-muted mt-4">
        <div className="text-center p-4">© Copyright kkkkkkkkkkk
        - <a target="_blank" className="text-reset fw-bold text-decoration-none" href="https://twitter.com/greglim81">Greg Lim</a>
        - <a target="_blank" className="text-reset fw-bold text-decoration-none"
        href="https://twitter.com/danielgarax">Daniel Correa</a>
        </div>
      </footer>

    </div>
  );
}

export default App;
