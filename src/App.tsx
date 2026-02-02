import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import Layout from "./components/layout/Layout";
import HomePageLayout from "./pages/HomePageLayout";
import TodoEditModalPage from "./pages/TodoEditModalPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route element={<HomePageLayout />}>
              <Route index element={<HomePage />} />
              <Route path="/tasks/:todoId/edit" element={<TodoEditModalPage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
