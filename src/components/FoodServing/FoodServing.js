import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Food Serving.css";
import Swal from "sweetalert2";
import { Button, InputGroup, Modal, Spinner, Table } from "react-bootstrap";
const FoodServing = () => {
  const [student, setStudent] = useState({});
  const [studentRoll, setStudentRoll] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [servingData, setServingData] = useState({});
  const [allFoods, setAllFoods] = useState([]);

  //   Modal
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    axios
      .get(`https://glacial-savannah-90083.herokuapp.com/all-foods`)
      .then((response) => {
        setAllFoods(response.data);
      });
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setIsLoading(true);
    axios
      .get(
        `https://glacial-savannah-90083.herokuapp.com/single-student?studentRoll=${studentRoll}`
      )
      .then((response) => {
        setStudent(response.data);
        setIsLoading(false);
        e.target.reset();
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          text: "SomeThing went warning Please Try Again.",
          buttons: "ok",
        });
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleServingInput = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newServingData = { ...servingData };
    newServingData[field] = value;
    setServingData(newServingData);
  };

  const handleServingForm = (e) => {
    e.preventDefault();
    const updateServingData = { ...servingData };
    updateServingData.roll = studentRoll;
    updateServingData.status = "server";
    const { roll, date, shift } = updateServingData;
    axios
      .get(
        `https://glacial-savannah-90083.herokuapp.com/serving-food?roll=${roll}&&date=${date}&&shift=${shift}`
      )
      .then((response) => {
        if (response.data === null) {
          axios
            .post(
              `https://glacial-savannah-90083.herokuapp.com/add-serving-food`,
              updateServingData
            )
            .then((response) => {
              if (response.data.insertedId) {
                Swal.fire({
                  icon: "success",
                  text: "Succefully Food Served",
                  button: "ok",
                });
                setIsOpen(false);
              }
            })
            .catch(() => {
              Swal.fire({
                icon: "error",
                text: "Something went wrong Please Reload Add Try Again",
                button: "ok",
              });
            });
        } else {
          Swal.fire({
            icon: "warning",
            text: "“Already served",
            button: "ok",
          });
        }
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          text: "Something went wrong Please Reload Add Try Again",
          button: "ok",
        });
      });
  };

  return (
    <section id="serving-food-section">
      <div className="serving-food-section-title">
        <h1>Input Student Roll no. For Serving Food</h1>
      </div>
      <div className="search-student">
        <form onSubmit={handleSearch}>
          <input
            type="number"
            placeholder="Please Enter Student Roll Number"
            name="rollNo"
            onInput={(e) => setStudentRoll(e.target.value)}
            required
          />
          <input className="btn" type="submit" value="Search" />
        </form>
      </div>
      <div className="student-list-for-serving-food">
        {student !== null && Object.keys(student).length >= 1 && (
          <Table responsive striped bordered hover>
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Hall No</th>
                <th>Roll No</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                key={student._id}
              >
                <td>{student.fullName}</td>
                <td>{student.hallName}</td>
                <td>{student.roll}</td>
                <td>
                  <Button
                    style={{
                      textAlign: "center",
                      backgroundColor: "red",
                      color: "#f5f5f5",
                    }}
                    variant="outlined"
                    onClick={handleShow}
                  >
                    Serve Food
                  </Button>
                </td>
              </tr>
            </tbody>
          </Table>
        )}
        {student === null && isLoading !== true && (
          <h1
            style={{
              textAlign: "center",
            }}
          >
            NO Student Found or Invalid Id
          </h1>
        )}
      </div>
      {isLoading && <Spinner animation="border" variant="secondary" />}
      <Modal show={show} onHide={handleClose}>
        <button
          onClick={handleClose}
          style={{
            position: "absolute",
            top: "5px",
            right: "5px",
            fontSize: "20px",
            background: "transparent",
            cursor: "pointer",
          }}
        >
          X
        </button>
        <div className="serving-form-section">
          <div className="serving-form-section-title my-5">
            <h2>Food Serving Form</h2>
          </div>
          <form onSubmit={handleServingForm}>
            <div className="serving-form-design">
              <label htmlFor="shift">Shift</label>
              <input
                list="shift-list"
                placeholder="Select Shift List"
                name="shift"
                id="shift"
                onInput={handleServingInput}
                required
              />
              <datalist id="shift-list">
                <option value="Day" />
                <option value="Night" />
              </datalist>
            </div>
            <div className="serving-form-design">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                name="date"
                id="date"
                onInput={handleServingInput}
                required
              />
            </div>
            <div className="serving-form-design">
              <label htmlFor="food-list">Food List</label>
              <input
                list="food-type"
                placeholder="Select Food"
                id="food-list"
                name="foodType"
                onInput={handleServingInput}
                required
              />
              <datalist id="food-type">
                {allFoods.map((food) => (
                  <option value={food.foodName} />
                ))}
              </datalist>
            </div>
            <div className="serving-form-design">
              <input className="btn" type="submit" value="Submit" />
            </div>
          </form>
        </div>
      </Modal>
    </section>
  );
};

export default FoodServing;
