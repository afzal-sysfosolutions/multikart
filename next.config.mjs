/** @type {import('next').NextConfig} */

const nextConfig = {
  // basePath: "/Multikart/userarea",
  // assetPrefix: "/Multikart/userarea",
  env: {
    storageURL: process.env.NEXT_PUBLIC_STORAGE_URL ||  "http://localhost:3000" ,
  },

  images: {
    domains: ["122.160.25.202"],  // 👈 accessing image from api source
    remotePatterns: [
      {
        protocol: "http",
        hostname: "127.0.0.1",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
  },
  module: {
    rules: [
      { test: /\.(ts|tsx|jsx)$/, loader: "ts-loader" },
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
      {
        test: /\.(gif|svg|jpg|png|mp3)$/,
        use: ["file-loader"],
      },
    ],
  },
  experimental:{
    missingSuspenseWithCSRBailout:false
  }
  // other boilerplate config goes down here
};

export default nextConfig;




