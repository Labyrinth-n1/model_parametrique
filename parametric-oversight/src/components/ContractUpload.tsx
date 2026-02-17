import { useState, useEffect, useCallback, useRef } from "react";
import { 
  FileText, CheckCircle, AlertTriangle, Loader2, Info, ChevronDown, ChevronUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';


type UploadState = "idle" | "uploading" | "analyzing" | "complete" | "error";
type Tab = "upload" | "bloc1" | "bloc2" | "meteo" | "decision";

const ContractUpload = () => {
  const [uploadState, setUploadState] = useState<UploadState>("idle");
  const [progress, setProgress] = useState(0);
  const [fileName, setFileName] = useState("");
  const [contratData, setContratData] = useState<any>(null);
  const [bloc1Data, setBloc1Data] = useState<any>(null);
  const [bloc2Data, setBloc2Data] = useState<any>(null);
  const [observationData, setObservationData] = useState<any>(null);
  const [decisionData, setDecisionData] = useState<any>(null);
  const [loadingMeteo, setLoadingMeteo] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("upload");

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  /** Upload du fichier */
  const handleFileSelect = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setUploadState("uploading");
    setProgress(30);

    try {
      const formData = new FormData();
      formData.append("file", file);

      setUploadState("analyzing");
      setProgress(60);

      const response = await fetch("http://127.0.0.1:8000/contrat/analyser", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) throw new Error("Erreur API");

      const data = await response.json();
      setContratData(data);

      // Génération progressive des blocs
      const bloc1: any = {};
      const bloc2: any = {};
      let i = 0;
      for (const [key, value] of Object.entries(data)) {
        if (i % 2 === 0) bloc1[key] = value;
        else bloc2[key] = value;
        i++;
        await new Promise(res => setTimeout(res, 150)); // effet "petit à petit"
        setBloc1Data({ ...bloc1 });
        setBloc2Data({ ...bloc2 });
      }

      setProgress(100);
      setUploadState("complete");
      setActiveTab("bloc1"); // passer au premier onglet
    } catch (error) {
      console.error("Échec de l'upload :", error);
      setUploadState("error");
    }
  }, []);

  /** Récupération des données météorologiques */
  const fetchMeteo = useCallback(async () => {
    if (!contratData) return;
    setLoadingMeteo(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/meteo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contratData),
      });
      if (!response.ok) throw new Error("Erreur API météo");
      const data = await response.json();
      setObservationData(data);
    } catch (err) {
      console.error("Erreur météo :", err);
    } finally {
      setLoadingMeteo(false);
    }
  }, [contratData]);

  /** Récupération décision paramétrique */
  const fetchDecision = useCallback(async () => {
    if (!contratData || !observationData) return;
    try {
      const response = await fetch("http://127.0.0.1:8000/decision", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contrat: contratData, meteo: observationData }),
      });
      if (!response.ok) throw new Error("Erreur API décision");
      const data = await response.json();
      setDecisionData(data);
    } catch (err) {
      console.error("Erreur décision :", err);
    }
  }, [contratData, observationData]);

  /** Effets après upload */
  useEffect(() => {
    if (uploadState === "complete") fetchMeteo();
  }, [uploadState, fetchMeteo]);

  useEffect(() => {
    if (observationData) fetchDecision();
  }, [observationData, fetchDecision]);

  /** Contenu des onglets */
  const renderTabContent = () => {
    switch (activeTab) {
      case "upload":
        return (
          <div className={`relative rounded-xl border-2 border-dashed ${uploadState === "complete" ? "border-success bg-success/5" :
            uploadState === "error" ? "border-destructive bg-destructive/5" :
            "border-border hover:border-primary/50 hover:bg-muted/50"}`}>
            <div className="flex flex-col items-center justify-center px-6 py-12">
              {uploadState === "idle" && (
                <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
                  Téléverser le contrat
                </Button>
              )}
              <input type="file" accept=".pdf,.odt" className="hidden" ref={fileInputRef} onChange={handleFileSelect} />
              
              {(uploadState === "uploading" || uploadState === "analyzing") && (
                <>
                  <Loader2 className="h-7 w-7 text-primary animate-spin mb-4" />
                  <p className="mb-2 text-sm font-medium">{fileName}</p>
                  <Progress value={progress} className="h-2 w-full max-w-xs mb-4" />
                </>
              )}

              {uploadState === "complete" && (
                <>
                  <CheckCircle className="h-7 w-7 text-success mb-4" />
                  <p className="mb-2 text-sm font-medium">{fileName}</p>
                  <p className="text-xs text-success">Contrat analysé avec succès</p>
                </>
              )}

              {uploadState === "error" && (
                <>
                  <AlertTriangle className="h-7 w-7 text-destructive mb-4" />
                  <p className="mb-2 text-sm font-medium">Échec de l’upload</p>
                  <Button variant="outline" onClick={() => setUploadState("idle")}>Réessayer</Button>
                </>
              )}
            </div>
          </div>
        );

      case "bloc1":
        return (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {bloc1Data && Object.entries(bloc1Data).map(([key, value]) => (
              <div key={key} className="rounded-lg border border-border bg-muted/30 p-4">
                <p className="field-label mb-1 font-medium">{key.replace(/_/g, " ")}</p>
                <p className="field-value">{typeof value === "object" ? JSON.stringify(value) : value}</p>
              </div>
            ))}
          </div>
        );

      case "bloc2":
        return (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {bloc2Data && Object.entries(bloc2Data).map(([key, value]) => (
              <div key={key} className="rounded-lg border border-border bg-muted/30 p-4">
                <p className="field-label mb-1 font-medium">{key.replace(/_/g, " ")}</p>
                <p className="field-value">{typeof value === "object" ? JSON.stringify(value) : value}</p>
              </div>
            ))}
          </div>
        );

      case "meteo":
  if (!observationData) return loadingMeteo ? <p>Chargement des données météorologiques...</p> : <p>Aucune donnée météo disponible.</p>;

  const { coordonnees, temperature, humidite, vent, nuages } = observationData;

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-4">
        <div className="rounded-xl border p-4">
          <p className="text-xs text-muted-foreground">Coordonnées</p>
          <p className="font-medium">{coordonnees.latitude}, {coordonnees.longitude}</p>
        </div>
        <div className="rounded-xl border p-4">
          <p className="text-xs text-muted-foreground">Température</p>
          <p className="font-medium">{temperature}°C</p>
        </div>
        <div className="rounded-xl border p-4">
          <p className="text-xs text-muted-foreground">Humidité</p>
          <p className="font-medium">{humidite}%</p>
        </div>
        <div className="rounded-xl border p-4">
          <p className="text-xs text-muted-foreground">Vitesse du vent</p>
          <p className="font-medium">{vent} m/s</p>
        </div>
        <div className="rounded-xl border p-4">
          <p className="text-xs text-muted-foreground">Couverture nuageuse</p>
          <p className="font-medium">{nuages}%</p>
        </div>
      </div>

      {/* Carte pleine largeur */}
    <div className="w-full h-[500px] rounded-xl overflow-hidden">
      <MapContainer
        center={[observationData.coordonnees.latitude, observationData.coordonnees.longitude]}
        zoom={10}
        scrollWheelZoom={true}
        className="w-full h-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <Marker position={[observationData.coordonnees.latitude, observationData.coordonnees.longitude]}>
          <Popup>
            Station météo <br /> Température : {observationData.temperature}°C
          </Popup>
        </Marker>
      </MapContainer>
    </div>
    </>
  );


      case "decision":
        return (
          <div>
            {decisionData ? (
              <div>
                {decisionData.triggerDetected ? (
                  <div className="space-y-4">
                    <div className="rounded-xl border-2 border-destructive/30 bg-destructive/5 p-4">
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10">
                          <AlertTriangle className="h-5 w-5 text-destructive" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground">Déclenchement paramétrique détecté</h3>
                          <p className="mt-1 text-sm text-muted-foreground">
                            Un ou plusieurs seuils paramétriques ont été atteints.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-xl border-2 border-success/30 bg-success/5 p-6 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-success/10">
                      <CheckCircle className="h-6 w-6 text-success" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Aucun déclenchement détecté</h3>
                      <p className="text-sm text-muted-foreground">
                        Les conditions contractuelles restent dans la norme.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ) : <p>Les données de décision sont en cours de calcul...</p>}
          </div>
        );

      default: return null;
    }
  };

  return (
    <section className="section-card animate-fade-in">
      <h2 className="section-title flex items-center gap-2">
        <FileText className="h-5 w-5 text-primary" />
        Analyse de contrat paramétrique
      </h2>

      {/* Onglets */}
      <div className="flex gap-2 mb-4">
        <Button variant={activeTab === "upload" ? "default" : "outline"} onClick={() => setActiveTab("upload")}>Téléversement</Button>
        <Button variant={activeTab === "bloc1" ? "default" : "outline"} onClick={() => setActiveTab("bloc1")}>Bloc 1</Button>
        <Button variant={activeTab === "bloc2" ? "default" : "outline"} onClick={() => setActiveTab("bloc2")}>Bloc 2</Button>
        <Button variant={activeTab === "meteo" ? "default" : "outline"} onClick={() => setActiveTab("meteo")}>Carte / Météo</Button>
        <Button variant={activeTab === "decision" ? "default" : "outline"} onClick={() => setActiveTab("decision")}>Décision</Button>
      </div>

      <Separator className="mb-4" />

      {/* Contenu onglet */}
      {renderTabContent()}
    </section>
  );
};

export default ContractUpload;
