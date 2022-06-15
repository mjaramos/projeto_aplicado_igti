import { AppBar, Box, Tab, Tabs } from '@material-ui/core'
import { useState } from 'react';
import TabPanel from './component/TabPanel';
import GerenciamentoHeader from './GerenciamentoHeader'
import Paciente from './Paciente';
import Sessao from './Sessao';

export default function GerenciamentoPsicoScreen() {

  const [value, setValue] = useState(0);


  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div>
      <Box>
        <GerenciamentoHeader />
      </Box>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Paciente" />
          <Tab label="Sessões" />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Paciente />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Sessao />
      </TabPanel>
    </div>
  )
}
