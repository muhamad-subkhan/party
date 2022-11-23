import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import * as Icon from "react-icons/fa";
import { useMutation } from "react-query";
import GlobalForm from "../Components/Atoms/Global-form";
import { API } from "../Components/Config/api";
import { useNavigate } from "react-router-dom";

function AddProduk() {
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);
  const [form, setForm] = useState({
    title: "",
    image: "",
    price: 0,
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });

    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const formData = new FormData();
      formData.set("title", form.title);
      formData.set("image", form.image[0], form.image[0].name);
      formData.set("price", form.price);

      const response = await API.post("/product", formData)

      navigate("/");

      // console.log(response);
    } catch (error) {
      // console.log(error);
    }
  });

  return (
    <>
      <Container>
        <div className="add-produk mt-5">
          <p className="fs-3 fw-bold">Add Produk</p>
          <hr />
          <Form onSubmit={(e) => handleSubmit.mutate(e)}>
            <Form.Group
              className="mb-3 d-md-flex gap-3"
              controlId="formBasicEmail"
            >
              <GlobalForm
                type="text"
                name="title"
                placeholder="Title"
                onChange={handleChange}
              />
              {/* <button
                className="btn text-white mt-3 mt-md-0 d-flex justify-content-between align-items-center"
                style={{ backgroundColor: "#433434" }}
              >
                Attach Image <Icon.FaPaperclip />
              </button> */}
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
                name="price"
                placeholder="Price"
                onChange={handleChange}
              />
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
                    maxWidth: "20%",
                    maxHeight: "20%px",
                    objectFit: "cover",
                  }}
                  alt={preview}
                />
              </div>
            )}
          </Form>
        </div>
      </Container>
    </>
  );
}

export default AddProduk;
