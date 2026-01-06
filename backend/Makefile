.PHONY: help install start dev build run clean air-install

help: ## Show this help message
	@echo 'Usage: make [target]'
	@echo ''
	@echo 'Available targets:'
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2}'

install: ## Install Go dependencies
	go mod download
	go mod tidy

air-install: ## Install Air for live reloading
	go install github.com/air-verse/air@latest

start: ## Start the server with Air (live reload)
	@command -v air >/dev/null 2>&1 || { echo "Air not found in PATH, using full path..."; }
	@if command -v air >/dev/null 2>&1; then \
		air; \
	else \
		$$(go env GOPATH)/bin/air; \
	fi

dev: start ## Alias for start (runs with Air)

build: ## Build the application
	go build -o ./tmp/main .

run: ## Run the application without Air
	go run main.go

clean: ## Clean temporary files and build artifacts
	rm -rf ./tmp
	rm -f build-errors.log

get: ## Get a specific package (usage: make get PKG=package_name)
	@if [ -z "$(PKG)" ]; then \
		echo "Error: PKG variable not set. Usage: make get PKG=package_name"; \
		exit 1; \
	fi
	go get $(PKG)
	go mod tidy
