import moment from 'moment';
import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'

export default function SessaoReports(sessoes) {
  
  pdfMake.vfs = pdfFonts.pdfMake.vfs;

  const reportTitle = [
    {
      text: 'Sessões',
      fontSize: 15,
      bold: true,
      margin: [15, 20, 0, 45]
    }
  ]

  let soma = 0;
  const dados = sessoes.map((sessao) => {
    soma += parseInt(sessao.valor)
    console.log("Soma: ", soma)
    return [
      { text: sessao.paciente.nome, fontSize: 9, margin: [0, 2, 0, 2] },
      { text: moment(sessao.data).format('DD/MM/yyyy HH:mm'), fontSize: 9, margin: [0, 2, 0, 2]  },
      { text: sessao.valor, fontSize: 9, margin: [0, 2, 0, 2]  },
    ]
  })

  const details = [
    {
      table: {
        headerRows: 1,
        widths: ['*', '*', '*'],
        body: [
          [
            { text: 'Paciente', style: 'tableHeader', fontSize: 10 },
            { text: 'Data', style: 'tableHeader', fontSize: 10 },
            { text: 'Valor', style: 'tableHeader', fontSize: 10 },
          ],
          ...dados,
          [
            { text: 'Total', fontSize: 9, margin: [0, 2, 0, 2] },
            { text: '', fontSize: 9, margin: [0, 2, 0, 2]  },
            { text: soma, fontSize: 9, margin: [0, 2, 0, 2]  },
          ]
        ]
      },
      layout: 'lightHorizontalLines'
    }
  ]

  function Rodape(currentPage, pageCount){
    return [
      {
        text: currentPage + ' / ' + pageCount,
        alignment: 'right',
        fontSize: 9,
        margin: [0, 10, 20, 0]
      }
    ]
  }

  const sessaoDefinitions = {

    pageSize: 'A4',
    pageMargins: [15, 50, 15, 40],

    header: [reportTitle],
    content: [details],
    footer: Rodape

  }

  pdfMake.createPdf(sessaoDefinitions).download();

}
