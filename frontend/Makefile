.PHONY: start stop rm restart cprune build help

RED=\033[0;31m
GREEN=\033[0;32m
YELLOW=\033[1;33m
NC=\033[0m # No Color

start:
	$(info Make: Starting frontend container in background...)
	@docker start donut-front-cont || docker run -d --name donut-front-cont -p 80:80 donut-front 2> /dev/null \
	&& echo "${GREEN}Started frontend container${NC}"

stop:
	$(info Make: Stopping running frontend container...)
	@docker stop donut-front-cont \
	&& echo "${GREEN}Stopped frontend container${NC}" \
	|| echo "${YELLOW}Can't stop container - Container does not exist${NC}"

rm:
	$(info Make: Removing stopped frontend service container...)
	@docker container rm donut-front-cont \
	&& echo "${GREEN}Removed frontend container${NC}" \
	|| echo "${RED}Failed to remove container${NC}"

restart:
	$(info Make: Restarting frontend container...)
	@make -s stop
	@make -s start

cprune:
	$(info Make: Stopping and removing container(s) of frontend image...)
	@docker container rm $$(docker stop $$(docker ps -a -q --filter ancestor=donut-front --format="{{.ID}}")) \
	&& echo "${GREEN}Stopped and removed all containers of donut-front image${NC}" \
	|| echo "${YELLOW}Can't remove containers as there are none to remove${NC}"

build:
	$(info Make: Building frontend image...)
	@docker build -t donut-front . \
	&& echo "${GREEN}Built frontend image: donut-front${NC}" \
	|| echo "${RED}Error: Failed to build frontend image${NC}"

help: ## show help
	@echo ''
	@echo 'Usage: make [TARGET] [EXTRA_ARGUMENTS]'
	@echo 'Targets:'
	@echo '  start              start frontend container in background. Default make command.'
	@echo '  stop               stop frontend container'
	@echo '  rm                 remove frontend container'
	@echo '  restart            restart frontend container'
	@echo '  cprune             removes donut-frontend containers'
	@echo '  build              builds donut-frontend image'
	@echo '  help               show help'
	@echo ''
