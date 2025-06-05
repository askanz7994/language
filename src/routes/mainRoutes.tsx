
import { Route, Navigate } from "react-router-dom";
import Index from "@/pages/Index";
import Auth from "@/pages/Auth";
import Profile from "@/pages/Profile";
import NotFound from "@/pages/NotFound";

export const mainRoutes = (
  <>
    <Route path="/" element={<Index />} />
    <Route path="/auth" element={<Auth />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/languages" element={<Navigate to="/learn-english" replace />} />
    <Route path="*" element={<NotFound />} />
  </>
);
