# Build all services
install:
	docker-compose build

# Start all services
up:
	docker-compose up

# Stop all services
down:
	docker-compose down

# View logs
logs:
	docker-compose logs

# Open a shell in the frontend container
frontend-shell:
	docker-compose exec frontend /bin/sh

# Open a shell in the backend container
backend-shell:
	docker-compose exec backend /bin/sh

safe-clean:
	@echo "Safely reclaiming disk space..."
	docker container prune -f
	docker image prune -f
	docker volume prune -f
	docker network prune -f
