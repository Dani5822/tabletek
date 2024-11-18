import React from 'react';
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider } from 'react-router-dom'
import TabletFelvetel from './components/tabletFelvetel';
import TabletTorles from './components/tabletTorles';
import TabletLista from './components/tabletLista';
import Kezdolap from './components/kezdolap';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Kezdolap />,
  },
  {
    path: "/tabletfelvetel",
    element: <TabletFelvetel />,
  },
  {
    path: "/tabletTorles",
    element: <TabletTorles />,
  },
  {
    path: "/tableteklista",
    element: <TabletLista />,
  },
]);


createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
