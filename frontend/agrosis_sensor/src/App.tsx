import { Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import SensorPage from '@/pages/SensorPage';




const queryClient = new QueryClient(); 

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
          <Route path="/" element={<SensorPage />} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
