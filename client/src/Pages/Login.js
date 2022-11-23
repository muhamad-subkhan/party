/* eslint-disable */ 
import React, { useContext, useState } from "react";
import { Form, Modal, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import GlobalButton from "../Components/Atoms/Global-button";
import GlobalForm from "../Components/Atoms/Global-form";
import { LoginContext } from "../context/DataContext";
import { useMutation } from "react-query"
import { API } from "../Components/Config/api";

function Login({ show, setShow, setShowRegister }) {
  const handleClose = () => setShow(false);

  const [state, dispatch] = useContext(LoginContext);
  const [message, setMessage] = useState()

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const { email, password } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const response = await API.post("/login", form)
      // const coba = API.defaults.headers.common
      console.log(response);

      let payload = response.data.data
      
      const alert = (
        <Alert variant="success">
          Login Berhasil
        </Alert>
      )
      setMessage(alert)
      setShow(false)
      
      dispatch({
        type: "LOGIN_SUCCESS",
        payload
      })
     
    
     } catch (error) {
       
    const alert = (
      <Alert variant="danger">
        Login Failed
      </Alert>
    )
    setMessage(alert)
   
  }
})

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="modal-title fs-1 fw-bold">Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {message && message}
          <Form onSubmit={(e) => handleSubmit.mutate(e)}>
            <Form.Group className="mb-3">
              <GlobalForm
                type="text"
                name="email"
                onChange={handleChange}
                value={email}
                placeholder="Email"
                required="required"
                autofocus="autofocus"
                autocomplete="off"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <GlobalForm
                type="password"
                name="password"
                onChange={handleChange}
                value={password}
                placeholder="Password"
                required="required"
              />
            </Form.Group>
            <Form.Group className="">
              <GlobalButton
                name="Login"
                type="submit"
                className="btn link border-0 w-100 mt-2"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="text-center">
          <p>
            Don't have an account ? click
            <span
              className="ms-1 fw-bold"
              style={{ cursor: "pointer" }}
              onClick={() => {
                setShow(false);
                setShowRegister(true);
              }}
            >
              Here
            </span>
          </p>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Login;
