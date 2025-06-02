
import { Route } from "react-router-dom";
import Index from "@/pages/Index";
import Auth from "@/pages/Auth";
import Profile from "@/pages/Profile";
import LanguageSelection from "@/pages/LanguageSelection";
import NotFound from "@/pages/NotFound";

export const mainRoutes = (
  <>
    <Route path="/" element={<Index />} />
    <Route path="/auth" element={<Auth />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/languages" element={<LanguageSelection />} />
    <Route path="*" element={<NotFound />} />
  </>
);
