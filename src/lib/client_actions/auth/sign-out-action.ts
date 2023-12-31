import { errorToastOptions } from "@/lib/customToastOptions";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { toast } from "react-toastify";

export async function signOutSupabase() {
  const supabase = createClientComponentClient();
  await supabase.auth
    .signOut()
    .then((data) => {
      if (data.error) throw data.error;
    })
    .catch((error) => toast.error(error, errorToastOptions));
}
