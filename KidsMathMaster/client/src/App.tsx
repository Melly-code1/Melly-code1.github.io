import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import Exercise from "@/pages/exercise";
import ParentDashboard from "@/pages/parent-dashboard";
import CarCreator from "@/pages/car-creator";
import BarbieDesigner from "@/pages/barbie-designer";
import DinosaurMaker from "@/pages/dinosaur-maker";
import Profile from "@/pages/profile";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/exercise/:type" component={Exercise} />
      <Route path="/dashboard" component={ParentDashboard} />
      <Route path="/car-creator" component={CarCreator} />
      <Route path="/barbie-designer" component={BarbieDesigner} />
      <Route path="/dinosaur-maker" component={DinosaurMaker} />
      <Route path="/profile" component={Profile} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
