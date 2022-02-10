import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Button, Spinner, Table } from "react-bootstrap";
import "./ManageFoods.css";
const ManageFoods = () => {
  const [allFoods, setAllFoods] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [dataLoading, setDataLoading] = useState(true);
  const navigate = useNavigate();
  const size = 10;

  useEffect(() => {
    setDataLoading(true);
    axios
      .get(
        `https://glacial-savannah-90083.herokuapp.com/all-foods?currentPage=${currentPage}&&size=${size}`
      )
      .then((response) => {
        setAllFoods(response.data.allFoods);
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
  }, [currentPage]);

  if (dataLoading) return <Spinner animation="border" variant="secondary" />;

  const handleFoodDelete = (e, id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete food item!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(
            `https://glacial-savannah-90083.herokuapp.com/delete-single-food?foodId=${id}`
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
    navigate(`/update-food-info/${id}`, {
      replace: true,
    });
  };
  return (
    <>
      {allFoods.length >= 1 && (
        <section id="manage-all-products">
          <Table responsive striped bordered hover>
            <thead>
              <tr>
                <th>Food Name</th>
                <th>Food Price</th>
                <th>Food Type</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {allFoods.map((data) => (
                <tr
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  key={data._id}
                >
                  <td>{data.foodName}</td>
                  <td>{data.costPrice} $</td>
                  <td>{data.foodType}</td>
                  <td align="center">
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
                      onClick={(e) => handleFoodDelete(e, data._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

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

export default ManageFoods;
