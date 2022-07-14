import { Box } from '@material-ui/core'
import 'rsuite/dist/rsuite.css';
import { Badge, Calendar, CustomProvider, Popover, Whisper } from 'rsuite';
import ptBR from 'rsuite/locales/pt_BR';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { apiGetSessoes } from './services/sessaoService';
import { SessaoState } from './SessaoSlice';
import { getDate, getMonth } from 'date-fns'

export default function Calendario() {

  const [sessoes, setSessoes] = useState<SessaoState[] | []>([]);

  useEffect(() => {

    async function getSessoes() {
      const bkSessoes = await apiGetSessoes()
      setSessoes(bkSessoes);
    }

    getSessoes();

  }, [])

  function getTodoList(date) {
    const day = getDate(date);
    console.log("Day: ", day);
    const month = getMonth(date) + 1;
    console.log("Month: ", month);
    return sessoes.filter((sessao) => {
      let dia = parseInt(moment(sessao.data).format('DD'))
      console.log("Dia: ", dia)
      let mes = parseInt(moment(sessao.data).format('MM'))
      console.log("Mes: ", mes)
      return day === dia && month === mes
    })
  }

  function renderCell(date) {
    const list = getTodoList(date);
    const displayList = list.filter((item, index) => index < 2);

    if (list.length) {
      const moreCount = list.length - displayList.length;
      const moreItem = (
        <li>
          <Whisper
            placement="top"
            trigger="click"
            speaker={
              <Popover>
                {list.map((item, index) => (
                  <p key={index}>
                    <b>{moment(item.data).utc().format('HH:mm')}</b> - {item?.paciente?.nome}
                    {item.inPago ? <i className="fa-solid fa-thumbs-up text-green-500" /> : <i className="fa-solid fa-thumbs-down text-red-500" />}
                  </p>
                ))}
              </Popover>
            }
          >
            <a>{moreCount} more</a>
          </Whisper>
        </li>
      );

      return (
        <ul className="calendar-todo-list">
          {displayList.map((item, index) => (
            <li key={index}>
              <Badge /> <b>{moment(item.data).utc().format('HH:mm')}</b> - {item?.paciente?.nome}
              {item.inPago ? <i className="fa-solid fa-thumbs-up text-green-500" /> : <i className="fa-solid fa-thumbs-down text-red-500" />}
            </li>
          ))}
          {moreCount ? moreItem : null}
        </ul>
      );
    }

    return null;

  }

  function mudarMes(date) {
    console.log('Mes: ', date)
    moment(date)
    return "";
  }

  return (
    <Box alignItems="start" className="text-center pb-5">
      <CustomProvider locale={ptBR}>
        <Calendar renderCell={renderCell} bordered={true} onChange={mudarMes} />
      </CustomProvider>
    </Box>
  )
}
