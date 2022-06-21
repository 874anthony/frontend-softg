# SoftgFrontend

## Instructivos para correr la aplicación:

- Instalar los **_node_modules_** con el comando `npm i`
- Correr `npm start` en la CLI cuando se encuentre ubicado dentro del folder del proyecto.

## Breve explicación de lo que hace el aplicativo:

- La aplicación simula un **Admin Panel** o un **Dashboard** en el cuál podrá navegar a través del sidebar.
- La aplicación fue construida con SCSS custom (diseñado por mí) y con objetos particulares de Angular Material cómo lo requería la prueba.
- La aplicación maneja un (1) solo BehaviorSubject para simular la sesión de un usuario conectado.

## Básica estructuración de folders.

| Folder   | Explicacion                                                                     |
| -------- | ------------------------------------------------------------------------------- |
| Auth     | Aquí va todo lo relacionado a la autenticación de la app.                       |
| Core     | Aquí va todo aquello que sea común y necesario para el funcionamiento de la app |
| Material | Módulo para los componentes de Angular Material y tenerlo centralizado          |
| Pages    | Las páginas de la aplicación                                                    |
