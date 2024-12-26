# Setup proyecto

```bash
npm create vite@latest

# 1. Escribir el nombre del proyecto
# 2. Seleccionar la opción "react"
# 3. Seleccionar la opción "typescript"

# Cambiar al directorio del proyecto
cd nombre_proyecto

# Instalar dependencias
npm install

# Iniciar el servidor de desarrollo
npm run dev
```

## Añadir Tailwind CSS

```bash
npm install -D tailwindcss@latest postcss@latest autoprefixer@latest
npx tailwindcss init -p
```

Modificar el archivo `tailwind.config.js` para que se vea de la siguiente manera:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

Modificar el archivo `index.css` para que se vea de la siguiente manera:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

body,
#root {
  height: 100vh;
}
```
