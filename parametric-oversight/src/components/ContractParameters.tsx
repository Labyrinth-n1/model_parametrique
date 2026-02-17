{/* ContractParameters */}

import { FileSearch, MapPin, Thermometer, CloudRain, Wind, Calendar, Database, Wallet, CreditCard, UserCheck } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface ContractParametersProps {
  contratData: any;
  isVisible?: boolean;
}

const ContractParameters = ({ contratData, isVisible = true }: ContractParametersProps) => {
  if (!isVisible || !contratData) return null;

  const parameters = [
    {
      icon: FileSearch,
      label: "Contract Type",
      value: contratData.type_de_contrat || "N/A",
    },
    {
      icon: MapPin,
      label: "Covered Geographical Area",
      value: contratData.zone_geographique || "N/A",
    },
    {
      icon: Thermometer,
      label: "Insured Parameters",
      value: contratData.parametre_meteo || "N/A",
    },
    {
      icon: CloudRain,
      label: "Trigger Thresholds",
      value: `Rainfall: ${contratData.seuil_de_declenchement} ${contratData.unite || ""}, Temperature: ${contratData.seuil_de_temperature || "N/A"}`,
    },
    {
      icon: Calendar,
      label: "Observation Period",
      value: `${contratData.periode_d_observation?.date_debut} – ${contratData.periode_d_observation?.date_fin} (${contratData.periode_d_observation?.periode_mesure})`,
    },
    {
      icon: Database,
      label: "Data Sources",
      value: contratData.source_de_donnees || "N/A",
    },
    {
      icon: Wallet,
      label: "Indemnity Amount",
      value: `${contratData.montant_de_l_indemnisation || "N/A"} ${contratData.devise || ""}`,
    },
    {
      icon: CreditCard,
      label: "Payment Method",
      value: contratData.mode_de_paiement || "N/A",
    },
    {
      icon: UserCheck,
      label: "Human Validation",
      value: contratData.validation_humaine || "N/A",
    },
  ];

  return (
    <section className="section-card animate-fade-in">
      <h2 className="section-title">
        <FileSearch className="h-5 w-5 text-primary" />
        Extracted Contract Parameters
      </h2>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {parameters.map((param, index) => (
          <div key={param.label} className="rounded-lg border border-border bg-muted/30 p-4">
            <div className="mb-2 flex items-center gap-2">
              <param.icon className="h-4 w-4 text-primary" />
              <span>{param.label}</span>
            </div>
            <p>{param.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ContractParameters;

