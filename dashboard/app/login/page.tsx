import { LoginForm } from "@/containers/login";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Üye Girişi</h1>
          <p className="text-muted-foreground mt-2">
            Sinema Admin Paneline Hoş Geldiniz
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
