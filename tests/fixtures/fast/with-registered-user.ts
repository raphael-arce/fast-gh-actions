import { test as baseTest } from "@playwright/test";
import { supabaseAdminClient } from "../supabase";

type WithRegisteredUser = {
  account: {
    email: string;
    password: string;
    id: string;
  };
};

export const withRegisteredUser = baseTest.extend<WithRegisteredUser>({
  account: [
    async ({}, use) => {
      const email = `${crypto.randomUUID()}@example.com`;
      const password = "123456";

      const { data, error: createUserError } =
        await supabaseAdminClient.auth.admin.createUser({
          email,
          password,
          email_confirm: true,
        });

      baseTest.expect(createUserError).toBeNull();
      baseTest.expect(data).toBeDefined();

      if (createUserError) {
        throw new Error(`Failed to create user: ${createUserError.message}`);
      }

      const id = data.user.id;

      await use({ email, password, id });

      await cleanup(id);
    },
    { scope: "test", auto: true },
  ],
});

async function cleanup(id: string) {
  const { error: deleteUserError } =
    await supabaseAdminClient.auth.admin.deleteUser(id);
  //   // Ignore "User not found" error as it means the user was already deleted
  //   if (deleteUserError?.message !== "User not found") {
  //     baseTest.expect(deleteUserError).toBeNull();
  //   }
}
