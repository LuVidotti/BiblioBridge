import { Link } from "react-router-dom";
import "./Page404.css";

function Page404() {
    return(
        <div>
            <h1>voce se perdeu, volte para a pagina inicial</h1>
            <Link to="/">Home</Link>
        </div>
    )
}

export default Page404;