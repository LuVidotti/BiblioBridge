import Beneficios from "../../components/homeComponents/Beneficios";
import CriarConta from "../../components/homeComponents/CriarConta";
import Footer from "../../components/homeComponents/Footer";
import Header from "../../components/homeComponents/Header";
import Sobre from "../../components/homeComponents/Sobre";
import "./Home.css";

function Home() {
    return(
        <div className="home">
            <Header />
            <Sobre />
            <Beneficios />
            <CriarConta />
            <Footer />
        </div>
    )
}

export default Home;