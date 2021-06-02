.PHONY: start stop rm restart cprune build help

RED=\033[0;31m
GREEN=\033[0;32m
YELLOW=\033[1;33m
NC=\033[0m # No Color

start:
	$(info Make: Starting backend container in background...)
	@docker start donut-back-cont || docker run -d --name donut-back-cont -p 3000:3000 donut-back 2> /dev/null \
	&& echo "${GREEN}Started backend container${NC}"

stop:
	$(info Make: Stopping running backend container...)
	@docker stop donut-back-cont \
	&& echo "${GREEN}Stopped backend container${NC}" \
	|| echo "${YELLOW}Can't stop container - Container does not exist${NC}"

rm:
	$(info Make: Removing stopped backend service container...)
	@docker container rm donut-back-cont \
	&& echo "${GREEN}Removed backend container${NC}" \
	|| echo "${RED}Failed to remove container${NC}"

restart:
	$(info Make: Restarting backend container...)
	@make -s stop
	@make -s start

cprune:
	$(info Make: Stopping and removing container(s) of backend image...)
	@docker container rm $$(docker stop $$(docker ps -a -q --filter ancestor=donut-back --format="{{.ID}}")) \
	&& echo "${GREEN}Removed all running and stopped containers of donut-back image${NC}" \
	|| echo "${YELLOW}Can't remove containers as there are none to remove${NC}"

build:
	$(info Make: Building backend image...)
	@docker build -t donut-back . \
	&& echo "${GREEN}Built backend image: donut-back${NC}" \
	|| echo "${RED}Error: Failed to build backend image${NC}"

help: ## show help
	@echo ''
	@echo 'Usage: make [TARGET] [EXTRA_ARGUMENTS]'
	@echo 'Targets:'
	@echo '  start              start backend container in background. Default make command.'
	@echo '  stop               stop backend container'
	@echo '  rm                 remove backend container'
	@echo '  restart            restart backend container'
	@echo '  cprune             removes donut-backend containers'
	@echo '  build              builds donut-backend image'
	@echo '  help               show help'
	@echo ''
