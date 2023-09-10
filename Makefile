install:
	cd frontend && npm install
	cd backend && pip install -r requirements.txt

client:
	cd frontend && npm run dev

server:
	cd backend && python3 manage.py runserver

server-test:
	cd backend && python3 manage.py test

migrate:
	cd backend && python3 manage.py makemigrations
	cd backend && python3 manage.py migrate
