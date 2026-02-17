import { History, FileText, Brain, Database, Scale, UserCheck, CheckCircle, Clock } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const AuditTrail = () => {
  const auditEvents = [
    {
      id: 1,
      icon: FileText,
      title: "Contract Uploaded",
      description: "Parametric insurance contract uploaded to system",
      timestamp: "Dec 29, 2024 — 09:15:23 UTC",
      user: "admin@authority.gov",
      status: "completed",
    },
    {
      id: 2,
      icon: Brain,
      title: "AI Extraction Completed",
      description: "Contract parameters extracted and validated by AI system",
      timestamp: "Dec 29, 2024 — 09:15:47 UTC",
      user: "System (AI Engine v2.4)",
      status: "completed",
    },
    {
      id: 3,
      icon: Database,
      title: "Data Source Connected",
      description: "Météo-France API data stream established for observation period",
      timestamp: "Dec 29, 2024 — 09:16:02 UTC",
      user: "System (Data Pipeline)",
      status: "completed",
    },
    {
      id: 4,
      icon: Scale,
      title: "Parametric Analysis Executed",
      description: "Trigger detection algorithm processed meteorological data",
      timestamp: "Dec 29, 2024 — 14:30:15 UTC",
      user: "System (Decision Engine)",
      status: "completed",
    },
    {
      id: 5,
      icon: UserCheck,
      title: "Payment Validation Pending",
      description: "Awaiting administrative approval for indemnification",
      timestamp: "Dec 29, 2024 — 14:30:18 UTC",
      user: "Pending assignment",
      status: "pending",
    },
  ];

  return (
    <section className="section-card animate-fade-in" style={{ animationDelay: "0.6s" }}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="section-title mb-0">
          <History className="h-5 w-5 text-primary" />
          Audit Trail
        </h2>
        <span className="text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full">
          {auditEvents.length} events recorded
        </span>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-[19px] top-0 bottom-0 w-0.5 bg-border" />

        <div className="space-y-0">
          {auditEvents.map((event, index) => {
            const EventIcon = event.icon;
            const isLast = index === auditEvents.length - 1;
            const isPending = event.status === "pending";

            return (
              <div key={event.id} className="relative pl-12 pb-6 last:pb-0">
                {/* Timeline dot */}
                <div 
                  className={`absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full border-2 bg-card ${
                    isPending 
                      ? "border-warning" 
                      : "border-success"
                  }`}
                >
                  {isPending ? (
                    <Clock className="h-4 w-4 text-warning" />
                  ) : (
                    <EventIcon className="h-4 w-4 text-success" />
                  )}
                </div>

                {/* Event content */}
                <div className={`rounded-xl border bg-card p-4 transition-all hover:shadow-card ${
                  isPending ? "border-warning/30 bg-warning/5" : "border-border"
                }`}>
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                    <h3 className="font-medium text-foreground">{event.title}</h3>
                    <span className={`status-badge ${
                      isPending ? "status-warning" : "status-success"
                    }`}>
                      {isPending ? (
                        <>
                          <Clock className="h-3 w-3" />
                          Pending
                        </>
                      ) : (
                        <>
                          <CheckCircle className="h-3 w-3" />
                          Completed
                        </>
                      )}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{event.description}</p>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {event.timestamp}
                    </span>
                    <span className="font-mono">{event.user}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Separator className="my-6" />

      {/* Compliance notice */}
      <div className="rounded-lg bg-primary/5 border border-primary/10 p-4">
        <div className="flex items-start gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
            <History className="h-4 w-4 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">Regulatory Compliance</p>
            <p className="text-xs text-muted-foreground mt-1">
              All events are immutably logged and retained for 10 years in accordance with 
              insurance regulatory requirements. Audit data is available for export upon request.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuditTrail;
