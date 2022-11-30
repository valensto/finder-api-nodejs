include .env
export 

NETWORKS="$(shell docker network ls)"
VOLUMES="$(shell docker volume ls)"
SUCCESS=[ done "\xE2\x9C\x94" ]

.PHONY: --mongo-volume
--mongo-volume:
ifeq (,$(findstring mongo-finder-volume,$(NETWORKS)))
	@echo [ creating mongo volume... ]
	docker volume create mongo-finder-volume
	@echo $(SUCCESS)
endif

.PHONY: --redis-volume
--redis-volume:
ifeq (,$(findstring redis-finder-volume,$(NETWORKS)))
	@echo [ creating redis volume... ]
	docker volume create redis-finder-volume
	@echo $(SUCCESS)
endif

.PHONY: mongodb
## start MongoDB
mongodb: down --mongo-volume --redis-volume
	@docker compose up -d finder-mongodb finder-mongoadmin

.PHONY: all
all: mongodb
	@npm run dev

.PHONY: down
## stop and remove containers, networks, images, and volumes
down:
	@docker compose down

.PHONY: clear
## stop and remove containers, networks, images, and volumes
clear: down
	@docker volume prune -f

GREEN  := $(shell tput -Txterm setaf 2)
YELLOW := $(shell tput -Txterm setaf 3)
WHITE  := $(shell tput -Txterm setaf 7)
RESET  := $(shell tput -Txterm sgr0)

TARGET_MAX_CHAR_NUM=20
## Show help
help:
	@echo ''
	@echo 'Usage:'
	@echo '  ${YELLOW}make${RESET} ${GREEN}<target>${RESET}'
	@echo ''
	@echo 'Targets:'
	@awk '/^[a-zA-Z\-\_0-9]+:/ { \
        helpMessage = match(lastLine, /^## (.*)/); \
        if (helpMessage) { \
            helpCommand = substr($$1, 0, index($$1, ":")-1); \
            helpMessage = substr(lastLine, RSTART + 3, RLENGTH); \
            printf "  ${YELLOW}%-$(TARGET_MAX_CHAR_NUM)s${RESET} ${GREEN}%s${RESET}\n", helpCommand, helpMessage; \
        } \
    } \
    { lastLine = $$0 }' $(MAKEFILE_LIST)