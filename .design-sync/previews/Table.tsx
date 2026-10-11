import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@taqeemak/ui";

const rows = [
  ["#1042", "2026/11/02", "299 ريال"],
  ["#1038", "2026/10/18", "598 ريال"],
  ["#1021", "2026/09/27", "299 ريال"],
];

export const Orders = () => (
  <Table>
    <TableCaption>آخر الطلبات</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead className="text-start">رقم الطلب</TableHead>
        <TableHead className="text-start">تاريخ الطلب</TableHead>
        <TableHead className="text-start">الأجمالي</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {rows.map(([id, date, total]) => (
        <TableRow key={id}>
          <TableCell className="font-semibold">{id}</TableCell>
          <TableCell>{date}</TableCell>
          <TableCell>{total}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);
