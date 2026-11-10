import "server-only";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
/** Infrastructure only. No private route is enabled by this client. */
export async function createSupabaseServerClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key)
    throw new Error(
      "Supabase no está configurado. El acceso privado permanece deshabilitado.",
    );
  const store = await cookies();
  return createServerClient(url, key, {
    cookies: {
      getAll: () => store.getAll(),
      setAll: (values) => {
        for (const { name, value, options } of values)
          store.set(name, value, options);
      },
    },
  });
}
