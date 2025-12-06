from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field
from typing import Optional
import os
import sys
import logging
import time
from datetime import datetime

# Add the src directory to the path so we can import our modules
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

from agents.physical_ai_expert_agent import PhysicalAIEngineerAgent
from agents.tools.qdrant_retrieval_tool import QdrantRetrievalTool

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

app = FastAPI()

class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=2000, description="The user's question")
    selected_text: Optional[str] = Field(None, max_length=2000, description="Selected text context")

@app.middleware("http")
async def add_process_time_header(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    response.headers["X-Process-Time"] = str(process_time)
    logger.info(f"Request processed in {process_time:.2f}s")
    return response

@app.get("/")
async def root():
    return {"message": "Welcome to the Physical AI & Humanoid Robotics Textbook Backend!"}

@app.post("/api/chat")
async def chat(request: ChatRequest):
    try:
        logger.info(f"Received chat request: {request.message[:100]}{'...' if len(request.message) > 100 else ''}")

        # Validate input
        if not request.message.strip():
            raise HTTPException(status_code=400, detail="Message cannot be empty")

        # Initialize the agent
        agent = PhysicalAIEngineerAgent()

        # Prepare context based on selected text and query
        context = ""
        if request.selected_text:
            logger.info(f"Processing with selected text context: {request.selected_text[:100]}{'...' if len(request.selected_text) > 100 else ''}")
            context = f"User is asking about this specific text: '{request.selected_text}'. "

        context += f"User question: {request.message}"

        # Use the agent to generate a response based on book content
        response = agent.process_query(context)

        logger.info(f"Successfully processed chat request, response length: {len(response)}")

        return {"response": response}
    except HTTPException:
        # Re-raise HTTP exceptions as they are
        raise
    except Exception as e:
        logger.error(f"Unexpected error processing chat request: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail="Internal server error. Please try again later.")

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error(f"Global exception: {str(exc)}", exc_info=True)
    return JSONResponse(
        status_code=500,
        content={"detail": "Internal server error. Please try again later."}
    )
