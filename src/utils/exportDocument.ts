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
import { EVENT_TYPE, KEVENT_TYPE } from '@/constants/eventType';
import { KWORKTEAM, WORKTEAM } from '@/constants/workTeam';
import { DEPARTMENT, DEPARTMENT_KEY } from '@/constants/department';
import { Event } from '@prisma/client';

function loadFile(url: string, callback: (err: Error, data: string) => void) {
  PizZipUtils.getBinaryContent(url, callback);
}

function prepare(text: string) {
  return text.replace(/([0-9a-zA-Z\-: ]+)/gm, '\u202A$1\u202C');
}

export async function exportDocument(event: Event) {
  const acadAffairsPlan = JSON.parse(event.acadAffairsPlan) as string[];
  const univStratPlan = JSON.parse(event.univStratPlan) as string[];
  const tuga = JSON.parse(event.tuga) as string[];

  const items_1 = {
    a1: acadAffairsPlan.includes('1_1') ? '✓' : ' ',
    a2: acadAffairsPlan.includes('1_2') ? '✓' : ' ',
    a3: acadAffairsPlan.includes('1_3') ? '✓' : ' ',
    a4: acadAffairsPlan.includes('1_4') ? '✓' : ' ',
    a5: acadAffairsPlan.includes('1_5') ? '✓' : ' ',
  };
  const items_2 = {
    b1: univStratPlan.includes('2_1') ? '✓' : ' ',
    b2: univStratPlan.includes('2_2') ? '✓' : ' ',
    b3: univStratPlan.includes('2_3') ? '✓' : ' ',
    b4: univStratPlan.includes('2_4') ? '✓' : ' ',
    b5: univStratPlan.includes('2_5') ? '✓' : ' ',
    b6: univStratPlan.includes('2_6') ? '✓' : ' ',
    b7: univStratPlan.includes('2_7') ? '✓' : ' ',
    b8: univStratPlan.includes('2_8') ? '✓' : ' ',
    b9: univStratPlan.includes('2_9') ? '✓' : ' ',
  };
  const items_3 = {
    c1: tuga.includes('3_1') ? '✓' : ' ',
    c2: tuga.includes('3_2') ? '✓' : ' ',
    c3: tuga.includes('3_3') ? '✓' : ' ',
    c4: tuga.includes('3_4') ? '✓' : ' ',
    c5: tuga.includes('3_5') ? '✓' : ' ',
    c6: tuga.includes('3_6') ? '✓' : ' ',
    c7: tuga.includes('3_7') ? '✓' : ' ',
    c8: tuga.includes('3_8') ? '✓' : ' ',
    c9: tuga.includes('3_9') ? '✓' : ' ',
    c10: tuga.includes('3_10') ? '✓' : ' ',
    c11: tuga.includes('3_11') ? '✓' : ' ',
  };

  const departments = (JSON.parse(event.department) as string[])
    .map((dep) => DEPARTMENT[dep as DEPARTMENT_KEY])
    .join(' - ');

  const date =
    event.date_from == event.date_to
      ? format(event.date_from, 'yyyy/MM/dd')
      : `${format(event.date_from, 'yyyy/MM/dd')} - ${format(
          event.date_to,
          'yyyy/MM/dd'
        )}`;

  const advertisementProcess =
    event.advertisementProcess.length == 0
      ? ''
      : (JSON.parse(event.advertisementProcess) as string[]).map(
          (process) =>
            ADVERTISEMENT_PROCESS[process as keyof TADVERTISEMENT_PROCESS]
        );

  const data = {
    title: event.title,
    organizer:
      event.organizer == 'TAIF_UNIVERSITY' ? 'جامعة الطائف' : event.organizer,
    departments,
    date,
    place: event.place,
    time: event.time,
    male: event.maleAttendees,
    female: event.femaleAttendees,
    other: event.otherAttendees,
    total: event.maleAttendees + event.femaleAttendees + event.otherAttendees,
    targetAudience:
      event.targetAudience == 'TAIF_UNIVERSITY_EMPLOYEES'
        ? 'جميع منسوبي جامعة الطائف'
        : event.targetAudience,
    registrationProcess:
      event.registrationProcess === 'ONLINE' ? 'أونلاين' : 'حضوري',
    advertisementProcess,
    instructorsAndGuests: event.instructorsAndGuests,
    type: EVENT_TYPE[event.type as KEVENT_TYPE],
    cCampus: event.category == 'ON-CAMPUS' ? '✓' : '',
    cOnline: event.category == 'ONLINE' ? '✓' : '',
    ...items_1,
    ...items_2,
    ...items_3,
    eventGoals: prepare(event.eventGoals),
    eventPlanning: prepare(event.eventPlanning),
    eventTiming: prepare(event.eventTiming),
    eventFeedbacks: prepare(event.eventFeedbacks),
    enhancePriority: prepare(event.enhancePriority),
    workTeam: WORKTEAM[event.workTeam as KWORKTEAM],
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
    doc.setData(data);
    doc.render();
    const out = doc.getZip().generate({
      type: 'blob',
      mimeType:
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    });
    saveAs(out, `${format(new Date(), 'yyyy-MM-dd-t')}.docx`);
  });
}
