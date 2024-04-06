import Titulo from "../Titulo";
import "./Beneficios.css";
import Site from "../../../assets/responsividade.svg";
import Gerenciamento from '../../../assets/gerenciamento.svg';
import Responsividade from "../../../assets/site.svg"

function Beneficios() {
    return(
        <section className="beneficios">
            <div className="titulo-container">
                <Titulo>Benefícios</Titulo>
            </div>

            <div className="beneficio-container">
                <div className="beneficio">
                    <img src={Site} alt="Ilustracao de nosso site" />
                    <div className="beneficio--info">
                        <h2>Facilidade de uso e acesso</h2>
                        <p>
                            Nossa plataforma é totalmente online e foi projetada para ser acessível de qualquer lugar, a qualquer momento.
                            Com uma interface intuitiva e amigável, você pode gerenciar sua biblioteca com facilidade, mesmo sem 
                            experiência técnica.
                        </p>
                    </div>
                </div>
            </div>

            <div className="beneficio-container">
                <div className="beneficio">
                    <div className="beneficio--info">
                        <h2>Gestão abrangente</h2>
                        <p>
                            Gerencie todos os aspectos da sua biblioteca de forma rápida e segura. Desde a catalogação de livros até
                            o controle de empréstimos e devoluções, nossa plataforma oferece ferramentas abrangentes para simplificar 
                            todas as tarefas do seu dia a dia.
                        </p>
                    </div>
                    <img src={Gerenciamento} alt="Ilustracao do poder de gerenciamento de nosso site" />
                </div>
            </div>

            <div className="beneficio-container">
                <div className="beneficio">
                    <img src={Responsividade} alt="Ilustracao da responsividade de nosso site" />
                    <div className="beneficio--info">
                        <h2>Acesso em qualquer lugar</h2>
                        <p>
                            Gerencie sua biblioteca de qualquer lugar, a qualquer momento. Nosso sistema é totalmente responsivo, 
                            o que significa que você pode acessá-lo facilmente em seu computador, tablet ou smartphone. Tenha toda a 
                            sua gestão na palma da sua mão, seja no conforto do seu escritório, em uma reunião ou até mesmo durante 
                            uma visita à sua biblioteca.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Beneficios;