
import './App.scss';
import Header from "./components/header/header";
import Routersconfig from "./config/Routersconfig";
import Footer from "./components/footer/footer";

function App() {
  return (
      <div className="App">
          <Header/>
          <Routersconfig/>
          <Footer/>
      </div>
  );
}

export default App;
