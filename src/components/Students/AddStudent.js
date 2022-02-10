import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "./AddStudent.css";
const AddStudent = () => {
  const [studentData, setStudentData] = useState({});

  const handleInput = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newStudentData = { ...studentData };
    newStudentData[field] = value;
    setStudentData(newStudentData);
  };

  const handleForm = (e) => {
    e.preventDefault();
    axios
      .post(
        `https://glacial-savannah-90083.herokuapp.com/add-student`,
        studentData
      )
      .then((response) => {
        if (response.data.insertedId) {
          Swal.fire({
            icon: "success",
            text: "Successfully Product Added",
            button: "ok",
          });
          e.target.reset();
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          text: "Something went wrong Please Reload Add Try Again",
          button: "ok",
        });
      });
  };
  return (
    <section>
      <div>
        <div className="text-center">
          <h1>Add A New Student</h1>
        </div>
        <form id="add-student-form" onSubmit={handleForm}>
          <div className="add-student-form-design">
            <div className="single-add-student-input-area">
              <label htmlFor="full-name">Student Full Name</label>
              <input
                type="text"
                placeholder="Student Full Name"
                id="full-name"
                name="fullName"
                onInput={handleInput}
                required
              />
            </div>
            <div className="single-add-student-input-area">
              <label htmlFor="hall-name">Hall Name</label>
              <input
                type="text"
                placeholder="Student Hall Name"
                name="hallName"
                id="hall-name"
                onInput={handleInput}
                required
              />
            </div>
          </div>
          <div className="add-student-form-design">
            <div className="single-add-student-input-area">
              <label htmlFor="roll">Student Roll</label>
              <input
                type="number"
                placeholder="Student Roll No"
                name="roll"
                id="roll"
                onInput={handleInput}
                required
              />
            </div>
            <div className="single-add-student-input-area">
              <label htmlFor="age">Student Age</label>
              <input
                type="number"
                placeholder="Student Age"
                name="age"
                id="age"
                onInput={handleInput}
                required
              />
            </div>
          </div>
          <div className="add-student-form-design">
            <div className="single-add-student-input-area">
              <label htmlFor="class">Student Class</label>
              <input
                type="text"
                placeholder="Student Class Name"
                name="class"
                id="class"
                onInput={handleInput}
                required
              />
            </div>
            <div className="single-add-student-input-area">
              <label htmlFor="status">Student Status</label>
              <input
                list="student-status"
                placeholder="Student Status"
                name="studentStatus"
                id="status"
                onInput={handleInput}
                required
              />
              <datalist id="student-status">
                <option value="Active" />
                <option value="Inactive" />
              </datalist>
            </div>
          </div>
          <div className="add-student-form-design">
            <input className="btn" type="submit" value="Add Student" />
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddStudent;
