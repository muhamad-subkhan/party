// import { useState } from "react";
import { Card, Container } from "react-bootstrap";
import { useQuery } from "react-query";
// import { LoginContext } from "../context/DataContext";
// import { Populars } from "../Data-Dummy/Popular-restaurant";
import { API } from "./Config/api";


export const PopularList = () => {
  // const [state]=useState(LoginContext)

  let { data: restaurant } = useQuery("restaurantChache", async () => {
    const response = await API.get("/users")
    // console.log(response);
    return response.data.data
  })

let restauran = restaurant?.filter(restau => restau.role === "Partner")
// console.log("ini restauran",restauran);
// console.log(restaurant);

  return (
    <div style={{ backgroundColor: "#e5e5e5" }}>
      <Container>
        <div className="head pt-5">
          <p className="fw-bold fs-1">Popular Restaurant</p>
        </div>
        <div className="popular-list mt-4 d-md-flex flex-wrap gap-4 flex-row justify-content-lg-between justify-content-center">
          {restauran?.map((item, index) => {
            return (
              <div
                className="popular-item d-flex gap-3 p-2 mt-3 mt-md-0 shadow rounded align-items-center "
                key={index}
              >
                <Card.Img src={item?.image} alt={item.fullName} style={{
                  width: "55px",
                  height: "55px"
                }}/>
                <h5>{item.fullName}</h5>
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
};
