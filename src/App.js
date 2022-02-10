import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import SideBar from "./components/SideBar/SideBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import AddFood from "./components/AddFood/AddFood";
import ManageFoods from "./components/ManageFoods/ManageFoods";
import AddStudent from "./components/Students/AddStudent";
import ManageStudents from "./components/Students/ManageStudents";
import FoodServing from "./components/FoodServing/FoodServing";
import FoodUpdate from "./components/ManageFoods/FoodUpdate";
import StudentUpdate from "./components/Students/StudentUpdate";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="add-food" element={<AddFood />} />
          <Route path="manage-all-foods" element={<ManageFoods />} />
          <Route path="add-student" element={<AddStudent />} />
          <Route path="manage-all-students" element={<ManageStudents />} />
          <Route path="serving-food" element={<FoodServing />} />
          <Route path="update-food-info/:foodId" element={<FoodUpdate />} />
          <Route
            path="update-student-info/:studentId"
            element={<StudentUpdate />}
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
