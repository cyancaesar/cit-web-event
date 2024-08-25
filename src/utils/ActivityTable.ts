import { Event } from '@prisma/client';
import {
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TextRun,
  WidthType,
} from 'docx';

type Activity = {
  name: string;
  place: string;
  attendee: { male: number; female: number; total: number };
  index: number;
};
function createActivity({ name, place, attendee, index }: Activity) {
  const nameRow = new TableRow({
    children: [
      new TableCell({
        verticalAlign: 'center',
        // margins: { top: 100, bottom: 100, marginUnitType: 'dxa' },

        // width: {
        //   size: 100 / 5,
        //   type: WidthType.PERCENTAGE,
        // },
        children: [
          new Paragraph({
            alignment: 'center',
            children: [
              new TextRun({
                text: name,
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
        // width: {
        //   size: 100 / 5,
        //   type: WidthType.PERCENTAGE,
        // },
        children: [
          new Paragraph({
            alignment: 'center',
            children: [
              new TextRun({
                text: 'اسم الفعالية',
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
        textDirection: 'btLr',
        shading: { fill: index % 2 == 0 ? 'd3d3d3' : 'ffffff' },
        rowSpan: 3,
        margins: { top: 200, bottom: 200, marginUnitType: 'dxa' },
        width: {
          size: 10,
          type: WidthType.PERCENTAGE,
        },
        children: [
          new Paragraph({
            alignment: 'center',
            children: [
              new TextRun({
                text: `الفعالية ${index + 1}`,
                size: '14pt',
                rightToLeft: true,
                bold: true,
              }),
            ],
          }),
        ],
      }),
    ],
  });
  const placeRow = new TableRow({
    children: [
      new TableCell({
        verticalAlign: 'center',
        // margins: { top: 100, bottom: 100, marginUnitType: 'dxa' },

        // width: {
        //   size: 100 / 5,
        //   type: WidthType.PERCENTAGE,
        // },
        children: [
          new Paragraph({
            alignment: 'center',
            children: [
              new TextRun({
                text: place,
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
        // width: {
        //   size: 100 / 5,
        //   type: WidthType.PERCENTAGE,
        // },
        children: [
          new Paragraph({
            alignment: 'center',
            children: [
              new TextRun({
                text: 'مكان التنفيذ',
                size: '14pt',
                rightToLeft: true,
                bold: true,
              }),
            ],
          }),
        ],
      }),
    ],
  });
  const attendeeRow = new TableRow({
    children: [
      new TableCell({
        verticalAlign: 'center',
        // margins: { top: 100, bottom: 100, marginUnitType: 'dxa' },
        // width: {
        //   size: 100 / 5,
        //   type: WidthType.PERCENTAGE,
        // },
        children: [
          new Paragraph({
            alignment: 'center',
            children: [
              new TextRun({
                text: `طلاب: ${attendee.male}`,
                size: '14pt',
                rightToLeft: true,
                bold: true,
              }),
              new TextRun({
                text: `طالبات: ${attendee.female}`,
                size: '14pt',
                rightToLeft: true,
                bold: true,
                break: 1,
              }),
              new TextRun({
                text: `إجمالي: ${attendee.total}`,
                size: '14pt',
                rightToLeft: true,
                bold: true,
                break: 1,
              }),
            ],
          }),
        ],
      }),
      new TableCell({
        verticalAlign: 'center',
        // width: {
        //   size: 100 / 5,
        //   type: WidthType.PERCENTAGE,
        // },
        children: [
          new Paragraph({
            alignment: 'center',
            children: [
              new TextRun({
                text: 'عدد الحضور',
                size: '14pt',
                rightToLeft: true,
                bold: true,
              }),
            ],
          }),
        ],
      }),
    ],
  });

  return [nameRow, placeRow, attendeeRow];
}

export function createActivitiesTable(event: Event[], club: string) {
  // const myRows = [];
  const myRow = event.flatMap((event, index) =>
    createActivity({
      name: event.title,
      place: event.place,
      attendee: {
        male: event.maleAttendees,
        female: event.femaleAttendees,
        total: event.totalAttendees,
      },
      index,
    })
  );

  if (myRow.length == 0) {
    return new Table({
      width: {
        size: 100,
        type: WidthType.PERCENTAGE,
      },
      rows: [
        new TableRow({
          children: [
            new TableCell({
              borders: {
                top: { style: 'threeDEmboss', size: 10 },
                bottom: { style: 'threeDEmboss', size: 10 },
                left: { style: 'threeDEmboss', size: 10 },
                right: { style: 'threeDEmboss', size: 10 },
              },
              columnSpan: 1,
              // margins: { top: 100, bottom: 100, marginUnitType: 'dxa' },
              children: [
                new Paragraph({
                  alignment: 'center',
                  children: [
                    new TextRun({
                      text: `تقرير أنشطة ${club} وعددها ${event.length}`,
                      bold: true,
                      size: '14pt',
                      rightToLeft: true,
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({
              borders: {
                bottom: { style: 'nil' },
                top: { style: 'nil' },
                left: { style: 'nil' },
                right: { style: 'nil' },
              },
              children: [
                new Paragraph({
                  alignment: 'center',
                  children: [
                    new TextRun({
                      text: `لا يوجد`,
                      rightToLeft: true,
                      size: '14pt',
                      bold: true,
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    });
  }

  const table = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({
        tableHeader: true,
        children: [
          new TableCell({
            shading: { fill: 'd3d3d3' },
            borders: {
              top: { style: 'threeDEmboss', size: 10 },
              bottom: { style: 'threeDEmboss', size: 10 },
              left: { style: 'threeDEmboss', size: 10 },
              right: { style: 'threeDEmboss', size: 10 },
            },
            columnSpan: 3,
            // margins: { top: 100, bottom: 100, marginUnitType: 'dxa' },

            children: [
              new Paragraph({
                alignment: 'center',
                children: [
                  new TextRun({
                    text: `تقرير أنشطة ${club} وعددها ${event.length}`,
                    bold: true,
                    size: '14pt',
                    rightToLeft: true,
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      ...myRow,
    ],
  });

  return table;
}
