import { listActions } from "@/lib/admin/data";
import { ApprovalCard } from "../ApprovalCard";
import { Card, PageHeader } from "../ui";

export const metadata = { title: "Approvals" };

export default async function ApprovalsPage() {
  const [pending, recent] = await Promise.all([listActions({ status: "pending", limit: 100 }), listActions({ limit: 30 })]);
  const decided = recent.filter((a) => a.status !== "pending");
  return (
    <div className="space-y-8">
      <PageHeader eyebrow="Approvals" title={pending.length ? `${pending.length} waiting for you` : "Nothing waiting"} />
      <p className="max-w-2xl text-sm text-white/50">
        Agents never send an email, publish a post or message a client on their own. Everything they prepare lands here, and only goes out
        when you approve it.
      </p>
      <div className="grid gap-3 xl:grid-cols-2">
        {pending.map((a) => (
          <ApprovalCard key={a.id} action={a} />
        ))}
        {!pending.length && <Card className="p-6 text-sm text-white/45">All caught up.</Card>}
      </div>
      {decided.length > 0 && (
        <section>
          <h2 className="text-sm font-bold tracking-wide text-white/70 uppercase">Recently decided</h2>
          <div className="mt-4 grid gap-3 xl:grid-cols-2">
            {decided.map((a) => (
              <ApprovalCard key={a.id} action={a} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
