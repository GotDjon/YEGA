import Link from "next/link";
import { LoginForm } from "./login-form";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;

  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-green-dark px-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-xl">
        <h1 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-brand-green-dark">
          Connexion YEGA
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Pilotez vos projets au Cameroun, où que vous soyez.
        </p>

        <LoginForm next={next ?? "/dashboard"} />

        <p className="mt-6 text-center text-sm text-gray-500">
          Pas encore de compte ?{" "}
          <Link href="/register" className="font-medium text-brand-green">
            Créer un compte
          </Link>
        </p>
      </div>
    </div>
  );
}
