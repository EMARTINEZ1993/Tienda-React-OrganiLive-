# Tienda de Productos Organicos

Aplicacion web hecha con React + Vite para mostrar productos organicos, filtrar catalogo, gestionar carrito y enviar mensajes de contacto con integracion a Google Sheets.

## Funcionalidades principales

- Catalogo de productos cargado desde Google Sheets (CSV publico).
- Busqueda, filtros por categoria y ordenamiento por nombre/precio/stock.
- Paginacion de productos.
- Carrito de compras con contexto global.
- Flujo de usuario basico: registro, login y gestion de perfil.
- Formulario de contacto con envio a Google Apps Script.

## Stack tecnologico

- React 19
- Vite 7
- React Router DOM 7 (`HashRouter`)
- Tailwind CSS 4
- React Icons

## Requisitos

- Node.js 18 o superior (recomendado: LTS actual)
- npm 9 o superior

## Instalacion

```bash
npm install
```

## Variables de entorno

Crea o actualiza el archivo `.env` en la raiz del proyecto con estas variables:

```env
VITE_PHONE_NUMBER=573001112233
VITE_EMAIL=tu-correo@dominio.com
VITE_ADDRESS=Tu direccion
VITE_WHATSAPP_NUMERO=573001112233
VITE_GOOGLE_SHEET_ENDPOINT=https://docs.google.com/spreadsheets/d/TU_SHEET_ID/edit?usp=sharing
```

Notas:
- `VITE_GOOGLE_SHEET_ENDPOINT` debe apuntar a una hoja publicada o accesible para exportar CSV.
- El formulario de contacto usa un Web App de Google Apps Script definido en `src/utils/googleSheetsService.js`.

## Scripts disponibles

```bash
npm run dev      # Inicia servidor de desarrollo
npm run build    # Genera build de produccion
npm run preview  # Previsualiza build localmente
npm run lint     # Ejecuta ESLint
```

## Ejecucion local

```bash
npm run dev
```

Luego abre la URL que muestra Vite en consola (normalmente `http://localhost:5173`).

## Estructura del proyecto

```text
src/
  components/         # UI principal (catalogo, carrito, header, footer, contacto)
  context/            # Estados globales (carrito y usuario)
  Pages/              # Vistas de navegacion (login, registro, perfil, etc.)
  utils/              # Servicios de integracion (Google Sheets)
  App.jsx             # Rutas y composicion general
  main.js             # Punto de entrada
```

## Integracion con Google Sheets

1. Se toma el ID de la hoja desde `VITE_GOOGLE_SHEET_ENDPOINT`.
2. Se construye URL de exportacion CSV.
3. Se parsea el CSV y se transforma a productos.
4. Si falla la carga, se usan datos de ejemplo como respaldo.

Campos sugeridos en la hoja:
- `nombre` o `producto`
- `precio`
- `stock` o `cantidad`
- `descripcion`
- `categoria`
- `imagen`

## Despliegue

Como el proyecto usa `HashRouter`, funciona bien en hosting estatico (por ejemplo GitHub Pages) sin configuracion extra de rewrites para rutas internas.
