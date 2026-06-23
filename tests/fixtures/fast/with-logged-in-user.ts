import { Session } from "@supabase/supabase-js";
import { test as baseTest } from "@playwright/test";
import { supabaseAnonClient } from "../supabase";
import { withRegisteredUser } from "./with-registered-user";

type WithLoggedInUser = {
  session: Session;
};

export const withLoggedInUser = withRegisteredUser.extend<WithLoggedInUser>({
  session: [
    async ({ account }, use) => {
      const { email, password } = account;

      const { data, error } = await supabaseAnonClient.auth.signInWithPassword({
        email,
        password,
      });

      baseTest.expect(error).toBeNull();
      baseTest.expect(data).toBeDefined();

      if (error) {
        throw new Error(`Failed to sign in: ${error.message}`);
      }

      await use(data.session);
    },
    { scope: "test", auto: true },
  ],

  page: async ({ page, session }, use) => {
    await page.addInitScript((session) => {
      window.localStorage.setItem(
        "sb-127-auth-token", // -> browser localStorage key used by a local supabase instance
        JSON.stringify(session),
      );
    }, session);

    await use(page);
  },
});
