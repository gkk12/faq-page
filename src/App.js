import './App.css';
import FAQPage from "./components/FAQPage.tsx"
import Footer from './components/Footer.tsx';
import Header from './components/Header.tsx';

function App() {
  return (
    <div className="App">
      <Header/>
      <FAQPage />
      <Footer/>
    </div>
  );
}

export default App;
