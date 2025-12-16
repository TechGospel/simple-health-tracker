import { Activity, Heart, Scale, Clock } from "lucide-react";
import { formatDistanceToNow, format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import type { VitalSigns } from "@shared/schema";

interface VitalsLogProps {
  vitals: VitalSigns[];
  isLoading: boolean;
}

export function VitalsLog({ vitals, isLoading }: VitalsLogProps) {
  return (
    <Card className="flex flex-col h-fit">
      <CardHeader className="pb-4 flex-shrink-0">
        <CardTitle className="flex items-center gap-2 text-xl">
          <Activity className="h-5 w-5 text-primary" />
          Recent Vitals
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 min-h-0">
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-28 w-full" />
            ))}
          </div>
        ) : vitals.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="rounded-full bg-muted p-4 mb-4">
              <Activity className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground font-medium">No vitals logged yet</p>
            <p className="text-sm text-muted-foreground mt-1">
              Log your first vital signs using the form above
            </p>
          </div>
        ) : (
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-3">
              {vitals.map((vital) => (
                <div
                  key={vital.id}
                  className="p-4 rounded-md border bg-card border-l-4 border-l-primary"
                  data-testid={`card-vitals-${vital.id}`}
                >
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3 cursor-default">
                        <Clock className="h-3 w-3" />
                        <span data-testid={`text-vitals-timestamp-${vital.id}`}>
                          {formatDistanceToNow(new Date(vital.timestamp), { addSuffix: true })}
                        </span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{format(new Date(vital.timestamp), "PPpp")}</p>
                    </TooltipContent>
                  </Tooltip>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Blood Pressure</p>
                      <p className="font-mono font-semibold text-lg" data-testid={`text-vitals-bp-${vital.id}`}>
                        {vital.systolic}/{vital.diastolic}
                        <span className="text-xs font-normal text-muted-foreground ml-1">mmHg</span>
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Heart className="h-3 w-3" />
                        Heart Rate
                      </p>
                      <p className="font-mono font-semibold text-lg" data-testid={`text-vitals-hr-${vital.id}`}>
                        {vital.heartRate}
                        <span className="text-xs font-normal text-muted-foreground ml-1">BPM</span>
                      </p>
                    </div>
                    <div className="space-y-1 col-span-2 sm:col-span-1">
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Scale className="h-3 w-3" />
                        Weight
                      </p>
                      <p className="font-mono font-semibold text-lg" data-testid={`text-vitals-weight-${vital.id}`}>
                        {vital.weight}
                        <span className="text-xs font-normal text-muted-foreground ml-1">lbs</span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}
