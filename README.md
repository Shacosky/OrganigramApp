# OrganigramApp

Aplicación web para crear organigramas de la empresa con un estilo moderno y animaciones.

## Requisitos
- Node.js 20 o superior

## Instalación
```bash
npm install
```

## Puesta en marcha
Inicia el servidor ejecutando:
```bash
npm start
```
Abre `http://localhost:3000` en tu navegador y comienza a añadir empleados desde el formulario.

La información se almacena solo en memoria, por lo que se perderá al detener el servidor.

## Desarrollo con VS Code
1. Abre la carpeta del proyecto en VS Code.
2. Ejecuta `npm install` la primera vez.
3. Usa `npm run dev` para recarga automática o `npm start` para un inicio normal.
4. Edita los archivos dentro de `public/` para modificar la interfaz.

## Características
- Formulario para registrar empleados y asignarles jefe directo.
- Visualización interactiva del organigrama con **d3-org-chart**.
- Diseño vibrante basado en Bootstrap y animaciones CSS.


