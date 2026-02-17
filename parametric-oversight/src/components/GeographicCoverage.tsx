import { MapPin, ZoomIn, ZoomOut, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const GeographicCoverage = () => {
  return (
    <section className="section-card animate-fade-in" style={{ animationDelay: "0.2s" }}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="section-title mb-0">
          <MapPin className="h-5 w-5 text-primary" />
          Covered Geographic Area
        </h2>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Maximize2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-xl border border-border bg-muted/30">
        {/* Map placeholder with styled representation */}
        <div className="relative h-[300px] md:h-[400px] bg-gradient-to-br from-primary/5 via-muted to-primary/10">
          {/* Grid overlay */}
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px),
                linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px'
            }}
          />
          
          {/* Coverage area representation */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              {/* Coverage zone */}
              <div className="h-32 w-32 md:h-48 md:w-48 rounded-full border-4 border-primary/30 bg-primary/10 animate-pulse-soft" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-20 w-20 md:h-32 md:w-32 rounded-full border-2 border-primary/50 bg-primary/20" />
              </div>
              
              {/* Center marker */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  <MapPin className="h-8 w-8 text-primary drop-shadow-lg" />
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-2 w-2 rounded-full bg-primary shadow-lg" />
                </div>
              </div>
            </div>
          </div>

          {/* Location label */}
          <div className="absolute bottom-4 left-4 rounded-lg bg-card/95 backdrop-blur px-4 py-2 shadow-elevated border border-border">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              <div>
                <p className="text-sm font-medium text-foreground">Toulouse Metropolitan Area</p>
                <p className="text-xs text-muted-foreground">Occitanie Region, France</p>
              </div>
            </div>
          </div>

          {/* Coordinates */}
          <div className="absolute bottom-4 right-4 rounded-lg bg-card/95 backdrop-blur px-3 py-1.5 shadow-card border border-border">
            <p className="text-xs font-mono text-muted-foreground">43.6047° N, 1.4442° E</p>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-primary/20 border border-primary/50" />
          <span>Coverage Zone</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="h-3 w-3 text-primary" />
          <span>Observation Point</span>
        </div>
      </div>
    </section>
  );
};

export default GeographicCoverage;
