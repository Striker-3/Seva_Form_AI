from fastapi import APIRouter
from pydantic import BaseModel
from ai.nlp import get_chat_response

router = APIRouter()

class ChatRequest(BaseModel):
    message: str

@router.post("/chat")
async def chat_endpoint(request: ChatRequest):
    response_text = get_chat_response(request.message)
    return {"response": response_text}
