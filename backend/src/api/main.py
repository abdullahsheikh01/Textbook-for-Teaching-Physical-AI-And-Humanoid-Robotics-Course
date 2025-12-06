from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional
import os
import sys
import logging

# Add the src directory to the path so we can import our modules
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

from agents.physical_ai_expert_agent import PhysicalAIEngineerAgent
from agents.tools.qdrant_retrieval_tool import QdrantRetrievalTool

app = FastAPI()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class ChatRequest(BaseModel):
    message: str
    selected_text: Optional[str] = None

@app.get("/")
async def root():
    return {"message": "Welcome to the Physical AI & Humanoid Robotics Textbook Backend!"}

@app.post("/api/chat")
async def chat(request: ChatRequest):
    try:
        logger.info(f"Received chat request: {request.message}")

        # Initialize the agent
        agent = PhysicalAIEngineerAgent()

        # Prepare context based on selected text and query
        context = ""
        if request.selected_text:
            context = f"User is asking about this specific text: '{request.selected_text}'. "

        context += f"User question: {request.message}"

        # Use the agent to generate a response based on book content
        response = agent.process_query(context)

        return {"response": response}
    except Exception as e:
        logger.error(f"Error processing chat request: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error processing request: {str(e)}")
