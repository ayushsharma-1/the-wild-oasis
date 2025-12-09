import Link from "next/link";

export const metadata = {
  title: "Login",
};

export default function Page() {
  return (
    <div className="flex flex-col gap-10 mt-10 items-center">
      <h2 className="text-3xl font-semibold">
        Authentication Removed
      </h2>
      <p className="text-lg text-primary-200">
        This application no longer requires authentication. All features are now publicly accessible.
      </p>
      <Link href="/cabins" className="bg-accent-500 px-8 py-4 text-primary-800 text-lg font-semibold hover:bg-accent-600 transition-all">
        Browse Cabins
      </Link>
    </div>
  );
}
