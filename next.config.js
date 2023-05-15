
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // output: { path: path.resolve(__dirname, 'static'), },
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.pdf/,
      type: 'asset/resource',
      generator: {
        filename: 'static/[hash][ext]',
      },
    })

    return config
},
}

module.exports = nextConfig
