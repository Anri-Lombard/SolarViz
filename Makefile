install:
	cd frontend && npm install
	cd backend && pip install -r requirements.txt

client:
	cd frontend && npm run dev

server:
	cd backend && python3 manage.py runserver
