import { UserCredentials } from "@/interface/UserCredentials";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { AuthResponse } from "@supabase/supabase-js";

export async function signinWithSupabaseAction({
  email,
  password,
}: UserCredentials) {
  const supabase = createClientComponentClient();
  await supabase.auth
    .signInWithPassword({ email, password })
    .then((authResponse: AuthResponse) => {
      if (authResponse.error) throw authResponse.error;
    })
    .catch((error) => {
      return error;
    });
}
