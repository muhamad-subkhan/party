import React, { useState } from "react";
import { Form, Modal, Alert } from "react-bootstrap";
import GlobalButton from "../Components/Atoms/Global-button";

import { useMutation } from "react-query";
import { API } from "../Components/Config/api";

function Register({ show, setShow, setShowLogin }) {
  const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);


  const [message, setMessage] = useState();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    gender: "",
    phone: "",
    role: "",
  });

  const { fullName, email, password, gender, phone, role } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    console.log(e.target.name, e.target.value);
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const response = await API.post("/register", form);
      console.log(response.data.status);

        const alert = (
          <Alert variant="success" className="py-1">
            Register Berhasil
          </Alert>
        ); 
      setMessage(alert);
        
      // Handling response here
    } catch (error) {

      const alert = (
        <Alert variant="danger" className="py-1">
          Register Failed
        </Alert>
      ); 
      setMessage(alert);
    }
  });

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="fs-1 fw-bold">Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {message && message}
          <Form onSubmit={(e) => handleSubmit.mutate(e)}>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                value={email}/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                value={password}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                name="fullName"
                placeholder="Full Name"
                onChange={handleChange}
                value={fullName}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                name="gender"
                placeholder="Gender"
                onChange={handleChange}
                value={gender}/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                name="phone"
                placeholder="Phone"
                onChange={handleChange}
                value={phone}/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Select
                aria-label="Default select example"
                onChange={handleChange}
                name="role"
                value={role}>
                <option value="">Pilih Role</option>
                <option value="user">As User</option>
                <option value="Partner">As Partner</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <GlobalButton
            name="Register"
            className="btn link w-100 text-white border-0"
            onClick={handleSubmit.mutate}
          />
        </Modal.Footer>
        <p className="text-center">
          Alredy have an account ? click
          <span
            className="ms-1 fw-bold"
            style={{ cursor: "pointer" }}
            onClick={() => {
              setShow(false);
              setShowLogin(true);
            }}
          >
            Here
          </span>
        </p>
      </Modal>
    </>
  );
}

export default Register;
