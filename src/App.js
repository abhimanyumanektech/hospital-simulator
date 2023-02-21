import "./App.css";
import GlobalContextProvider from "./components/context/GlobalContextProvider";
import Header from "./components/Header";
import Dashboard from "./components/pages/Dashboard";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import ListOfPatients from "./components/ListOfPatients.js/ListOfPatients";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    // Wrapped the context with whole application
    <GlobalContextProvider>
      <BrowserRouter>
        {/* Header Component */}
        <Header />
        <Toaster // Toaster to show notifications
          toastOptions={{
            duration: 4000,
            style: {
              maxWidth: 500,
              width: "100%",
              textAlign: "center",
              background: "#f3f3f3",
              zIndex: "9999 !important",
            },
          }}
        />
        {/* Routes to navigate within application */}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/list" element={<ListOfPatients />} />
        </Routes>
      </BrowserRouter>
    </GlobalContextProvider>
  );
}

export default App;
