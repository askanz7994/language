
import { Routes } from "react-router-dom";
import { mainRoutes } from "./mainRoutes";
import { malayalamRoutes } from "./malayalamRoutes";
import { englishRoutes } from "./englishRoutes";
import { hindiRoutes } from "./hindiRoutes";
import { spanishRoutes } from "./spanishRoutes";
import { frenchRoutes } from "./frenchRoutes";
import { germanRoutes } from "./germanRoutes";
import { otherLanguageRoutes } from "./otherLanguageRoutes";

export const AppRoutes = () => {
  return (
    <Routes>
      {mainRoutes}
      {malayalamRoutes}
      {englishRoutes}
      {hindiRoutes}
      {spanishRoutes}
      {frenchRoutes}
      {germanRoutes}
      {otherLanguageRoutes}
    </Routes>
  );
};
