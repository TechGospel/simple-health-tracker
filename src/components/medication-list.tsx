import { Pill, Trash2, Clock, Beaker } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import type { Medication } from "@shared/schema";

interface MedicationListProps {
  medications: Medication[];
  isLoading: boolean;
  onRemove: (id: string) => void;
}

export function MedicationList({ medications, isLoading, onRemove }: MedicationListProps) {
  return (
    <Card className="flex flex-col h-fit">
      <CardHeader className="pb-4 flex-shrink-0">
        <CardTitle className="flex items-center gap-2 text-xl">
          <Pill className="h-5 w-5 text-primary" />
          Your Medications
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 min-h-0">
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-24 w-full" />
            ))}
          </div>
        ) : medications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="rounded-full bg-muted p-4 mb-4">
              <Pill className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground font-medium">No medications added yet</p>
            <p className="text-sm text-muted-foreground mt-1">
              Add your first medication using the form above
            </p>
          </div>
        ) : (
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-3">
              {medications.map((medication) => (
                <div
                  key={medication.id}
                  className="group p-4 rounded-md border bg-card hover-elevate"
                  data-testid={`card-medication-${medication.id}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-base truncate" data-testid={`text-medication-name-${medication.id}`}>
                        {medication.name}
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Beaker className="h-4 w-4 flex-shrink-0" />
                          <span className="truncate" data-testid={`text-medication-dosage-${medication.id}`}>
                            {medication.dosage}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4 flex-shrink-0" />
                          <span className="truncate" data-testid={`text-medication-frequency-${medication.id}`}>
                            {medication.frequency}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onRemove(medication.id)}
                      className="text-destructive opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                      data-testid={`button-remove-medication-${medication.id}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
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
