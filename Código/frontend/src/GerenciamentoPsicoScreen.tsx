import { AppBar, Tab, Tabs } from '@material-ui/core'
import { useState } from 'react';
import { Header } from './component/Header';
import TabPanel from './component/TabPanel';
import HomePage from './HomePage';
import Paciente from './Paciente';
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
    </>
  )
}
