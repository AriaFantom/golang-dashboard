SHELL := /bin/bash

# Paths
ROOT_DIR := $(abspath $(dir $(lastword $(MAKEFILE_LIST)))/..)
WEB_DIR := $(ROOT_DIR)/web
DEPLOY_DIR := $(ROOT_DIR)/deployment

# Runtime
PORT ?= 3000
NODE_ENV ?= production
NPM := npm

.PHONY: help install dev build start deploy start-deploy clean

help:
	@echo "Available targets:"
	@echo "  install        Install web dependencies (uses npm ci if lockfile exists)"
	@echo "  dev            Run Next.js in dev mode (Turbopack)"
	@echo "  build          Build the Next.js app"
	@echo "  start          Start the Next.js production server from web/"
	@echo "  deploy         Build and package into $(DEPLOY_DIR)/ for deployment"
	@echo "  start-deploy   Start the packaged server from $(DEPLOY_DIR)/"
	@echo "  clean          Remove build and deployment artifacts"

install:
	cd $(WEB_DIR) && if [ -f package-lock.json ]; then $(NPM) ci; else $(NPM) install; fi

dev:
	cd $(WEB_DIR) && $(NPM) run dev

build:
	cd $(WEB_DIR) && $(NPM) run build

start:
	cd $(WEB_DIR) && $(NPM) run start -- -p $(PORT)

# Requires next.config.mjs to set: output: 'standalone'
# Produces a self-contained bundle with server.js in $(DEPLOY_DIR)/
deploy: build
	rm -rf $(DEPLOY_DIR)
	mkdir -p $(DEPLOY_DIR)/.next $(DEPLOY_DIR)/public
	cp -r $(WEB_DIR)/.next/standalone/* $(DEPLOY_DIR)/
	mkdir -p $(DEPLOY_DIR)/.next
	cp -r $(WEB_DIR)/.next/static $(DEPLOY_DIR)/.next/
	if [ -d "$(WEB_DIR)/public" ]; then cp -r $(WEB_DIR)/public $(DEPLOY_DIR)/; fi
	@echo "Deployment bundle created in $(DEPLOY_DIR)/"

start-deploy: deploy
	cd $(DEPLOY_DIR) && NODE_ENV=$(NODE_ENV) PORT=$(PORT) node server.js

clean:
	rm -rf $(WEB_DIR)/.next $(DEPLOY_DIR)
