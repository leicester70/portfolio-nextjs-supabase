import { UserCredentials } from "@/lib/interfaces/UserCredentials";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { AuthResponse } from "@supabase/supabase-js";
import { toast } from "react-toastify";

export async function signUpWithSupabaseAction(
  { email, password }: UserCredentials,
  name: string
) {
  const supabase = createClientComponentClient();
  await supabase.auth
    .signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    })
    .then((authResponse: AuthResponse) => {
      if (authResponse.error) throw authResponse.error;
    })
    .catch((error) => toast.error(`${error}`));
}
