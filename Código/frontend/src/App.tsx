import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GerenciamentoPsicoScreen from './GerenciamentoPsicoScreen';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GerenciamentoPsicoScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
