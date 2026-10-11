import { DataTable, StatusBadge } from "@taqeemak/ui";

type Order = { id: string; date: string; status: [string, "info" | "success" | "warn" | "danger"]; total: string };

const orders: Order[] = [
  { id: "#1042", date: "2026/11/02", status: ["تم التوصيل", "success"], total: "299 ريال" },
  { id: "#1038", date: "2026/10/18", status: ["قيد الشحن", "info"], total: "598 ريال" },
  { id: "#1031", date: "2026/10/05", status: ["بانتظار الدفع", "warn"], total: "299 ريال" },
  { id: "#1021", date: "2026/09/27", status: ["ملغي", "danger"], total: "299 ريال" },
];

const columns = [
  { header: "رقم الطلب", cell: (o: Order) => <span className="font-semibold">{o.id}</span> },
  { header: "الحالة", cell: (o: Order) => <StatusBadge tone={o.status[1]}>{o.status[0]}</StatusBadge> },
  { header: "تاريخ الطلب", cell: (o: Order) => o.date },
  { header: "الأجمالي", cell: (o: Order) => o.total },
];

const labels = { emptyLabel: "لا توجد طلبات بعد", errorLabel: "تعذر تحميل البيانات", retryLabel: "إعادة المحاولة", onRetry: () => {} };

export const Orders = () => (
  <DataTable columns={columns} rows={orders} rowKey={(o) => o.id} isPending={false} isError={false} {...labels} />
);

export const Loading = () => (
  <DataTable columns={columns} rows={undefined} rowKey={(o) => o.id} isPending isError={false} {...labels} />
);

export const Empty = () => (
  <DataTable columns={columns} rows={[]} rowKey={(o) => o.id} isPending={false} isError={false} {...labels} />
);

export const Error = () => (
  <DataTable columns={columns} rows={undefined} rowKey={(o) => o.id} isPending={false} isError {...labels} />
);
