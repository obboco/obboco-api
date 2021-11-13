.PHONY: list
list:
	@echo ""
	@echo "Useful targets:"
	@echo ""
	@echo "  build            > build local server"
	@echo "  start            > start local server"
	@echo "  restart          > restart local server"
	@echo "  stop             > stop local server"
	@echo "  rebuild          > rebuild local server"
	@echo "  bash             > execute bash"
	@echo "  test             > execute test"

.PHONY: all install tests clean
all: clean install tests

.PHONY: build
build:
	docker-compose -f docker-compose.dev.yml build

.PHONY: start
start:
	docker-compose -f docker-compose.dev.yml up -d --remove-orphans

.PHONY: restart
restart:
	docker-compose -f docker-compose.dev.yml restart

.PHONY: stop
stop:
	docker-compose -f docker-compose.dev.yml stop
	docker-compose -f docker-compose.dev.yml rm -f

.PHONY: rebuild
rebuild:
	docker-compose -f docker-compose.dev.yml stop
	docker-compose -f docker-compose.dev.yml build
	docker-compose -f docker-compose.dev.yml up -d --remove-orphans

.PHONY: bash
bash:
	docker exec -it octomock bash

.PHONY: test
test:
	docker exec -it octomock npm test
