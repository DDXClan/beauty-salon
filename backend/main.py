from fastapi import FastAPI
from routers import routers
from starlette.middleware.cors import CORSMiddleware
app = FastAPI(title="Beaty Salon API")

app.include_router(routers)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)