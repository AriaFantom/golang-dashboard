SHELL := /bin/bash

# Paths
ROOT_DIR := $(abspath $(dir $(lastword $(MAKEFILE_LIST)))/..)
WEB_DIR := $(ROOT_DIR)/web
DEPLOY_DIR := $(ROOT_DIR)/deployment

# Runtime
PORT ?= 3000
NODE_ENV ?= production
NPM := npm

.PHONY: install dev db-up db-down db-logs db-status db-psql


install:
	cd $(WEB_DIR) && if [ -f package-lock.json ]; then $(NPM) ci; else $(NPM) install; fi

dev:
	cd $(WEB_DIR) && $(NPM) run dev

# --- Postgres (Docker Compose) helpers ---
compose-up:
	cd $(DEPLOY_DIR) && docker compose up -d
