// backend/makeAdmin.js

import { Clerk } from "@clerk/clerk-sdk-node";
import dotenv from "dotenv";
dotenv.config();

const clerk = Clerk({ secretKey: process.env.CLERK_SECRET_KEY });

async function makeAdmin() {
  const userId = "user_2ym0GJphugEsbpestMw1TvTEyKx"; // your user ID

  try {
    await clerk.users.updateUserMetadata(userId, {
      publicMetadata: {
        isAdmin: true,
      },
    });
    console.log("✅ Admin role set successfully!");
  } catch (error) {
    console.error("❌ Failed to set admin role:", error.message);
  }
}

makeAdmin();
