import React from 'react';
import GenerateReport from './GenerateReport';
import prisma from '@/lib/db';

export default async function Report() {
  // console.log(detailedAttendees);

  return (
    <div className='min-h-screen grid place-content-center'>
      {/* <GenerateReport
        detailedAttendees={detailedAttendees}
        totalTeam1={totalTeam1._sum.totalAttendees}
        totalTeam2={totalTeam2._sum.totalAttendees}
        totalTeam3={totalTeam3._sum.totalAttendees}
        totalTeam4={totalTeam4._sum.totalAttendees}
      /> */}
    </div>
  );
}
