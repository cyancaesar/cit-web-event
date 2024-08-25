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
        // borders: {
        //   start: { size: 8, style: 'double' },
        //   end: { size: 8, style: 'double' },
        //   top: { size: 8, style: 'double' },
        //   bottom: { size: 8, style: 'double' },
        // },
        verticalAlign: 'center',
        width: {
          size: 100,
          type: WidthType.PERCENTAGE,
        },
        columnSpan: 2,
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

function createClubsRow() {
  return new TableRow({
    children: [
      new TableCell({
        verticalAlign: 'center',
        width: {
          size: 100 / 2,
          type: WidthType.PERCENTAGE,
        },
        children: [
          new Paragraph({
            alignment: 'start',
            bidirectional: true,
            indent: { start: '8pt' },
            children: [
              new TextRun({
                text: '• ' + 'نادي قوقل للطلبة المطورين',
                size: '14pt',
                rightToLeft: true,
              }),
            ],
          }),
          new Paragraph({
            alignment: 'start',
            bidirectional: true,
            indent: { start: '8pt' },
            children: [
              new TextRun({
                text: '• ' + 'نادي البرمجة والذكاء الاصطناعي',
                size: '14pt',
                rightToLeft: true,
              }),
            ],
          }),
          new Paragraph({
            alignment: 'start',
            bidirectional: true,
            indent: { start: '8pt' },
            children: [
              new TextRun({
                text: '• ' + 'نادي IEEE',
                size: '14pt',
                rightToLeft: true,
              }),
            ],
          }),
          new Paragraph({
            alignment: 'start',
            bidirectional: true,
            indent: { start: '8pt' },
            children: [
              new TextRun({
                text: '• ' + 'نادي الأمن السيبراني',
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
          size: 100 / 2,
          type: WidthType.PERCENTAGE,
        },
        children: [
          new Paragraph({
            alignment: 'center',
            children: [
              new TextRun({
                text: 'أسماء الأندية',
                size: '14pt',
                rightToLeft: true,
              }),
            ],
          }),
        ],
      }),
    ],
    height: { value: '25mm', rule: 'atLeast' },
  });
}

function createActivityRow(club: string, num: number) {
  return new TableRow({
    children: [
      new TableCell({
        verticalAlign: 'center',
        width: {
          size: 100 / 2,
          type: WidthType.PERCENTAGE,
        },
        children: [
          new Paragraph({
            alignment: 'center',
            bidirectional: true,
            indent: { start: '8pt' },
            children: [
              new TextRun({
                text: String(num),
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
          size: 100 / 2,
          type: WidthType.PERCENTAGE,
        },
        children: [
          new Paragraph({
            alignment: 'center',
            children: [
              new TextRun({
                text: club,
                size: '14pt',
                rightToLeft: true,
              }),
            ],
          }),
        ],
      }),
    ],
    height: { value: '10mm', rule: 'atLeast' },
  });
}
type ReportSummaryTableProps = {
  totalTeam1: number;
  totalTeam2: number;
  totalTeam3: number;
  totalTeam4: number;
  e1: number;
  e2: number;
  e3: number;
  e4: number;
};
export function createReportSummaryTable({
  totalTeam1,
  totalTeam2,
  totalTeam3,
  totalTeam4,
  e1,
  e2,
  e3,
  e4,
}: ReportSummaryTableProps) {
  const table = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      createHeaderRow('إحصائيات الأندية'),
      new TableRow({
        children: [
          new TableCell({
            verticalAlign: 'center',
            width: {
              size: 100 / 2,
              type: WidthType.PERCENTAGE,
            },
            children: [
              new Paragraph({
                alignment: 'center',
                children: [
                  new TextRun({
                    text: '4 اندية طلابية',
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
              size: 100 / 2,
              type: WidthType.PERCENTAGE,
            },
            children: [
              new Paragraph({
                alignment: 'center',
                children: [
                  new TextRun({
                    text: 'عدد الأندية الطلابية بالكلية',
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
      createClubsRow(),
      createHeaderRow('إحصائيات الأنشطة'),
      new TableRow({
        children: [
          new TableCell({
            verticalAlign: 'center',
            width: {
              size: 100 / 2,
              type: WidthType.PERCENTAGE,
            },
            children: [
              new Paragraph({
                alignment: 'center',
                children: [
                  new TextRun({
                    text: 'عدد الأنشطة',
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
              size: 100 / 2,
              type: WidthType.PERCENTAGE,
            },
            children: [
              new Paragraph({
                alignment: 'center',
                children: [
                  new TextRun({
                    text: 'اسم النادي',
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
      createActivityRow('نادي قوقل للطلبة المطورين', e4),
      createActivityRow('نادي البرمجة والذكاء الاصطناعي', e3),
      createActivityRow('نادي IEEE', e2),
      createActivityRow('نادي الأمن السيبراني', e1),
      createActivityRow('الإجمالي', e1 + e2 + e3 + e4),
      createHeaderRow('إحصائيات الحضور'),
      new TableRow({
        children: [
          new TableCell({
            verticalAlign: 'center',
            width: {
              size: 100 / 2,
              type: WidthType.PERCENTAGE,
            },
            children: [
              new Paragraph({
                alignment: 'center',
                children: [
                  new TextRun({
                    text: 'عدد المستفيدون طلاب وطالبات',
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
              size: 100 / 2,
              type: WidthType.PERCENTAGE,
            },
            children: [
              new Paragraph({
                alignment: 'center',
                children: [
                  new TextRun({
                    text: 'اسم النادي',
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
      createActivityRow('نادي قوقل للطلبة المطورين', totalTeam4),
      createActivityRow('نادي البرمجة والذكاء الاصطناعي', totalTeam3),
      createActivityRow('نادي IEEE', totalTeam2),
      createActivityRow('نادي الأمن السيبراني', totalTeam1),
      createActivityRow(
        'الإجمالي',
        totalTeam1 + totalTeam2 + totalTeam3 + totalTeam4
      ),
    ],
  });

  return table;
}
