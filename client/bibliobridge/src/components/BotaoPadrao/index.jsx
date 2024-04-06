import "./BotaoPadrao.css";

// eslint-disable-next-line react/prop-types
function BotaoPadrao({ acao, children }) {
    return(
        <button className="botao-padrao" onClick={() => acao}>{children}</button>
    )
}

export default BotaoPadrao;