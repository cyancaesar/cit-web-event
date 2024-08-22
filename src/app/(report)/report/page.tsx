'use client';
import React from 'react';
import { Button } from '@/components/ui/button';

import {
  Document,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TextRun,
  WidthType,
} from 'docx';
import { saveAs } from 'file-saver';

export default function Report() {
  const createTableRow = (text: string[]) => {
    return new TableRow({
      children: text.map((t) => {
        return new TableCell({
          width: {
            size: 100 / text.length,
            type: WidthType.PERCENTAGE,
          },
          children: [
            new Paragraph({
              alignment: 'center',
              children: [
                new TextRun({
                  text: t,
                  size: '14pt',
                  rightToLeft: true,
                }),
              ],
            }),
          ],
        });
      }),
    });
  };

  const generate = () => {
    const table = new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        new TableRow({
          children: [
            new TableCell({
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
                      text: 'احصائيات الاندية',
                      size: '18pt',
                      bold: true,
                      rightToLeft: true,
                    }),
                  ],
                }),
                new Paragraph({
                  alignment: 'center',
                  children: [
                    new TextRun({
                      text: 'احصائيات الاندية',
                      size: '18pt',
                      bold: true,
                      rightToLeft: true,
                    }),
                  ],
                }),
              ],
            }),
          ],
          // height: { value: '15mm', rule: 'exact' },
          tableHeader: true,
        }),
        new TableRow({
          children: [
            new TableCell({
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
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
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
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
        createTableRow(['الأندية', 'نادي\nنادي\nنادي']),
      ],
    });

    const doc = new Document({
      sections: [{ children: [table] }],
    });

    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, 'output.docx');
    });
  };

  return (
    <div className='mx-auto'>
      <Button onClick={() => generate()}>generate</Button>
    </div>
  );
}
