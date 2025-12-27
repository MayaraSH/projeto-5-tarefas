import { useDispatch } from 'react-redux'
import { ChangeEvent, useEffect, useRef, useState } from 'react'

import * as S from './styles'
import { remover, editar, alterarStatus } from '../../store/redurcers/tarefas'
import TarefaClass from '../../models/Tarefa'
import { Botao, BotaoSalvar } from '../../styles'
import * as enums from '../../utils/enums/Tarefa'

type Props = TarefaClass

const Tarefa = ({
  titulo,
  prioridade,
  status,
  descricao: descricaoOriginal,
  id
}: Props) => {
  const dispatch = useDispatch()
  const [estaEditando, setEstaEditando] = useState(false)
  const [descricao, setDescricao] = useState(descricaoOriginal)

  const descriptionRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    setDescricao(descricaoOriginal)
  }, [descricaoOriginal])

  useEffect(() => {
    if (estaEditando && descriptionRef.current) {
      descriptionRef.current.focus()
    }
  }, [estaEditando])

  function cancelarEdicao() {
    setEstaEditando(false)
    setDescricao(descricaoOriginal)
  }

  function alteraStatusTarefa(evento: ChangeEvent<HTMLInputElement>) {
    dispatch(
      alterarStatus({
        id,
        finalizado: evento.target.checked
      })
    )
  }

  return (
    <S.Card>
      <label htmlFor={titulo}>
        <input
          type="checkbox"
          id={titulo}
          checked={status === enums.Status.CONCLUIDA}
          onChange={alteraStatusTarefa}
        />
        <S.Titulo $concluida={status === enums.Status.CONCLUIDA}>
          {estaEditando && <em>Editando: </em>}
          {titulo}
        </S.Titulo>
      </label>

      <S.Tag $parametro="prioridade" $prioridade={prioridade}>
        {prioridade}
      </S.Tag>

      <S.Tag $parametro="status" $status={status}>
        {status}
      </S.Tag>

      <S.Descricao
        id={`descricao-${id}`}
        name="descricao"
        disabled={!estaEditando}
        value={descricao}
        onChange={(evento) => setDescricao(evento.target.value)}
        ref={descriptionRef}
      />

      <S.Acoes>
        {estaEditando ? (
          <>
            <BotaoSalvar
              onClick={() => {
                dispatch(
                  editar({
                    titulo,
                    prioridade,
                    status,
                    descricao,
                    id
                  })
                )
                setEstaEditando(false)
              }}
            >
              Salvar
            </BotaoSalvar>

            <S.BotaoCancelarRemover onClick={cancelarEdicao}>
              Cancelar
            </S.BotaoCancelarRemover>
          </>
        ) : (
          <>
            <Botao onClick={() => setEstaEditando(true)}>Editar</Botao>
            <S.BotaoCancelarRemover onClick={() => dispatch(remover(id))}>
              Remover
            </S.BotaoCancelarRemover>
          </>
        )}
      </S.Acoes>
    </S.Card>
  )
}

export default Tarefa
