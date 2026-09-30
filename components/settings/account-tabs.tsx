"use client";

import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useCustomerOrders,
  useCustomerPayments,
  useCustomerTickets,
} from "@/hooks/use-customer-data";
import { useI18n } from "@/i18n/dictionary-provider";
import type {
  CustomerOrder,
  CustomerPayment,
  CustomerTicket,
} from "@/types/api";
import { DataTable, type Column } from "./data-table";
import { StatusBadge, type Tone } from "./status-badge";

const TABS = ["orders", "payments", "licenses", "tickets"] as const;
type Tab = (typeof TABS)[number];

const formatDate = (value?: string | null) =>
  value ? format(new Date(value), "yyyy-MM-dd") : "—";
const Mono = ({ children }: { children: React.ReactNode }) => (
  <span className="font-mono font-medium">{children}</span>
);

/**
 * The API does not always match the declared unions (casing, nulls, new values),
 * so unknown values fall back to the raw text instead of crashing the table.
 */
function StatusCell({
  map,
  value,
}: {
  map: Record<string, [string, Tone]>;
  value: unknown;
}) {
  const key = String(value ?? "")
    .trim()
    .toUpperCase()
    .replace(/[\s-]+/g, "_");
  const [label, tone] = map[key] ?? [value ? String(value) : "—", "info"];
  return <StatusBadge tone={tone}>{label}</StatusBadge>;
}

export function AccountTabs() {
  const { dict } = useI18n();
  const { account, common, support } = dict;
  const st = account.st;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab") as Tab | null;
  const tab: Tab = tabParam && TABS.includes(tabParam) ? tabParam : "orders";
  const [openTicket, setOpenTicket] = useState<CustomerTicket | null>(null);

  const orders = useCustomerOrders();
  const payments = useCustomerPayments();
  const tickets = useCustomerTickets();

  const setTab = (next: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("tab", next);
    router.replace(`${pathname}?${params}`, { scroll: false });
  };

  const orderStatus: Record<string, [string, Tone]> = {
    PENDING: [st.pending, "warn"],
    PROCESSING: [st.processing, "info"],
    COMPLETED: [st.completed, "success"],
    DELIVERED: [st.delivered, "success"],
    CANCELLED: [st.cancelled, "danger"],
  };
  const ticketStatus: Record<string, [string, Tone]> = {
    PENDING: [st.pending, "warn"],
    IN_PROGRESS: [st.inProgress, "info"],
    RESOLVED: [st.resolved, "success"],
    CLOSED: [st.closed, "success"],
  };
  const categoryIndex: Record<string, number> = {
    BILLING: 0,
    SUPPORT: 1,
    GENERAL: 2,
  };
  const priority: Record<string, [string, Tone]> = {
    LOW: [support.pris[0], "info"],
    HIGH: [support.pris[1], "warn"],
    CRITICAL: [support.pris[2], "danger"],
  };
  const methods = account.methods as Record<string, string>;

  const orderColumns: Column<CustomerOrder>[] = [
    { header: account.orderNo, cell: (o) => <Mono>{o.Or_No}</Mono> },
    {
      header: account.status,
      cell: (o) => <StatusCell map={orderStatus} value={o.Or_Status} />,
    },
    { header: account.qty, cell: (o) => o.Or_Qty },
    {
      header: account.total,
      cell: (o) => `${o.Or_Total} ${common.rs}`,
      className: "font-bold",
    },
    { header: account.orderDate, cell: (o) => formatDate(o.Or_Date) },
    { header: account.recDate, cell: (o) => formatDate(o.Or_RecDate) },
  ];
  const paymentColumns: Column<CustomerPayment>[] = [
    { header: account.payNo, cell: (p) => <Mono>{p.Pa_No}</Mono> },
    {
      header: account.method,
      cell: (p) => methods[String(p.Pa_MethodID)] ?? "—",
    },
    {
      header: account.total,
      cell: (p) => `${p.Pa_Amount} ${common.rs}`,
      className: "font-bold",
    },
    { header: account.payDate, cell: (p) => formatDate(p.Pa_Date) },
    {
      header: account.status,
      cell: () => <StatusBadge tone="success">{st.paid}</StatusBadge>,
    },
    {
      header: account.viewDoc,
      cell: (p) =>
        p.Pa_Photo ? (
          <a
            href={p.Pa_Photo}
            target="_blank"
            rel="noreferrer"
            className="font-bold text-link hover:text-deep"
          >
            {account.viewDoc}
          </a>
        ) : (
          "—"
        ),
    },
  ];
  const ticketColumns: Column<CustomerTicket>[] = [
    { header: account.ticketNo, cell: (t) => <Mono>{t.Ti_No}</Mono> },
    {
      header: account.subject,
      cell: (t) => <span className="line-clamp-1">{t.Ti_Subject}</span>,
    },
    {
      header: account.category,
      cell: (t) =>
        support.cats[categoryIndex[String(t.Ti_Category).toUpperCase()]] ??
        t.Ti_Category ??
        "—",
    },
    {
      header: account.priority,
      cell: (t) => <StatusCell map={priority} value={t.Ti_Priority} />,
    },
    {
      header: account.status,
      cell: (t) => <StatusCell map={ticketStatus} value={t.Ti_Status} />,
    },
  ];

  const counts: Record<Tab, number | undefined> = {
    orders: orders.data?.length,
    payments: payments.data?.length,
    licenses: 0,
    tickets: tickets.data?.length,
  };
  const shared = {
    emptyLabel: "",
    errorLabel: account.errorLoading,
    retryLabel: common.retry,
  };

  return (
    <Tabs value={tab} onValueChange={setTab} className="gap-6">
      <TabsList
        variant="line"
        className="justify-start w-full h-auto gap-1 p-0 overflow-x-auto border-b rounded-none"
      >
        {TABS.map((id, i) => (
          <TabsTrigger
            key={id}
            value={id}
            className="-mb-px h-auto flex-none gap-2 px-4.5 py-3.5 text-base font-bold after:bottom-0! after:bg-primary data-active:text-foreground"
          >
            {account.tabs[i]}
            {counts[id] !== undefined && (
              <span className="px-2 text-xs rounded-full bg-soft text-link">
                {counts[id]}
              </span>
            )}
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContent value="orders" className="overflow-x-auto">
        <DataTable
          {...shared}
          emptyLabel={account.noOrders}
          columns={orderColumns}
          rows={orders.data}
          rowKey={(o) => o.Or_ID}
          isPending={orders.isPending}
          isError={orders.isError}
          onRetry={orders.refetch}
        />
      </TabsContent>
      <TabsContent value="payments" className="overflow-x-auto">
        <DataTable
          {...shared}
          emptyLabel={account.noPayments}
          columns={paymentColumns}
          rows={payments.data}
          rowKey={(p) => p.Pa_ID}
          isPending={payments.isPending}
          isError={payments.isError}
          onRetry={payments.refetch}
        />
      </TabsContent>
      <TabsContent value="licenses">
        {/* No licenses endpoint exists yet in the backend. */}
        <div className="rounded-[20px] border bg-card p-12 text-center text-muted-foreground">
          {account.noLicenses}
        </div>
      </TabsContent>
      <TabsContent value="tickets" className="overflow-x-auto">
        <DataTable
          {...shared}
          emptyLabel={account.noTickets}
          columns={ticketColumns}
          rows={tickets.data}
          rowKey={(t) => t.Ti_ID}
          isPending={tickets.isPending}
          isError={tickets.isError}
          onRetry={tickets.refetch}
          onRowClick={setOpenTicket}
        />
      </TabsContent>

      <Dialog
        open={!!openTicket}
        onOpenChange={(open) => !open && setOpenTicket(null)}
      >
        <DialogContent className="rounded-2xl sm:max-w-lg">
          {openTicket && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3 text-xl font-extrabold">
                  {account.ticketDetails} <Mono>{openTicket.Ti_No}</Mono>
                </DialogTitle>
                <DialogDescription className="flex flex-wrap gap-2 pt-1">
                  <StatusCell map={ticketStatus} value={openTicket.Ti_Status} />
                  <StatusCell map={priority} value={openTicket.Ti_Priority} />
                </DialogDescription>
              </DialogHeader>
              <dl className="flex flex-col gap-4 text-[15px]">
                <div>
                  <dt className="font-bold">{account.subject}</dt>
                  <dd className="text-muted-foreground">
                    {openTicket.Ti_Subject}
                  </dd>
                </div>
                {openTicket.Ti_Problem && (
                  <div>
                    <dt className="font-bold">{account.description}</dt>
                    <dd className="whitespace-pre-line text-muted-foreground">
                      {openTicket.Ti_Problem}
                    </dd>
                  </div>
                )}
                <div className="p-4 rounded-xl bg-soft">
                  <dt className="font-bold">{account.response}</dt>
                  <dd className="whitespace-pre-line text-muted-foreground">
                    {openTicket.Ti_Response || account.noResponse}
                  </dd>
                </div>
              </dl>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Tabs>
  );
}
