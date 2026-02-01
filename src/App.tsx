import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import Layout from "./components/layout/Layout";
import HomePageLayout from "./pages/HomePageLayout";
import TaskEditModalPage from "./pages/TaskEditModalPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route element={<HomePageLayout />}>
              <Route index element={<HomePage />} />
              <Route path="/tasks/:taskId/edit" element={<TaskEditModalPage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
