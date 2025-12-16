import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pill, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { insertMedicationSchema, type InsertMedication } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

interface MedicationFormProps {
  onAdd: (medication: InsertMedication) => void;
}

export function MedicationForm({ onAdd }: MedicationFormProps) {
  const { toast } = useToast();
  const form = useForm<InsertMedication>({
    resolver: zodResolver(insertMedicationSchema),
    defaultValues: {
      name: "",
      dosage: "",
      frequency: "",
    },
  });

  const onSubmit = (data: InsertMedication) => {
    onAdd(data);
    form.reset();
    toast({
      title: "Medication added",
      description: `${data.name} has been added to your list.`,
    });
  };

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-xl">
          <Pill className="h-5 w-5 text-primary" />
          Add Medication
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" data-testid="form-medication">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Medication Name *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Lisinopril"
                      data-testid="input-medication-name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dosage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dosage *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., 20mg"
                      data-testid="input-medication-dosage"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="frequency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Frequency *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Once daily in the morning"
                      data-testid="input-medication-frequency"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" data-testid="button-add-medication">
              <Plus className="h-4 w-4 mr-2" />
              Add Medication
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
