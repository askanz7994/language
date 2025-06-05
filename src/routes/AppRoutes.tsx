
import { Routes } from "react-router-dom";
import { mainRoutes } from "./mainRoutes";
import { englishRoutes } from "./englishRoutes";

export const AppRoutes = () => {
  return (
    <Routes>
      {mainRoutes}
      {englishRoutes}
    </Routes>
  );
};
