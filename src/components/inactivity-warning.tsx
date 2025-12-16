import { AlertTriangle, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface InactivityWarningProps {
  onDismiss: () => void;
}

export function InactivityWarning({ onDismiss }: InactivityWarningProps) {
  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] w-full max-w-md px-4" data-testid="alert-inactivity">
      <div className="flex items-center gap-3 p-4 rounded-md bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 shadow-lg">
        <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-500 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
            Inactivity Warning
          </p>
          <p className="text-xs text-amber-700 dark:text-amber-300 mt-0.5">
            You will be logged out in 1 minute due to inactivity
          </p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onDismiss}
          className="flex-shrink-0 text-amber-700 dark:text-amber-300"
          data-testid="button-dismiss-warning"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
