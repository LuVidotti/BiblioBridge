import "./Header.css";
import Logo from "../../../assets/bibliobridge.png";
import BotaoPadrao from "../../BotaoPadrao";

function Header() {
    return(
        <header className="home-cabecalho">
            <img onClick={() => window.location.reload()} src={Logo} alt="Logotipo da blibliobridge" />
            <div>
                <BotaoPadrao>Entrar</BotaoPadrao>
                <BotaoPadrao>Criar conta</BotaoPadrao>
            </div>
        </header>
    )
}

export default Header;