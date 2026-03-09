import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/layout/Layout";

const API = "/api";

export default function ForgotPassword() {

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleReset = async (e: React.FormEvent) => {

    e.preventDefault();
    setLoading(true);

    try {

      const res = await fetch(`${API}/forgot-password/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed");
      }

      toast({
        title: "Check your email",
        description: "Password reset instructions have been sent.",
      });

    } catch (err: any) {

      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      });

    }

    setLoading(false);
  };

  return (
    <Layout>

      <section className="min-h-[80vh] flex items-center justify-center py-20">

        <div className="w-full max-w-md mx-auto p-8">

          <h1 className="font-display text-3xl font-bold text-foreground text-center mb-2">
            Reset Password
          </h1>

          <p className="font-body text-muted-foreground text-center mb-8">
            Enter your email to receive a reset link
          </p>

          <form onSubmit={handleReset} className="space-y-5">

            <div>
              <Label className="font-body">Email</Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 font-body"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </Button>

          </form>

          <p className="mt-6 text-center font-body text-sm text-muted-foreground">
            <Link to="/login" className="text-secondary hover:underline">
              Back to Login
            </Link>
          </p>

        </div>

      </section>

    </Layout>
  );
}