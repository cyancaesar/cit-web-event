import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { createDetailedAttendeesTable } from '@/utils/DetailedAttendeesTable';
import { createReportSummaryTable } from '@/utils/ReportSummaryTable';
import {
  Document,
  Footer,
  Packer,
  PageBreak,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TextRun,
  WidthType,
} from 'docx';
import { format } from 'date-fns';
import { createActivitiesTable } from '@/utils/ActivityTable';

async function generateAllReport() {
  const workteam_1 = await prisma.event.findMany({
    where: { workTeam: 'CLUB-CYBERSECURITY' },
  });
  const workteam_2 = await prisma.event.findMany({
    where: { workTeam: 'CLUB-IEEE' },
  });
  const workteam_3 = await prisma.event.findMany({
    where: { workTeam: 'CLUB-AI-PROGRAMMING' },
  });
  const workteam_4 = await prisma.event.findMany({
    where: { workTeam: 'CLUB-GOOGLE' },
  });
  const totalTeam1 = await prisma.event.aggregate({
    _sum: { totalAttendees: true },
    where: { workTeam: 'CLUB-CYBERSECURITY' },
  });
  const totalTeam2 = await prisma.event.aggregate({
    _sum: { totalAttendees: true },
    where: { workTeam: 'CLUB-IEEE' },
  });
  const totalTeam3 = await prisma.event.aggregate({
    _sum: { totalAttendees: true },
    where: { workTeam: 'CLUB-AI-PROGRAMMING' },
  });
  const totalTeam4 = await prisma.event.aggregate({
    _sum: { totalAttendees: true },
    where: { workTeam: 'CLUB-GOOGLE' },
  });

  const maxEvents = Math.max(
    workteam_1.length,
    workteam_2.length,
    workteam_3.length,
    workteam_4.length
  );

  const detailedAttendees: {
    n1: number;
    n2: number;
    n3: number;
    n4: number;
  }[] = [];

  // e1-n1: CLUB-CYBERSECURITY
  // e2-n2: CLUB-IEEE
  // e3-n4: CLUB-AI-PROGRAMMING
  // e4-n4: CLUB-GOOGLE
  for (let i = 0; i < maxEvents; i++) {
    const e1 = workteam_1.at(i);
    const e2 = workteam_2.at(i);
    const e3 = workteam_3.at(i);
    const e4 = workteam_4.at(i);

    const n1 = e1 ? e1.totalAttendees : -1;
    const n2 = e2 ? e2.totalAttendees : -1;
    const n3 = e3 ? e3.totalAttendees : -1;
    const n4 = e4 ? e4.totalAttendees : -1;

    detailedAttendees.push({
      n1,
      n2,
      n3,
      n4,
    });
  }

  const doc = new Document({
    sections: [
      {
        children: [
          createReportSummaryTable({
            totalTeam1: totalTeam1._sum.totalAttendees || 0,
            totalTeam2: totalTeam2._sum.totalAttendees || 0,
            totalTeam3: totalTeam3._sum.totalAttendees || 0,
            totalTeam4: totalTeam4._sum.totalAttendees || 0,
            e1: workteam_1.length,
            e2: workteam_2.length,
            e3: workteam_3.length,
            e4: workteam_4.length,
          }),
          new Paragraph({ children: [new PageBreak()] }),
          createDetailedAttendeesTable(
            detailedAttendees,
            totalTeam1._sum.totalAttendees,
            totalTeam2._sum.totalAttendees,
            totalTeam3._sum.totalAttendees,
            totalTeam4._sum.totalAttendees
          ),
          new Paragraph({ children: [new PageBreak()] }),
          // new Paragraph({
          //   alignment: 'center',
          //   spacing: {
          //     before: 100,
          //     after: 100,
          //   },
          //   children: [
          //     new TextRun({
          //       text: 'تفاصيل أنشطة كل نادي من الأندية الأربعة',
          //       rightToLeft: true,
          //       size: '14pt',
          //       bold: true,
          //     }),
          //   ],
          // }),

          createActivitiesTable(workteam_4, 'نادي قوقل للطلبة المطورين'),
          new Paragraph({ children: [new TextRun({ break: 1 })] }),
          createActivitiesTable(workteam_3, 'نادي البرمجة والذكاء الاصطناعي'),
          new Paragraph({ children: [new TextRun({ break: 1 })] }),
          createActivitiesTable(workteam_2, 'نادي IEEE'),
          new Paragraph({ children: [new TextRun({ break: 1 })] }),
          createActivitiesTable(workteam_1, 'نادي الأمن السيبراني'),
          new Paragraph({ children: [new TextRun({ break: 1 })] }),
        ],
        footers: {
          default: new Footer({
            children: [
              new Table({
                borders: {
                  bottom: { style: 'nil' },
                  top: { style: 'nil' },
                  left: { style: 'nil' },
                  right: { style: 'nil' },
                  insideHorizontal: { style: 'nil' },
                  insideVertical: { style: 'nil' },
                },
                width: { size: 100, type: WidthType.PERCENTAGE },
                rows: [
                  new TableRow({
                    children: [
                      new TableCell({
                        verticalAlign: 'center',
                        width: { size: 100 / 2, type: WidthType.PERCENTAGE },
                        children: [
                          new Paragraph({
                            alignment: 'start',
                            children: [
                              new TextRun({
                                text: `${format(
                                  new Date(),
                                  'yyyy/MM/dd HH:mm'
                                )}`,
                              }),
                            ],
                          }),
                        ],
                      }),
                      new TableCell({
                        verticalAlign: 'center',
                        width: { size: 100 / 2, type: WidthType.PERCENTAGE },
                        children: [
                          new Paragraph({
                            alignment: 'end',
                            children: [
                              new TextRun({
                                text: `تم إنشاء هذا التقرير من dev.noor.cx`,
                                rightToLeft: true,
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              // new Paragraph({
              //   alignment: 'right',
              //   children: [
              //     new TextRun({
              //       text: `تم إنشاء التقرير من dev.noor.cx`,
              //       rightToLeft: true,
              //     }),
              //   ],
              // }),
              // new Paragraph({
              //   alignment: 'left',
              //   children: [
              //     new TextRun({
              //       text: `${format(new Date(), 'yyyy/MM/dd HH:mm')}`,
              //     }),
              //   ],
              // }),
            ],
          }),
        },
      },
    ],
  });

  return doc;
}

export async function GET(req: NextRequest) {
  const document = await generateAllReport();
  const buffer = await Packer.toBuffer(document);

  const headers = new Headers();
  headers.set(
    'Content-Type',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  );
  headers.set(
    'Content-Disposition',
    `attachment; filename="${new Date().getTime()}.docx"`
  );

  return new NextResponse(buffer, { headers });
}
