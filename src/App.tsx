import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import Layout from "./components/layout/Layout";
import HomePageLayout from "./pages/HomePageLayout";
import TodoEditModalPage from "./pages/TodoEditModalPage";
import { Toaster } from "react-hot-toast";
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
      <Toaster />
    </>
  );
}

export default App;
