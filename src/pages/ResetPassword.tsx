import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/layout/Layout";

const API = "/api";

export default function ResetPassword() {

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { toast } = useToast();

  const handleUpdate = async (e: React.FormEvent) => {

    e.preventDefault();
    setLoading(true);

    try {

      const res = await fetch(`${API}/reset-password/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to update password");
      }

      toast({
        title: "Password updated!",
      });

      navigate("/login");

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

          <h1 className="font-display text-3xl font-bold text-foreground text-center mb-8">
            Set New Password
          </h1>

          <form onSubmit={handleUpdate} className="space-y-5">

            <div>
              <Label className="font-body">New Password</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="mt-1"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 font-body"
            >
              {loading ? "Updating..." : "Update Password"}
            </Button>

          </form>

        </div>

      </section>

    </Layout>
  );
}