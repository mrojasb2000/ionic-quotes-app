# Quotes App (Ionic + Angular)

Aplicación móvil/web para gestionar citas (quotes) con almacenamiento local en SQLite.

## Descripción

El proyecto permite:

1. Mostrar una cita aleatoria en la pantalla de inicio.
2. Crear y eliminar citas.
3. Configurar si se permite eliminar desde Home.
4. Persistir datos localmente usando SQLite en nativo y jeep-sqlite + IndexedDB en web.

## Stack técnico

1. Ionic 8 + Angular 20 (standalone components)
2. Capacitor 8
3. SQLite: @capacitor-community/sqlite
4. Persistencia de settings: @capacitor/preferences
5. Testing: Jasmine + Karma

Dependencias principales en [package.json](package.json).

## Arquitectura principal

### Rutas

Rutas definidas en [src/app/app.routes.ts](src/app/app.routes.ts):

1. / -> Home
2. /quotes -> CRUD de citas
3. /settings -> Preferencias

### Páginas clave

1. Home: [src/app/home/home.page.ts](src/app/home/home.page.ts)
   Muestra cita aleatoria y acción opcional de eliminar.

2. Quotes: [src/app/quotes/quotes.page.ts](src/app/quotes/quotes.page.ts)
   Formulario reactivo para crear citas y listado para eliminar.

3. Settings: [src/app/settings/settings.page.ts](src/app/settings/settings.page.ts)
   Toggle para habilitar/deshabilitar borrado desde Home.

### Servicios clave

1. SQLite wrapper: [src/app/services/sqlite.services.ts](src/app/services/sqlite.services.ts)
   Inicializa DB, crea tabla quotes y ejecuta operaciones CRUD.

2. Dominio de citas: [src/app/services/quotes.services.ts](src/app/services/quotes.services.ts)
   Orquesta init, seed inicial, obtener aleatoria, agregar y borrar.

3. Preferencias: [src/app/services/settings.services.ts](src/app/services/settings.services.ts)
   Guarda y recupera allowDelete con Capacitor Preferences.

### Modelo

Modelo Quote en [src/app/models/quote.model.ts](src/app/models/quote.model.ts).

## SQLite en Web

Para plataforma web, el componente jeep-sqlite se carga en [src/index.html](src/index.html) y sus assets se copian desde Angular config en [angular.json](angular.json).

Archivos relevantes:

1. Script de jeep-sqlite en [src/index.html](src/index.html)
2. Copia de sql-wasm.wasm en [angular.json](angular.json)
3. Copia de assets de jeep-sqlite en [angular.json](angular.json)

## Pruebas unitarias

### Estado actual de pruebas

Specs existentes:

1. [src/app/home/home.page.spec.ts](src/app/home/home.page.spec.ts)
2. [src/app/quotes/quotes.page.spec.ts](src/app/quotes/quotes.page.spec.ts)
3. [src/app/settings/settings.page.spec.ts](src/app/settings/settings.page.spec.ts)
4. [src/app/services/quotes.services.spec.ts](src/app/services/quotes.services.spec.ts)
5. [src/app/services/settings.services.spec.ts](src/app/services/settings.services.spec.ts)
6. [src/app/app.component.spec.ts](src/app/app.component.spec.ts)

### Cobertura funcional agregada (happy/sad path)

1. HomePage
   Happy: carga de estado inicial y delete con id.
   Sad: fallo de init y delete sin id.

2. QuotesPage
   Happy: carga inicial, add válido, delete con id.
   Sad: add inválido y delete sin id.

3. SettingsPage
   Happy: lectura inicial y toggle en true.
   Sad: toggle en false.

4. QuotesService
   Happy: seed inicial cuando faltan registros, add/delete con refresh.
   Sad: getRandom cuando no hay citas.

5. SettingsService
   Happy: persistencia y parseo de valor almacenado.
   Sad: valor inexistente retorna false.

## Comandos de desarrollo

### NPM scripts

Definidos en [package.json](package.json):

1. npm start
2. npm run build
3. npm run watch
4. npm test
5. npm run lint

### Makefile

Automatización definida en [Makefile](Makefile):

1. make install
2. make serve
3. make serve-lab
4. make build
5. make build-dev
6. make watch
7. make test
8. make test-services
9. make test-pages
10. make test-watch
11. make lint
12. make clean
13. make clean-node
14. make clean-angular
15. make cap-sync
16. make cap-copy-ios
17. make cap-copy-android
18. make cap-open-ios
19. make cap-open-android

## Flujo recomendado

1. Instalar dependencias
   make install

2. Levantar app en desarrollo
   make serve

3. Ejecutar pruebas rápidas por dominio
   make test-services
   make test-pages

4. Ejecutar lint y build antes de push
   make lint
   make build-dev

## Estructura resumida

1. src/app/home -> pantalla principal y cita aleatoria
2. src/app/quotes -> formulario/listado de citas
3. src/app/settings -> preferencias
4. src/app/services -> acceso a datos y reglas de negocio
5. src/app/models -> tipos y contratos

## Notas

1. El proyecto usa componentes standalone en Angular.
2. Para cambios en SQLite web, revisar siempre [src/index.html](src/index.html) y [angular.json](angular.json) en conjunto.
3. Para sincronizar cambios web a nativo, usar make cap-sync.
