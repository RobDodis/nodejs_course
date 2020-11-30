include .env

.PHONY: run-db-image
run-db-image:
	@ echo "start"
	@ docker run --name db-container -e POSTGRES_DB=$(DB_NAME) -e POSTGRES_USER=$(DB_USER) -e POSTGRES_PASSWORD=$(DB_PASSWORD) -p $(DB_PORT):$(DB_PORT) -d postgres:11.5
	@ echo "finish"

.PHONY: drop-db
drop-db:
	@ docker exec -it db-container psql -U $(DB_USER) -d postgres -c "DROP DATABASE $(DB_NAME);"

.PHONY: create-db
create-db:
	@ docker exec -it db-container psql -U $(DB_USER) -d postgres -c "CREATE DATABASE $(DB_NAME);"

.PHONY: setup-db-data
setup-db-data:
	@ npx sequelize-cli db:migrate
	@ npx sequelize-cli db:seed:all

.PHONY: reset-db
reset-db: drop-db create-db setup-db-data
	@ echo "db reset successfully"

.PHONY: start-db-container
start-db-container:
	@ docker start db-container

.PHONY: stop-db-container
stop-db-container:
	@ docker stop db-container