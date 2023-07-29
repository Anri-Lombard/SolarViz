install:
	cd frontend && npm install
	cd backend && source venv/bin/activate && pip install -r requirements.txt

client:
	cd frontend && npm run dev

server:
	cd backend && source venv/bin/activate && python manage.py runserver
