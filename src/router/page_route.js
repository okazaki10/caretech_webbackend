import React from "react";
import {
  BrowserRouter,
  Routes, Route,
  Link,
  useParams
} from "react-router-dom";
import Homepage from "../view/homepage/homepage";

export default function PageRoute() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
      </Routes>
    </BrowserRouter>
  );
}


