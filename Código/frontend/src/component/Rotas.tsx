import { Route, Routes } from "react-router";
import GerenciamentoPsicoScreen from "../GerenciamentoPsicoScreen";

export default function Rotas() {
  return (
    <Routes>
      <Route path="/" element={<GerenciamentoPsicoScreen />} />
    </Routes>
  )
}
