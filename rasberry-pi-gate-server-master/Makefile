.PHONY: start stop rm restart cprune build help

RED=\033[0;31m
GREEN=\033[0;32m
YELLOW=\033[1;33m
NC=\033[0m # No Color

start:
	$(info Make: Starting rasberry container in background...)
	@docker start rasberry-cont || docker run -d --name rasberry-cont -p 8000:8000 rasberry 2> /dev/null \
	&& echo "${GREEN}Started rasberry container${NC}"

stop:
	$(info Make: Stopping running rasberry container...)
	@docker stop rasberry-cont \
	&& echo "${GREEN}Stopped rasberry container${NC}" \
	|| echo "${YELLOW}Can't stop container - Container does not exist${NC}"

rm:
	$(info Make: Removing stopped rasberry service container...)
	@docker container rm rasberry-cont \
	&& echo "${GREEN}Removed rasberry container${NC}" \
	|| echo "${RED}Failed to remove container${NC}"

restart:
	$(info Make: Restarting rasberry container...)
	@make -s stop
	@make -s start

cprune:
	$(info Make: Stopping and removing container(s) of rasberry image...)
	@docker container rm $$(docker stop $$(docker ps -a -q --filter ancestor=rasberry --format="{{.ID}}")) \
	&& echo "${GREEN}Stopped and removed all containers of rasberry image${NC}" \
	|| echo "${YELLOW}Can't remove containers as there are none to remove${NC}"

build:
	$(info Make: Building rasberry image...)
	@docker build -t rasberry . \
	&& echo "${GREEN}Built rasberry image: rasberry${NC}" \
	|| echo "${RED}Error: Failed to build rasberry image${NC}"

help: ## show help
	@echo ''
	@echo 'Usage: make [TARGET] [EXTRA_ARGUMENTS]'
	@echo 'Targets:'
	@echo '  start              start rasberry container in background. Default make command.'
	@echo '  stop               stop rasberry container'
	@echo '  rm                 remove rasberry container'
	@echo '  restart            restart rasberry container'
	@echo '  cprune             removes rasberry containers'
	@echo '  build              builds rasberry image'
	@echo '  help               show help'
	@echo ''
