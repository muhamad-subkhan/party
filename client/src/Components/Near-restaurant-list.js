/* eslint-disable */
import React, { useContext, useState } from "react";
import { Card, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { LoginContext } from "../context/DataContext";
// import { NearRestaurant } from "../Data-Dummy/Near-restaurant";
import Login from "../Pages/Login";
import { useQuery } from "react-query";
import { API } from "../Components/Config/api";

export const NearRestaurantList = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [dataLogin, dispatch] = useContext(LoginContext);

  let { data: products } = useQuery("productsChache", async () => {
    const response = await API.get("/products");
    return response.data.data;
  });

  // console.log("ini produk", products);

  return (
    <div style={{ backgroundColor: "#e5e5e5" }}>
      <Container>
        <div className="near-head pt-5">
          <p className="fw-bold fs-1">Restaurant Near You</p>
        </div>
        <div className="near-list pb-5 mt-4 d-md-flex flex-row flex-wrap gap-4 justify-content-lg-between justify-content-md-center">
          {products?.map((item, index) => {
            return (
              <Card className="near-item mt-3 mt-md-0 shadow p-2" key={index}>
                <Card.Img variant="top" src={item?.image} alt={item?.image} />
                <Card.Body>
                  <Card.Title
                    style={{
                      marginLeft: "-13px",
                    }}
                  >
                    {dataLogin.isLogin ? (
                      <Link to="/DetailResto" className="text-black">
                        {item?.title}
                      </Link>
                    ) : (
                      <span
                        style={{ cursor: "pointer" }}
                        onClick={() => setShowLogin(true)}
                        className="text-black"
                      >
                        {item?.title}
                      </span>
                    )}{" "}
                  </Card.Title>
                  <Card.Text
                    style={{
                      marginLeft: "-13px",
                    }}
                  >
                    <strong>Rp.{item?.price}</strong>
                  </Card.Text>
                </Card.Body>
              </Card>
            );
          })}
        </div>
      </Container>
      <Login show={showLogin} setShow={setShowLogin} />
    </div>
  );
};
