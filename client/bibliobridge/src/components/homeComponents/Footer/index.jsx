import "./Footer.css";
import LogoIcon from "../../../assets/LogoIcon.png"
import { FaGithub, FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa6";


function Footer() {
    return(
        <footer className="home-footer">
            <a href="https://vidotti-dev-portfolio.vercel.app/"><img src={LogoIcon} alt="Logotipo da vidotti-dev" /></a>
            <div>
                <a href="https://github.com/LuVidotti"><FaGithub /></a>
                <a href="https://www.instagram.com/lu_vidottipigr/"><FaInstagram /></a>
                <a href="https://www.linkedin.com/in/lu%C3%ADs-felipe-vidotti-de-almeida-5061a3270/"><FaLinkedin /></a>
                <a href="https://wa.me/43999606749"><FaWhatsapp /></a>
            </div>
        </footer>
    )
}

export default Footer;