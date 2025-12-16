import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Heart, Activity } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { loginFormSchema, type LoginForm as LoginFormType } from "@shared/schema";

interface LoginFormProps {
  onLogin: (username: string) => void;
}

export function LoginForm({ onLogin }: LoginFormProps) {
  const form = useForm<LoginFormType>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
    },
  });

  const onSubmit = (data: LoginFormType) => {
    onLogin(data.username);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto flex items-center justify-center gap-2">
            <div className="relative">
              <Heart className="h-10 w-10 text-primary" />
              <Activity className="h-5 w-5 text-primary absolute -right-1 -bottom-1" />
            </div>
          </div>
          <div className="space-y-2">
            <CardTitle className="text-2xl font-semibold">HealthTracka</CardTitle>
            <CardDescription className="text-muted-foreground">
              Track your medications and vital signs
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" data-testid="form-login">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your username"
                        data-testid="input-username"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" size="lg" data-testid="button-login">
                Login
              </Button>
            </form>
          </Form>
          <p className="text-xs text-center text-muted-foreground mt-6">
            Enter any username to get started. Your data will be saved locally.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
