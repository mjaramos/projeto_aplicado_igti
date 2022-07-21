import { AppBar, Tab, Tabs } from '@material-ui/core'
import { useState } from 'react';
import Calendario from './Calendario';
import { Header } from './component/Header';
import TabPanel from './component/TabPanel';
import HomePage from './HomePage';
import Paciente from './Paciente';
import Relatorio from './Relatorio';
import Sessao from './Sessao';

export default function GerenciamentoPsicoScreen() {

  const [value, setValue] = useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Header title="Gerenciamento de Psicólogos" />
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Home" icon={<i className="fa-solid fa-house" />} />
          <Tab label="Paciente" icon={<i className="fa-solid fa-user" />} />
          <Tab label="Sessões" icon={<i className="fa-solid fa-file" />} />
          <Tab label="Relatórios" icon={<i className="fa-solid fa-file-pdf" />} />
          <Tab label="Calendário" icon={<i className="fa-solid fa-calendar-days" />} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <HomePage />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Paciente />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Sessao />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Relatorio />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <Calendario />
      </TabPanel>
    </>
  )
}
