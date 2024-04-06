import "./Titulo.css" 

// eslint-disable-next-line react/prop-types
function Titulo({ children }) {
    return (
        <h1 className="home-titulo">{children}</h1>
    )
}

export default Titulo;