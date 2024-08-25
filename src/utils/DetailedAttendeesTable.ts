import {
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TextRun,
  WidthType,
} from 'docx';

function createHeaderRow(title: string) {
  return new TableRow({
    children: [
      new TableCell({
        shading: { fill: 'd3d3d3' },
        verticalAlign: 'center',
        width: {
          size: 100,
          type: WidthType.PERCENTAGE,
        },
        columnSpan: 5,
        children: [
          new Paragraph({
            alignment: 'center',
            children: [
              new TextRun({
                text: title,
                size: '18pt',
                bold: true,
                rightToLeft: true,
              }),
            ],
          }),
        ],
      }),
    ],
    height: { value: '15mm', rule: 'atLeast' },
    tableHeader: true,
  });
}

function createRow(
  n1: number,
  n2: number,
  n3: number,
  n4: number,
  index: number
) {
  return new TableRow({
    children: [
      new TableCell({
        verticalAlign: 'center',
        width: {
          size: 100 / 5,
          type: WidthType.PERCENTAGE,
        },
        children: [
          new Paragraph({
            alignment: 'center',
            children: [
              new TextRun({
                text: n4 == -1 ? '-' : String(n4),
                size: '14pt',
                rightToLeft: true,
              }),
            ],
          }),
        ],
      }),
      new TableCell({
        verticalAlign: 'center',
        width: {
          size: 100 / 5,
          type: WidthType.PERCENTAGE,
        },
        children: [
          new Paragraph({
            alignment: 'center',
            children: [
              new TextRun({
                text: n3 == -1 ? '-' : String(n3),
                size: '14pt',
                rightToLeft: true,
              }),
            ],
          }),
        ],
      }),
      new TableCell({
        verticalAlign: 'center',
        width: {
          size: 100 / 5,
          type: WidthType.PERCENTAGE,
        },
        children: [
          new Paragraph({
            alignment: 'center',
            children: [
              new TextRun({
                text: n2 == -1 ? '-' : String(n2),
                size: '14pt',
                rightToLeft: true,
              }),
            ],
          }),
        ],
      }),
      new TableCell({
        verticalAlign: 'center',
        width: {
          size: 100 / 5,
          type: WidthType.PERCENTAGE,
        },
        children: [
          new Paragraph({
            alignment: 'center',
            children: [
              new TextRun({
                text: n1 == -1 ? '-' : String(n1),
                size: '14pt',
                rightToLeft: true,
              }),
            ],
          }),
        ],
      }),
      new TableCell({
        verticalAlign: 'center',
        width: {
          size: 100 / 5,
          type: WidthType.PERCENTAGE,
        },
        children: [
          new Paragraph({
            alignment: 'center',
            children: [
              new TextRun({
                text: String(index + 1),
                size: '14pt',
                rightToLeft: true,
              }),
            ],
          }),
        ],
      }),
    ],
    height: { value: '5mm', rule: 'atLeast' },
  });
}

export function createDetailedAttendeesTable(
  detailedAttendees: {
    n1: number;
    n2: number;
    n3: number;
    n4: number;
  }[],
  totalTeam1: number | null,
  totalTeam2: number | null,
  totalTeam3: number | null,
  totalTeam4: number | null
) {
  const detailedAttendeesRows: TableRow[] = [];

  detailedAttendees.forEach(({ n1, n2, n3, n4 }, index) =>
    detailedAttendeesRows.push(createRow(n1, n2, n3, n4, index))
  );

  const table = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      createHeaderRow('تفاصيل الحضور'),
      new TableRow({
        children: [
          new TableCell({
            verticalAlign: 'center',
            width: {
              size: 100 / 5,
              type: WidthType.PERCENTAGE,
            },
            children: [
              new Paragraph({
                alignment: 'center',
                children: [
                  new TextRun({
                    text: 'نادي قوقل للطلبة المطورين',
                    size: '14pt',
                    rightToLeft: true,
                    bold: true,
                  }),
                ],
              }),
            ],
          }),
          new TableCell({
            verticalAlign: 'center',
            width: {
              size: 100 / 5,
              type: WidthType.PERCENTAGE,
            },
            children: [
              new Paragraph({
                alignment: 'center',
                children: [
                  new TextRun({
                    text: 'نادي البرمجة والذكاء الاصطناعي',
                    size: '14pt',
                    rightToLeft: true,
                    bold: true,
                  }),
                ],
              }),
            ],
          }),
          new TableCell({
            verticalAlign: 'center',
            width: {
              size: 100 / 5,
              type: WidthType.PERCENTAGE,
            },
            children: [
              new Paragraph({
                alignment: 'center',
                children: [
                  new TextRun({
                    text: 'نادي IEEE',
                    size: '14pt',
                    rightToLeft: true,
                    bold: true,
                  }),
                ],
              }),
            ],
          }),
          new TableCell({
            verticalAlign: 'center',
            width: {
              size: 100 / 5,
              type: WidthType.PERCENTAGE,
            },
            children: [
              new Paragraph({
                alignment: 'center',
                children: [
                  new TextRun({
                    text: 'نادي الأمن السيبراني',
                    size: '14pt',
                    rightToLeft: true,
                    bold: true,
                  }),
                ],
              }),
            ],
          }),
          new TableCell({
            verticalAlign: 'center',
            width: {
              size: 100 / 5,
              type: WidthType.PERCENTAGE,
            },
            children: [
              new Paragraph({
                alignment: 'center',
                children: [
                  new TextRun({
                    text: 'النشاط',
                    size: '14pt',
                    rightToLeft: true,
                    bold: true,
                  }),
                ],
              }),
            ],
          }),
        ],
        height: { value: '10mm', rule: 'atLeast' },
      }),
      ...detailedAttendeesRows,
      new TableRow({
        children: [
          new TableCell({
            verticalAlign: 'center',
            width: {
              size: 100 / 5,
              type: WidthType.PERCENTAGE,
            },
            children: [
              new Paragraph({
                alignment: 'center',
                children: [
                  new TextRun({
                    text: totalTeam4 ? String(totalTeam4) : 'لا يوجد',
                    size: '14pt',
                    rightToLeft: true,
                    bold: true,
                  }),
                ],
              }),
            ],
          }),
          new TableCell({
            verticalAlign: 'center',
            width: {
              size: 100 / 5,
              type: WidthType.PERCENTAGE,
            },
            children: [
              new Paragraph({
                alignment: 'center',
                children: [
                  new TextRun({
                    text: totalTeam3 ? String(totalTeam3) : 'لا يوجد',
                    size: '14pt',
                    rightToLeft: true,
                    bold: true,
                  }),
                ],
              }),
            ],
          }),
          new TableCell({
            verticalAlign: 'center',
            width: {
              size: 100 / 5,
              type: WidthType.PERCENTAGE,
            },
            children: [
              new Paragraph({
                alignment: 'center',
                children: [
                  new TextRun({
                    text: totalTeam2 ? String(totalTeam2) : 'لا يوجد',
                    size: '14pt',
                    rightToLeft: true,
                    bold: true,
                  }),
                ],
              }),
            ],
          }),
          new TableCell({
            verticalAlign: 'center',
            width: {
              size: 100 / 5,
              type: WidthType.PERCENTAGE,
            },
            children: [
              new Paragraph({
                alignment: 'center',
                children: [
                  new TextRun({
                    text: totalTeam1 ? String(totalTeam1) : 'لا يوجد',
                    size: '14pt',
                    rightToLeft: true,
                    bold: true,
                  }),
                ],
              }),
            ],
          }),
          new TableCell({
            verticalAlign: 'center',
            width: {
              size: 100 / 5,
              type: WidthType.PERCENTAGE,
            },
            children: [
              new Paragraph({
                alignment: 'center',
                children: [
                  new TextRun({
                    text: 'الإجمالي',
                    size: '14pt',
                    rightToLeft: true,
                    bold: true,
                  }),
                ],
              }),
            ],
          }),
        ],
        height: { value: '5mm', rule: 'atLeast' },
      }),
    ],
  });

  return table;
}
