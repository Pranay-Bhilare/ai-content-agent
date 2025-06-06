import type { NextConfig } from "next";
import { hostname } from "os";

const nextConfig: NextConfig = {
  /* config options here */
  images : {
    remotePatterns : [{
      hostname : "i.ytimg.com",
      protocol : "https"
    },
    {
      hostname: "yt3.ggpht.com",
      protocol: "https"
  }]
  }
};

export default nextConfig;
