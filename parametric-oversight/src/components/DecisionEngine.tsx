import { useState } from "react";
import { Scale, CheckCircle, AlertTriangle, Info, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface DecisionEngineProps {
  triggerDetected?: boolean;
}

const DecisionEngine = ({ triggerDetected = true }: DecisionEngineProps) => {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const triggerData = {
    parameter: "Monthly Rainfall",
    observedValue: "12.4 mm",
    threshold: "< 15 mm/month",
    period: "December 2024",
    confidence: "99.2%",
  };

  return (
    <section className="section-card animate-fade-in" style={{ animationDelay: "0.4s" }}>
      <h2 className="section-title">
        <Scale className="h-5 w-5 text-primary" />
        Parametric Decision Result
      </h2>

      {triggerDetected ? (
        <div className="space-y-4">
          {/* Alert banner */}
          <div className="rounded-xl border-2 border-destructive/30 bg-destructive/5 p-4">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-destructive/10">
                <AlertTriangle className="h-5 w-5 text-destructive" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">Parametric Trigger Detected</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  One or more parametric thresholds have been reached during the observation period. 
                  Review the details below and proceed to indemnification.
                </p>
              </div>
            </div>
          </div>

          {/* Trigger details */}
          <Collapsible open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="w-full justify-between py-6 px-4 rounded-xl border border-border bg-muted/30 hover:bg-muted/50">
                <div className="flex items-center gap-2">
                  <Info className="h-4 w-4 text-primary" />
                  <span className="font-medium">Trigger Details</span>
                </div>
                {isDetailsOpen ? (
                  <ChevronUp className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                )}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2">
              <div className="rounded-xl border border-border bg-card p-4 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <div>
                    <p className="field-label mb-1">Triggered Parameter</p>
                    <p className="field-value text-destructive font-semibold">{triggerData.parameter}</p>
                  </div>
                  <div>
                    <p className="field-label mb-1">Observed Value</p>
                    <p className="field-value">{triggerData.observedValue}</p>
                  </div>
                  <div>
                    <p className="field-label mb-1">Contractual Threshold</p>
                    <p className="field-value">{triggerData.threshold}</p>
                  </div>
                  <div>
                    <p className="field-label mb-1">Observation Period</p>
                    <p className="field-value">{triggerData.period}</p>
                  </div>
                  <div>
                    <p className="field-label mb-1">Detection Confidence</p>
                    <p className="field-value">{triggerData.confidence}</p>
                  </div>
                </div>

                {/* Threshold comparison visual */}
                <div className="rounded-lg bg-muted/50 p-4">
                  <p className="text-sm font-medium text-foreground mb-3">Threshold Comparison</p>
                  <div className="relative h-8 rounded-full bg-muted overflow-hidden">
                    <div 
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-destructive/80 to-destructive rounded-full"
                      style={{ width: `${(12.4 / 15) * 100}%` }}
                    />
                    <div 
                      className="absolute inset-y-0 border-r-2 border-dashed border-foreground/50"
                      style={{ left: '100%' }}
                    />
                  </div>
                  <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                    <span>0 mm</span>
                    <span>Observed: 12.4 mm</span>
                    <span className="text-destructive font-medium">Threshold: 15 mm</span>
                  </div>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      ) : (
        <div className="rounded-xl border-2 border-success/30 bg-success/5 p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-success/10">
              <CheckCircle className="h-6 w-6 text-success" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">No Parametric Trigger Detected</h3>
              <p className="text-sm text-muted-foreground">
                No parametric threshold has been reached for the observed period. 
                Contract conditions remain within normal parameters.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default DecisionEngine;
