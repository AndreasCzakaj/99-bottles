import path from 'path'

export default {
  test: {
    globals: true,
    //environment: 'jsdom',
  },
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, './src'),
      '@test': path.resolve(__dirname, './test'),
    },
  },
}
