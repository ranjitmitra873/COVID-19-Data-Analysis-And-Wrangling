import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PageVisit } from '@/utils/userTracking';

interface UserHistoryTableProps {
  history: PageVisit[];
}

export function UserHistoryTable({ history }: UserHistoryTableProps) {
  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date & Time</TableHead>
          <TableHead>Page</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {history.map((visit) => (
          <TableRow key={visit.id}>
            <TableCell>{formatTime(visit.timestamp)}</TableCell>
            <TableCell>{visit.page}</TableCell>
            <TableCell>{visit.action || 'View'}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

