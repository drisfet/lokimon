/** @type {import('next').NextConfig} */
import withPWA from 'next-pwa';

const nextConfig = {
    output: 'export',
    distDir: 'dist',
    images: {
        unoptimized: true
    },
    // Set environment variables to control file watching behavior
    env: {
        // Control file watching to avoid system file errors
        NEXT_WATCH_IGNORE_PATTERNS: JSON.stringify([
            '**/System Volume Information/**',
            '**/pagefile.sys',
            '**/DumpStack.log.tmp',
            '**/hiberfil.sys',
            '**/swapfile.sys',
            '**/node_modules/**',
            '**/.git/**',
            '**/.next/**',
            '**/dist/**',
            '**/.cache/**',
            '**/coverage/**',
            '**/.vscode/**',
            '**/.idea/**',
            '**/.DS_Store',
            '**/Thumbs.db',
            '**/desktop.ini',
            '**/$RECYCLE.BIN/**',
        ]),
    },
    // Use correct serverExternalPackages option
    serverExternalPackages: [],
    // Only ignore specific system files that cause errors, keep file watching functional
    webpack: (config, { dev, isServer }) => {
        if (dev && !isServer) {
            config.watchOptions = {
                aggregateTimeout: 300,
                poll: 1000,
                ignored: process.env.NEXT_WATCH_IGNORE_PATTERNS
                    ? JSON.parse(process.env.NEXT_WATCH_IGNORE_PATTERNS)
                    : [
                        '**/node_modules/**',
                        '**/.git/**',
                        '**/.next/**',
                        '**/dist/**',
                        '**/.cache/**',
                        '**/coverage/**',
                        '**/.vscode/**',
                        '**/.idea/**',
                        '**/.DS_Store',
                        '**/Thumbs.db',
                        '**/desktop.ini',
                        '**/$RECYCLE.BIN/**',
                    ],
            };
        }
        return config;
    }
};

export default withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  fallbacks: {
    document: '/offline',
  },
})(nextConfig);
