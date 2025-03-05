if (!process.env.CLERK_ISSUE_URL) {
  throw new Error("Clerk Issue URL is missing");
}

const authConfig = {
  providers: [
    {
      domain: process.env.CLERK_ISSUE_URL,
      applicationID: "convex",
    },
  ],
};

export default authConfig;
