import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  agentRules: false,
  transpilePackages: ["livekit-client", "@livekit/components-react", "@livekit/components-core"],
  serverExternalPackages: ["livekit-server-sdk"],
};

export default nextConfig;
