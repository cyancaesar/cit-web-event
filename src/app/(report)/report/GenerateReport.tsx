'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Document, Packer, PageBreak, Paragraph } from 'docx';
import { saveAs } from 'file-saver';
import { createReportSummaryTable } from '@/utils/ReportSummaryTable';
import { createDetailedAttendeesTable } from '@/utils/DetailedAttendeesTable';

type Props = {
  detailedAttendees: {
    n1: number;
    n2: number;
    n3: number;
    n4: number;
  }[];
  totalTeam1: number | null;
  totalTeam2: number | null;
  totalTeam3: number | null;
  totalTeam4: number | null;
};

export default function GenerateReport({
  detailedAttendees,
  totalTeam1,
  totalTeam2,
  totalTeam3,
  totalTeam4,
}: Props) {
  // const generate = () => {
  //   const doc = new Document({
  //     sections: [
  //       {
  //         children: [
  //           createReportSummaryTable(),
  //           new Paragraph({ children: [new PageBreak()] }),
  //           createDetailedAttendeesTable(
  //             detailedAttendees,
  //             totalTeam1,
  //             totalTeam2,
  //             totalTeam3,
  //             totalTeam4
  //           ),
  //         ],
  //       },
  //     ],
  //   });

  //   Packer.toBlob(doc).then((blob) => {
  //     saveAs(blob, 'output.docx');
  //   });
  // };

  return <Button>تصدير</Button>;
}
