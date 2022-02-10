import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Button, InputGroup, Spinner, Table } from "react-bootstrap";
const ManageStudents = () => {
  const [allStudents, setAllStudents] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [dataLoading, setDataLoading] = useState(true);
  const [selectStudent, setSelectStudent] = useState([]);
  const [status, setStatus] = useState("");
  const navigate = useNavigate();
  const size = 10;

  useEffect(() => {
    setDataLoading(true);
    axios
      .get(
        `https://glacial-savannah-90083.herokuapp.com/all-students?currentPage=${currentPage}&&size=${size}`
      )
      .then((response) => {
        setAllStudents(response.data.allFoods);
        const totalPageNumber = Math.ceil(response.data.count / size);
        setTotalPage(totalPageNumber);
        setDataLoading(false);
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          text: "Something went wrong Please Reload And Try Again",
          button: "ok",
        });
        setDataLoading(false);
      })
      .finally(() => {
        setDataLoading(false);
      });
  }, [currentPage, status]);

  if (dataLoading) return <Spinner animation="border" variant="secondary" />;

  const handleStudentDeleteBtn = (e, id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove Student Info!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(
            `https://glacial-savannah-90083.herokuapp.com/delete-single-student?studentId=${id}`
          )
          .then((response) => {
            if (response.data.deletedCount) {
              Swal.fire({
                icon: "success",
                text: "Succefully Delete the Product",
                button: "ok",
              });
              e.target.parentElement.parentElement.remove();
            }
          })
          .catch(() => {
            Swal.fire({
              icon: "error",
              text: "Something went wrong Please Reload And Try Again",
              button: "ok",
            });
          });
      }
    });
  };

  const handleUpdateButton = (id) => {
    navigate(`/update-student-info/${id}`, {
      replace: true,
    });
  };

  const handleStatusInput = (e, studentId) => {
    const isChecked = e.target.checked;
    let newSelectStudent = [...selectStudent];
    const index = newSelectStudent.findIndex((id) => id === studentId);
    if (index === -1 && isChecked === true) {
      newSelectStudent.push(studentId);
    } else if (index >= 0 && isChecked === false) {
      newSelectStudent.splice(index, 1);
    }
    setSelectStudent(newSelectStudent);
  };

  const handleUpdateStatus = (status) => {
    axios
      .patch(
        `https://glacial-savannah-90083.herokuapp.com/update-student-status?studentsId=${selectStudent}`,
        { status: status }
      )
      .then((response) => {
        if (response.data.modifiedCount) {
          Swal.fire({
            icon: "success",
            text: "Successfully Update Student Status",
            button: "ok",
          });
          setStatus(status);
          setSelectStudent([]);
        }
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          text: "Somethin went wrong Please Reload And Try Again",
          button: "ok",
        });
      });
  };

  return (
    <>
      {allStudents.length >= 1 && (
        <section id="manage-all-products">
          <Table responsive striped bordered hover>
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Hall Name</th>
                <th>Roll No</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {allStudents.map((data, index) => (
                <tr
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  key={data._id}
                >
                  <td>{data.fullName}</td>
                  <td>{data.hallName}</td>
                  <td>{data.roll}</td>
                  <td>{data.studentStatus}</td>
                  <td>
                    <InputGroup.Checkbox
                      onInput={(e) => handleStatusInput(e, data._id)}
                      size="small"
                    />
                    <Button
                      style={{
                        textAlign: "right",
                        marginRight: "7px",
                        backgroundColor: "dodgerblue",
                        color: "#f5f5f5",
                      }}
                      variant="outlined"
                      onClick={() => handleUpdateButton(data._id)}
                    >
                      Update
                    </Button>
                    <Button
                      style={{
                        textAlign: "right",
                        backgroundColor: "red",
                        color: "#f5f5f5",
                      }}
                      variant="outlined"
                      onClick={(e) => handleStudentDeleteBtn(e, data._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <div className="show-status-update-button">
            {selectStudent.length >= 1 && (
              <div className="status-update-button">
                <button
                  className="list-btn"
                  onClick={() => handleUpdateStatus("Active")}
                >
                  Active
                </button>
                <button
                  className="list-btn"
                  onClick={() => handleUpdateStatus("InActive")}
                >
                  Inactive
                </button>
              </div>
            )}
          </div>
          <div className="pagination">
            {[...Array(totalPage).keys()].map((number) => (
              <button
                key={number}
                id={number === currentPage ? "active-page" : ""}
                onClick={() => setCurrentPage(number)}
              >
                {number + 1}
              </button>
            ))}
          </div>
        </section>
      )}
    </>
  );
};

export default ManageStudents;
