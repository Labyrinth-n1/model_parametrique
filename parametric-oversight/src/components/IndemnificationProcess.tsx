import { useState } from "react";
import { Wallet, CreditCard, Building2, CheckCircle, Clock, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type PaymentStatus = "pending" | "authorized" | "processing" | "paid";

const IndemnificationProcess = () => {
  const [status, setStatus] = useState<PaymentStatus>("pending");
  const [isProcessing, setIsProcessing] = useState(false);

  const paymentData = {
    amount: "€150,000.00",
    currency: "EUR",
    channel: "SEPA Bank Transfer",
    beneficiary: "AGR-2024-OCC-00847",
    iban: "FR76 •••• •••• •••• •••• 4521",
    reference: "PAR-IND-2024-12-00156",
  };

  const handleValidation = () => {
    setIsProcessing(true);
    setStatus("authorized");
    
    setTimeout(() => {
      setStatus("processing");
      setTimeout(() => {
        setStatus("paid");
        setIsProcessing(false);
      }, 2000);
    }, 1500);
  };

  const statusConfig = {
    pending: {
      icon: Clock,
      label: "Pending Validation",
      color: "bg-warning/10 text-warning",
      iconColor: "text-warning",
    },
    authorized: {
      icon: CheckCircle,
      label: "Authorized",
      color: "bg-primary/10 text-primary",
      iconColor: "text-primary",
    },
    processing: {
      icon: Loader2,
      label: "Processing Payment",
      color: "bg-primary/10 text-primary",
      iconColor: "text-primary",
    },
    paid: {
      icon: CheckCircle,
      label: "Payment Complete",
      color: "bg-success/10 text-success",
      iconColor: "text-success",
    },
  };

  const currentStatus = statusConfig[status];
  const StatusIcon = currentStatus.icon;

  return (
    <section className="section-card animate-fade-in" style={{ animationDelay: "0.5s" }}>
      <h2 className="section-title">
        <Wallet className="h-5 w-5 text-primary" />
        Indemnification Process
      </h2>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Payment details */}
        <div className="space-y-4">
          <div className="rounded-xl border border-border bg-muted/30 p-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <CreditCard className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Payment Details</p>
                <p className="text-xs text-muted-foreground">Reference: {paymentData.reference}</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="field-label">Indemnity Amount</span>
                <span className="text-xl font-bold text-foreground">{paymentData.amount}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="field-label">Currency</span>
                <span className="field-value">{paymentData.currency}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="field-label">Payment Channel</span>
                <span className="field-value">{paymentData.channel}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="field-label">Beneficiary ID</span>
                <span className="field-value font-mono">{paymentData.beneficiary}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="field-label">Destination IBAN</span>
                <span className="field-value font-mono">{paymentData.iban}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Status and validation */}
        <div className="space-y-4">
          {/* Current status */}
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                <Building2 className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Payment Status</p>
                <p className="text-xs text-muted-foreground">Administrative validation required</p>
              </div>
            </div>

            <div className={`flex items-center gap-3 rounded-lg p-4 ${currentStatus.color}`}>
              <StatusIcon className={`h-5 w-5 ${currentStatus.iconColor} ${status === "processing" ? "animate-spin" : ""}`} />
              <span className="font-medium">{currentStatus.label}</span>
            </div>

            {status === "paid" && (
              <div className="mt-4 rounded-lg bg-success/5 border border-success/20 p-3">
                <p className="text-sm text-success font-medium">
                  ✓ Payment successfully processed
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Transaction completed on December 29, 2024 at 14:45 UTC
                </p>
              </div>
            )}
          </div>

          {/* Validation button */}
          {status === "pending" && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button 
                  className="w-full py-6 text-base font-semibold"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="mr-2 h-5 w-5" />
                      Validate and Authorize Payment
                    </>
                  )}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Confirm Payment Authorization</AlertDialogTitle>
                  <AlertDialogDescription className="space-y-2">
                    <p>You are about to authorize a payment of <strong>{paymentData.amount}</strong> to beneficiary <strong>{paymentData.beneficiary}</strong>.</p>
                    <p>This action will be logged in the audit trail and cannot be reversed.</p>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleValidation}>
                    Confirm Authorization
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}

          {/* Security notice */}
          <div className="flex items-start gap-2 rounded-lg bg-muted/50 p-3 text-sm text-muted-foreground">
            <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
            <span>All payment authorizations require administrative validation and are subject to audit review.</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndemnificationProcess;
