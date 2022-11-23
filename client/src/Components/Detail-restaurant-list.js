import React, { useContext } from "react";
import { Button, Card, Container } from "react-bootstrap";
import { DetailRestaurant } from "../Data-Dummy/Detail-restaurant";
import { CounterContext } from "../context/Data-counter";


function DetailRestaurantList() {
  const [dataCounter, setDataCounter] = useContext(CounterContext);
  


  function AddUser(item) {
    let newData = dataCounter.counter;
    newData.push({ ...item });
    setDataCounter({
      type: "ADD",
      valCounter: newData,
    });
    // console.log(dataCounter);
  }
  return (
    <div style={{ backgroundColor: "#e5e5e5" }}>
      <Container>
        <div className="near-head pt-5">
          <p className="fw-bold fs-1">Geprek Bensu, Menus</p>
          <hr />
        </div>
        <div className="pb-5 mt-4 d-md-flex flex-row flex-wrap gap-5 justify-content-lg-start justify-content-md-center ">
          {DetailRestaurant.map((item, index) => {
            return (
              <div>
                <Card
                  className="detail-restaurant mt-3 mt-md-0 shadow"
                  key={index}
                >
                  <Card.Img
                    variant="top"
                    src={item.image}
                    style={{ height: "140px" }}
                  />
                  <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text className="text-danger">{item.price}</Card.Text>
                    <Button
                      variant="warning"
                      className="w-100"
                      onClick={() => AddUser()}
                    >
                      Add to chart
                    </Button>
                  </Card.Body>
                </Card>
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
}

export default DetailRestaurantList;
