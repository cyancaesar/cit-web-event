import Docxtemplater from 'docxtemplater';
import PizZip from 'pizzip';
import PizZipUtils from 'pizzip/utils';
import expressionParser from 'docxtemplater/expressions';
import { saveAs } from 'file-saver';
import { format } from 'date-fns';
import EventSchema from '@/lib/schema/EventSchema';
import { z } from 'zod';
import {
  ADVERTISEMENT_PROCESS,
  TADVERTISEMENT_PROCESS,
} from '@/constants/advertisementProcess';
import { EVENT_TYPE } from '@/constants/eventType';
import { WORKTEAM } from '@/constants/workTeam';
import { DEPARTMENT, DEPARTMENT_KEY } from '@/constants/department';

function loadFile(url: string, callback: (err: Error, data: string) => void) {
  PizZipUtils.getBinaryContent(url, callback);
}

function prepare(text: string) {
  return text.replace(/([0-9a-zA-Z\-: ]+)/gm, '\u202A$1\u202C');
}

export async function generateDocument(obj: z.infer<typeof EventSchema>) {
  const items_1 = {
    a1: obj.items_1.includes('1_1') ? '✓' : ' ',
    a2: obj.items_1.includes('1_2') ? '✓' : ' ',
    a3: obj.items_1.includes('1_3') ? '✓' : ' ',
    a4: obj.items_1.includes('1_4') ? '✓' : ' ',
    a5: obj.items_1.includes('1_5') ? '✓' : ' ',
  };
  const items_2 = {
    b1: obj.items_2.includes('2_1') ? '✓' : ' ',
    b2: obj.items_2.includes('2_2') ? '✓' : ' ',
    b3: obj.items_2.includes('2_3') ? '✓' : ' ',
    b4: obj.items_2.includes('2_4') ? '✓' : ' ',
    b5: obj.items_2.includes('2_5') ? '✓' : ' ',
    b6: obj.items_2.includes('2_6') ? '✓' : ' ',
    b7: obj.items_2.includes('2_7') ? '✓' : ' ',
    b8: obj.items_2.includes('2_8') ? '✓' : ' ',
    b9: obj.items_2.includes('2_9') ? '✓' : ' ',
  };
  const items_3 = {
    c1: obj.items_3.includes('3_1') ? '✓' : ' ',
    c2: obj.items_3.includes('3_2') ? '✓' : ' ',
    c3: obj.items_3.includes('3_3') ? '✓' : ' ',
    c4: obj.items_3.includes('3_4') ? '✓' : ' ',
    c5: obj.items_3.includes('3_5') ? '✓' : ' ',
    c6: obj.items_3.includes('3_6') ? '✓' : ' ',
    c7: obj.items_3.includes('3_7') ? '✓' : ' ',
    c8: obj.items_3.includes('3_8') ? '✓' : ' ',
    c9: obj.items_3.includes('3_9') ? '✓' : ' ',
    c10: obj.items_3.includes('3_10') ? '✓' : ' ',
    c11: obj.items_3.includes('3_11') ? '✓' : ' ',
  };

  loadFile('assets/template.docx', function (error, content) {
    if (error) {
      console.log(error);
      throw error;
    }
    const zip = new PizZip(content);
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
      parser: expressionParser,
    });

    doc.setData({
      title: obj.title,
      organizer:
        obj.organizer == 'TAIF_UNIVERSITY' ? 'جامعة الطائف' : obj.organizer,
      departments: obj.departments
        .map((dep) => DEPARTMENT[dep as DEPARTMENT_KEY])
        .join(' - '),
      date:
        obj.date.from == obj.date.to
          ? format(obj.date.from, 'yyyy/MM/dd')
          : `${format(obj.date.from, 'yyyy/MM/dd')} - ${format(
              obj.date.to,
              'yyyy/MM/dd'
            )}`,
      place: obj.place,
      time: obj.time,
      male: obj.maleAttendees,
      female: obj.femaleAttendees,
      other: obj.otherAttendees,
      total: obj.maleAttendees + obj.femaleAttendees + obj.otherAttendees,
      targetAudience:
        obj.targetAudience == 'TAIF_UNIVERSITY_EMPLOYEES'
          ? 'جميع منسوبي جامعة الطائف'
          : obj.targetAudience,
      registrationProcess:
        obj.registrationProcess === 'ONLINE' ? 'أونلاين' : 'حضوري',
      advertisementProcess: obj.advertisementProcess
        .map((o) => ADVERTISEMENT_PROCESS[o as keyof TADVERTISEMENT_PROCESS])
        .join(' - '),
      instructorsAndGuests: obj.instructorsAndGuests,
      type: EVENT_TYPE[obj.type],
      cCampus: obj.category == 'ON-CAMPUS' ? '✓' : '',
      cOnline: obj.category == 'ONLINE' ? '✓' : '',
      ...items_1,
      ...items_2,
      ...items_3,
      eventGoals: prepare(obj.eventGoals),
      eventPlanning: prepare(obj.eventPlanning),
      eventTiming: prepare(obj.eventTiming),
      eventFeedbacks: prepare(obj.eventFeedbacks),
      enhancePriority: prepare(obj.enhancePriority),
      workTeam: WORKTEAM[obj.workTeam],
    });

    doc.render();
    const out = doc.getZip().generate({
      type: 'blob',
      mimeType:
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    });
    saveAs(out, `${format(new Date(), 'yyyy-MM-dd-t')}.docx`);
  });
}
