import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope} from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { useState } from 'react';

const Footer = () => {
    const [copied, setCopied] = useState(false);

    const handleCopyEmail = () => {
        const email = 'gusta.quiroga033@gmail.com'; // Tu dirección de correo electrónico
        navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000); // Reiniciar el estado de 'copied' después de 3 segundos
    };
    return (
        <footer className="bg-gray-800 bg-transparent text-white text-center py-4">
            <p>
                Desarollado por Gustavo A. Quiroga |{' '}
                <span className="cursor-pointer underline" onClick={handleCopyEmail}>
                    Click para copiar mi email
                </span>
                
            </p>
            {copied && <span className="ml-2 text-gray-500">Copiado al portapapeles</span>}
            <div className="flex justify-center mt-2">
                <a href="https://api.whatsapp.com/send?phone=5493856178160" target="_blank" rel="noopener noreferrer" className="text-white mx-2">
                    <FontAwesomeIcon icon={faWhatsapp} size="2x" />
                </a>
                <a href="https://www.linkedin.com/in/gustavo-quiroga-772313200/" target="_blank" rel="noopener noreferrer" className="text-white mx-2">
                    <FontAwesomeIcon icon={faLinkedin} size="2x" />
                </a>
            </div>
        </footer>
    );
};

export default Footer;
