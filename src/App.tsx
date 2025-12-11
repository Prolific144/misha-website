import './styles/globals.css';
import { HomePage } from './pages/HomePage';
import { SEOMeta } from './components/SEOMeta';
import { BackToTop } from './components/BackToTop';
import { usePerformanceMetrics } from './hooks/usePerformanceMetrics';

function App() {
  usePerformanceMetrics(); // Track performance metrics

  return (
    <>
      <SEOMeta />
      <HomePage />
      <BackToTop />
    </>
  );
}

export default App;