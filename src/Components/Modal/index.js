
import { FiX } from 'react-icons/fi'
import './modal.css';

export default function Modal({conteudo,close}){
  return(
    <div className="modal">
      <div className="conteiner">
        <button className="close" onClick={close}>
          <FiX size={25} color="#FFF" />
          Voltar
        </button>

        <main>
          <h2>Detalhes do chamado</h2>

          <div className="row">
            <span>
              Cliente: <i>{conteudo.cliente}</i>
            </span>
          </div>

          <div className="row">
            <span>
              Assunto: <i>{conteudo.assunto}</i>
            </span>
            <span>
              Cadastrado em: <i>{conteudo.createdformat}</i>
            </span>
          </div>

          <div className="row">
            <span>
              Status: <i   className="status-badge"   style={{color: "#FFF", backgroundColor: conteudo.status === 'aberto' ? '#5cb85c' : '#999' }}>
                {conteudo.status}</i>
            </span>
          </div>

          {conteudo.complemento !== '' &&(
            <>
            <h3>Complemento</h3>
            <p>
              {conteudo.complemento}
            </p>
          </>
          )}

        </main>
      </div>
    </div>
  )
}