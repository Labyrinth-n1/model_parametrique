import { useState } from "react";
import Header from "@/components/Header";
import ContractUpload from "@/components/ContractUpload";
import ContractParameters from "@/components/ContractParameters";
import GeographicCoverage from "@/components/GeographicCoverage";
import MeteorologicalData from "@/components/MeteorologicalData";
import DecisionEngine from "@/components/DecisionEngine";
import IndemnificationProcess from "@/components/IndemnificationProcess";
import AuditTrail from "@/components/AuditTrail";

const Index = () => {
  const [contractUploaded, setContractUploaded] = useState(true);

  return (
    <div className="min-h-screen bg-background">
      <Header userRole="Administrator" />
      
      <main className="container mx-auto px-4 py-8 md:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl space-y-6">
          {/* Section 1: Contract Upload */}
          <ContractUpload onUploadComplete={() => setContractUploaded(true)} />
            
         

          {/* 
          <ContractParameters isVisible={contractUploaded} />

         
          {contractUploaded && (
            <div className="grid gap-6 lg:grid-cols-2">
              <GeographicCoverage />
              <MeteorologicalData />
            </div>
          )}

         
          {contractUploaded && <DecisionEngine triggerDetected={true} />}

         
          {contractUploaded && <IndemnificationProcess />} 

          {contractUploaded && <AuditTrail />} */}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 Parametric Insurance Administration Platform. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Secure government-grade system for automated insurance monitoring and indemnification.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
