import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/layout/Layout";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      setLoading(false);

      if (!response.ok) {
        toast({
          title: "Login failed",
          description: data.error || "Invalid credentials",
          variant: "destructive"
        });
        return;
      }

      // store user locally
      localStorage.setItem("user_id", data.user_id);
      localStorage.setItem("token", data.token);

      toast({ title: "Welcome back!" });
      navigate("/");

    } catch (error) {
      setLoading(false);
      toast({
        title: "Login failed",
        description: "Server error",
        variant: "destructive"
      });
    }
  };

  return (
    <Layout>
      <section className="min-h-[80vh] flex items-center justify-center py-20">
        <div className="w-full max-w-md mx-auto p-8">
          <h1 className="font-display text-3xl font-bold text-foreground text-center mb-2">
            Welcome Back
          </h1>
          <p className="font-body text-muted-foreground text-center mb-8">
            Sign in to your account
          </p>

          <form onSubmit={handleLogin} className="space-y-5">
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

            <div>
              <Label className="font-body">Password</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 font-body"
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-6 text-center font-body text-sm text-muted-foreground space-y-2">
            <p>
              Don't have an account?{" "}
              <Link to="/signup" className="text-secondary hover:underline">
                Sign up
              </Link>
            </p>

            <Link
              to="/forgot-password"
              className="text-secondary hover:underline block"
            >
              Forgot password?
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}