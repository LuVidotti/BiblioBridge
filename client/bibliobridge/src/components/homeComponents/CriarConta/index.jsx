import BotaoPadrao from "../../BotaoPadrao";
import Titulo from "../Titulo";
import "./CriarConta.css";

function CriarConta() {
    return(
        <section className="criar-conta">
            <div className="titulo-container">
                <Titulo>Crie sua conta</Titulo>
            </div>
            <p>Clique no botão abaixo e comece a usufruir dos <br/> benefícios de nossa plataforma em instantes</p>
            <BotaoPadrao>Criar conta</BotaoPadrao>
        </section>
    )
}

export default CriarConta;