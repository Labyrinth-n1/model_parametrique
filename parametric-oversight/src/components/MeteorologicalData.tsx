import { useEffect, useState } from "react";
import { Cloud, Thermometer, Wind, Droplets, Clock, Database, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MeteorologicalDataProps {
  contrat: any; // JSON du contrat venant du backend
}

const MeteorologicalData = ({ contrat }: MeteorologicalDataProps) => {
  const [observationData, setObservationData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const fetchMeteo = async () => {
    if (!contrat) return;

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("contrat", JSON.stringify(contrat));

      const response = await fetch("http://127.0.0.1:8000/contrat/meteo", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Erreur API météo");

      const data = await response.json();
      setObservationData(data);
    } catch (err) {
      console.error("Fetch météo failed:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeteo();
  }, [contrat]);

  if (!observationData) return <p>Loading meteorological data...</p>;

  const { coordonnees, temperature, humidite, vent, nuages, timestamp } = observationData;

  return (
    <section className="section-card animate-fade-in" style={{ animationDelay: "0.3s" }}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="section-title mb-0">
          <Cloud className="h-5 w-5 text-primary" />
          Meteorological Observation
        </h2>
        <Button variant="ghost" size="sm" className="gap-2" onClick={fetchMeteo}>
          <RefreshCw className="h-4 w-4" />
          <span className="hidden md:inline">Refresh Data</span>
        </Button>
      </div>

      <div className="mb-6 flex flex-wrap items-center gap-4 text-sm">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>{new Date(timestamp * 1000).toUTCString()}</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Database className="h-4 w-4" />
          <span>OpenWeatherMap API</span>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Temperature */}
        <div className="rounded-xl border border-border p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-100">
              <Thermometer className="h-4 w-4 text-orange-600" />
            </div>
            <span className="text-sm font-medium text-muted-foreground">Temperature</span>
          </div>
          <p className="text-2xl font-semibold text-foreground mb-1">{temperature}°C</p>
        </div>

        {/* Wind */}
        <div className="rounded-xl border border-border p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100">
              <Wind className="h-4 w-4 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-muted-foreground">Wind Speed</span>
          </div>
          <p className="text-2xl font-semibold text-foreground mb-1">{vent} m/s</p>
        </div>

        {/* Humidity */}
        <div className="rounded-xl border border-border p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100">
              <Cloud className="h-4 w-4 text-emerald-600" />
            </div>
            <span className="text-sm font-medium text-muted-foreground">Humidity</span>
          </div>
          <p className="text-2xl font-semibold text-foreground mb-1">{humidite}%</p>
        </div>

        {/* Clouds */}
        <div className="rounded-xl border border-border p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-100">
              <Droplets className="h-4 w-4 text-sky-600" />
            </div>
            <span className="text-sm font-medium text-muted-foreground">Cloud Coverage</span>
          </div>
          <p className="text-2xl font-semibold text-foreground mb-1">{nuages}%</p>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 rounded-lg bg-muted/50 px-4 py-2 text-sm text-muted-foreground">
        <div className="h-2 w-2 rounded-full bg-success" />
        Data verified from OpenWeatherMap
      </div>
    </section>
  );
};

export default MeteorologicalData;
