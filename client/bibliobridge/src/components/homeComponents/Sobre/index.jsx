import Titulo from "../Titulo";
import "./Sobre.css";

function Sobre() {
    return(
        <section className="sobre">
            <Titulo>Conheça nossa plataforma para<br />bibliotecários</Titulo>
            <p>
                Bem-vindo a BiblioBridge! Somos uma solução inovadora criada especialmente para simplificar a gestão de bibliotecas. Nosso objetivo é fornecer ferramentas poderosas e intuitivas que permitam aos bibliotecários organizar, catalogar e compartilhar recursos de maneira eficiente, tudo em um único lugar.
            </p>
        </section>
    )
}

export default Sobre;