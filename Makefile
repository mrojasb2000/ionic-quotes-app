SHELL := /bin/bash
.DEFAULT_GOAL := help

APP_NAME := quotes-app

.PHONY: help install serve serve-lab build build-dev watch test test-services test-pages test-watch lint clean clean-node clean-angular cap-sync cap-copy-ios cap-copy-android cap-open-ios cap-open-android

help:
	@echo "Comandos disponibles para $(APP_NAME):"
	@echo "  make install         - Instalar dependencias"
	@echo "  make serve           - Levantar Ionic en desarrollo"
	@echo "  make serve-lab       - Levantar Ionic con vista mobile lab"
	@echo "  make build           - Build de produccion"
	@echo "  make build-dev       - Build de desarrollo"
	@echo "  make watch           - Build en modo watch"
	@echo "  make test            - Ejecutar pruebas unitarias"
	@echo "  make test-services   - Ejecutar solo tests de servicios"
	@echo "  make test-pages      - Ejecutar solo tests de paginas"
	@echo "  make test-watch      - Ejecutar pruebas en watch"
	@echo "  make lint            - Ejecutar linter"
	@echo "  make clean           - Limpiar artefactos de build"
	@echo "  make clean-node      - Eliminar node_modules"
	@echo "  make clean-angular   - Limpiar cache de Angular"
	@echo "  make cap-sync        - Sincronizar proyecto Capacitor"
	@echo "  make cap-copy-ios    - Copiar web assets a iOS"
	@echo "  make cap-copy-android - Copiar web assets a Android"
	@echo "  make cap-open-ios    - Abrir proyecto en Xcode"
	@echo "  make cap-open-android - Abrir proyecto en Android Studio"

install:
	npm install

serve:
	ionic serve

serve-lab:
	ionic serve --lab

build:
	npm run build

build-dev:
	npm run build -- --configuration development

watch:
	npm run watch

test:
	npm test -- --watch=false --browsers=ChromeHeadless

test-services:
	npm test -- --watch=false --browsers=ChromeHeadless --include=src/app/services/**/*.spec.ts

test-pages:
	npm test -- --watch=false --browsers=ChromeHeadless --include=src/app/**/*.page.spec.ts

test-watch:
	npm test

lint:
	npm run lint

clean:
	rm -rf www .angular/cache coverage

clean-node:
	rm -rf node_modules

clean-angular:
	rm -rf .angular/cache

cap-sync:
	npx cap sync

cap-copy-ios:
	npx cap copy ios

cap-copy-android:
	npx cap copy android

cap-open-ios:
	npx cap open ios

cap-open-android:
	npx cap open android
