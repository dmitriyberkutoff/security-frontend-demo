import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import { Invoice } from "./components/Invoice";
import { MainPage } from "./components/MainPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <MainPage/>
        ),
    },
    {
        path: "invoice/:id",
        element: <Invoice />,
    },
]);

createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
);
