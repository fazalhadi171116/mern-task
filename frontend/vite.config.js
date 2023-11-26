import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

//https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],server:{port:88}
})


// export default {
//   server: {
//     port: 88,
//   },
// };
