'use client';

import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { Event as EventPrisma } from '@prisma/client';
import { format } from 'date-fns';
import { EVENT_TYPE, KEVENT_TYPE } from '@/constants/eventType';
import { KWORKTEAM, WORKTEAM } from '@/constants/workTeam';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Ellipsis } from 'lucide-react';
import { exportDocument } from '@/utils/exportDocument';
// import { generateDocument } from '@/utils/generateDocument';
// import { exportDocument } from '@/utils/exportDocument';

export type Event = EventPrisma;

const columnHelper = createColumnHelper<Event>();

export const columns: ColumnDef<Event>[] = [
  {
    id: 'select',
    cell: ({ row }) => (
      <div className='flex items-center justify-center text-center'>
        <Checkbox
          className='mx-auto'
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label='Select row'
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'title',
    header: 'الفعالية',
  },
  {
    accessorKey: 'organizer',
    header: 'الجهة المنفذة',
    cell: (cell) => {
      switch (cell.row.original.organizer) {
        case 'TAIF_UNIVERSITY':
          return <span>جامعة الطائف</span>;
        default:
          return <span>{cell.row.original.organizer}</span>;
      }
    },
  },
  columnHelper.group({
    id: 'dateRange',
    header: () => <span>التاريخ</span>,
    columns: [
      columnHelper.accessor('date_from', {
        cell: (cell) => (
          <span>{format(cell.row.original.date_from, 'yyyy/MM/dd')}</span>
        ),
        header: () => <span>من</span>,
        footer: (props) => props.column.id,
      }),
      columnHelper.accessor('date_to', {
        cell: (cell) => (
          <span>{format(cell.row.original.date_to, 'yyyy/MM/dd')}</span>
        ),
        header: () => <span>إلى</span>,
        footer: (props) => props.column.id,
      }),
    ],
  }),
  {
    accessorKey: 'place',
    header: 'المكان',
  },
  {
    accessorKey: 'registrationProcess',
    header: 'آلية التسجيل',
    cell: (cell) => {
      switch (cell.row.original.registrationProcess) {
        case 'ON-CAMPUS':
          return <span>حضوري</span>;
        case 'ONLINE':
          return <span>أونلاين</span>;
        default:
          return <span>{cell.row.original.registrationProcess}</span>;
      }
    },
  },
  columnHelper.group({
    id: 'attendess',
    header: () => <span>الحضور</span>,
    columns: [
      columnHelper.accessor('maleAttendees', {
        cell: (cell) => <span>{cell.row.original.maleAttendees}</span>,
        header: () => <span>طلاب</span>,
        footer: (props) => props.column.id,
      }),
      columnHelper.accessor('femaleAttendees', {
        cell: (cell) => <span>{cell.row.original.femaleAttendees}</span>,
        header: () => <span>طالبات</span>,
        footer: (props) => props.column.id,
      }),
      columnHelper.accessor('otherAttendees', {
        cell: (cell) => <span>{cell.row.original.otherAttendees}</span>,
        header: () => <span>اخرى من منسوبي الجامعة</span>,
        footer: (props) => props.column.id,
      }),
      columnHelper.accessor('totalAttendees', {
        cell: (cell) => <span>{cell.row.original.totalAttendees}</span>,
        header: () => <span>العدد الإجمالي</span>,
        footer: (props) => props.column.id,
      }),
    ],
  }),
  {
    accessorKey: 'type',
    header: 'نوع الفعالية',
    cell: (cell) => (
      <span>{EVENT_TYPE[cell.row.original.type as KEVENT_TYPE]}</span>
    ),
  },
  {
    accessorKey: 'category',
    header: 'فئة الفعالية',
    cell: (cell) => {
      switch (cell.row.original.category) {
        case 'ON-CAMPUS':
          return <span>حضوري</span>;
        case 'ONLINE':
          return <span>أونلاين</span>;
        default:
          return <span>{cell.row.original.category}</span>;
      }
    },
  },
  {
    accessorKey: 'workTeam',
    header: 'فريق العمل',
    cell: (cell) => (
      <span>{WORKTEAM[cell.row.original.workTeam as KWORKTEAM]}</span>
    ),
  },
  {
    accessorKey: 'actions',
    header: '',
    cell: (cell) => (
      <DropdownMenu dir='rtl'>
        <DropdownMenuTrigger>
          <Ellipsis />
        </DropdownMenuTrigger>
        <DropdownMenuContent className='ml-2'>
          <DropdownMenuLabel>عمليات</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={async () => {
              const event = cell.row.original;
              exportDocument(event);
            }}
          >
            إصدار نموذج
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
