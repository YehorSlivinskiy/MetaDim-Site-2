import LoginForm from "./LoginForm";

export const metadata = { title: "Вхід — MetaDim Admin" };

export default function AdminLoginPage({
  searchParams,
}: {
  searchParams?: { next?: string };
}) {
  return (
    <main className="min-h-[100dvh] bg-zinc-950 flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="mb-10 text-center">
          <h1 className="font-display font-semibold text-zinc-100 text-2xl tracking-tight">
            MetaDim <span className="text-gold">Admin</span>
          </h1>
          <p className="text-zinc-500 text-sm mt-2">Увійдіть, щоб керувати сайтом</p>
        </div>
        <LoginForm next={searchParams?.next ?? "/admin"} />
      </div>
    </main>
  );
}
