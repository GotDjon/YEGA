import Link from "next/link";
import { RegisterForm } from "./register-form";

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-green-dark px-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-xl">
        <h1 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-brand-green-dark">
          Créer un compte
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Ouvrez votre espace client YEGA en quelques secondes.
        </p>

        <RegisterForm />

        <p className="mt-6 text-center text-sm text-gray-500">
          Déjà un compte ?{" "}
          <Link href="/login" className="font-medium text-brand-green">
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  );
}
