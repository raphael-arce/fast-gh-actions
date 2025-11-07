import type { Session } from "@supabase/supabase-js";
import { create } from "zustand";
import { supabaseClient } from "../api/supabase-client";

type SessionStore = {
  session: Session | null | undefined;
};

export const useSession = create<SessionStore>()(() => ({
  session: undefined,
}));

supabaseClient.auth.onAuthStateChange((_, session) => {
  useSession.setState({ session });
});

supabaseClient.auth.getSession().then(({ data }) => {
  useSession.setState({ session: data.session });
});
