import { createBrowserRouter } from "react-router-dom";
import { CharactersList, EpisodesList, EpisodeDetail } from "./pages";

export const router = createBrowserRouter([
  { path: "/", element: <CharactersList></CharactersList> },
  { path: "/characters", element: <CharactersList></CharactersList> },
  { path: "/episodes", element: <EpisodesList></EpisodesList> },
  { path: "/episodes/:id", element: <EpisodeDetail></EpisodeDetail> },
]);