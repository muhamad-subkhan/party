/* eslint-disable */ 
import React, { useContext, useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import * as Icon from "react-icons/fa";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import GlobalForm from "../Components/Atoms/Global-form";
import { API } from "../Components/Config/api";
import { LoginContext } from "../context/DataContext";

function EditProfile() {
  const [state] = useContext(LoginContext);

  // console.log(dataLogin);
  let navigate= useNavigate()

  const { id } = useParams()
  // console.log("ini id", id);
  
  const [preview, setPreview] = useState(null)

  const [form, setForm] = useState({
    fullName: "",
    image: "",
    email: "",
    phone: "",
    location: "",
  })

  let { data: profiles } = useQuery("profilesChache", async () => {
    const response = await API.get(`/users/${id}`)
    // console.log("profiles",response.data.data);
    return response.data.data
  })

  useEffect(() => {
    if (profiles){
      setPreview(profiles.image);
      setForm({
        ...form,
        fullName: profiles.fullName,
        email: profiles.email,
        phone: profiles.phone,
        location: profiles.location
      })
    }
  }, [profiles])

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
      e.target.type === "file" ? e.target.files : e.target.value
    })
    console.log(form);

    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0])
      setPreview(url)
    }
  }

  const handleSubmit = async (e) => {
    try{
      e.preventDefault();


      const formData = new FormData()
      console.log(formData);
      console.log("ini image",formData.image);
      if (preview) {
        formData.set("image",form?.image[0], form?.image[0].name)
      }
      formData.set("fullName", form.fullName);
      formData.set("email", form.email);
      formData.set("phone", form.phone);
      formData.set("location", form.location)

      console.log(form);
      
      const response = await API.patch("/user/" + profiles.id, formData) 
      console.log("ini data update profile", response.data);
      navigate("/")
    }catch (error) {
      console.log(error);
    }

  }

  return (
    <>
      <Container>
        <div className="Edit-profile mt-5">
          {state.user.role === "Partner" ? (
            <p className="fs-3 fw-bold">Edit Profile Partner</p>
          ) : (
            <p className="fs-3 fw-bold">Edit Profile</p>
          )}
          <hr />
        </div>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Form.Group
            className="mb-3 d-md-flex gap-3"
            controlId="formBasicEmail"
          >
            <GlobalForm
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={form?.fullName}
              onChange={handleChange}
            />
                        <div
              style={{
                width: "150px",
                background: "yellow",
              }}
            >
              <label
                htmlFor="uploads"
                className="text-white rounded py-2 px-2 d-flex justify-content-between align-items-center"
                style={{
                  backgroundColor: "#433434",
                  height: "40px",
                  cursor: "pointer"
                }}
              >
                {" "}
                attach image <Icon.FaPaperclip />
              </label>
              <input
                id="uploads"
                name="image"
                type="file"
                onChange={handleChange}
                hidden
              ></input>
              </div>
          </Form.Group>

          <Form.Group className="mb-3 border-2" controlId="formBasicPassword">
            <GlobalForm
             type="text"
             name="email"
             placeholder="Email" 
             value={form?.email}
             onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <GlobalForm 
            type="text" 
            name="phone" 
            placeholder="Phone" 
            value={form?.phone}
            onChange={handleChange} />
          </Form.Group>
          <Form.Group
            className="mb-3 d-md-flex gap-3"
            controlId="formBasicPassword"
          >
            <GlobalForm
              type="text"
              name="location"
              placeholder="Location"
              value={form?.location}
              onChange={handleChange}
            />
             <button
              className="btn text-white mt-3 mt-md-0 d-flex justify-content-between align-items-center"
              style={{ backgroundColor: "#433434" }}
            >
              Select on map <Icon.FaPaperclip />
            </button>
          </Form.Group>
          <Form.Group className="mt-5 d-flex justify-content-md-end justify-content-center">
            <Button
              style={{ backgroundColor: "#433434", width: "200px" }}
              className="border-0"
              type="submit"
            >
              Save
            </Button>
          </Form.Group>
          {preview && (
            <div>
              <img
                src={preview}
                style={{
                  maxWidth: "10%",
                  maxHeight: "10%",
                  objectFit: "cover",
                }}
                alt={preview}
              />
            </div>
          )}
        </Form>
      </Container>
    </>
  );
}

export default EditProfile;
