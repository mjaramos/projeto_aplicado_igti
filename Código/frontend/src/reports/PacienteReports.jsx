import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'

export default function PacienteReports(pacientes) {
  
  pdfMake.vfs = pdfFonts.pdfMake.vfs;

  const reportTitle = [
    {
      text: 'Pacientes',
      fontSize: 15,
      bold: true,
      margin: [15, 20, 0, 45]
    }
  ]

  const dados = pacientes.map((paciente) => {
    return [
      { text: paciente.nome, fontSize: 9, margin: [0, 2, 0, 2] },
      { text: paciente.email, fontSize: 9, margin: [0, 2, 0, 2]  },
      { text: paciente.telefone, fontSize: 9, margin: [0, 2, 0, 2]  },
      { text: paciente.endereco, fontSize: 9, margin: [0, 2, 0, 2]  },
    ]
  })

  const details = [
    {
      table: {
        headerRows: 1,
        widths: ['*', '*', '*', '*'],
        body: [
          [
            { text: 'Nome', style: 'tableHeader', fontSize: 10 },
            { text: 'E-mail', style: 'tableHeader', fontSize: 10 },
            { text: 'Telefone', style: 'tableHeader', fontSize: 10 },
            { text: 'Endereço', style: 'tableHeader', fontSize: 10 },
          ],
          ...dados
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

  const pacienteDefinitions = {

    pageSize: 'A4',
    pageMargins: [15, 50, 15, 40],

    header: [reportTitle],
    content: [details],
    footer: Rodape

  }

  pdfMake.createPdf(pacienteDefinitions).download();

}
