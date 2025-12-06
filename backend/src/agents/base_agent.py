import openai
from typing import Dict, Any
import logging
import os

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class BaseAIAgent:
    def __init__(self, agent_id: str = "base_ai_agent", agent_parameters: dict = None, **kwargs):
        # Set default parameters if not provided
        if agent_parameters is None:
            agent_parameters = {
                "temperature": 0.7,
                "max_tokens": 500,
            }

        self.agent_id = agent_id
        self.agent_parameters = agent_parameters

        # Initialize OpenAI client
        openai.api_key = os.getenv("OPENAI_API_KEY")
        self.client = openai.OpenAI()

    def process_query(self, query: str) -> str:
        """
        Process a query and return a response. This method should be overridden by subclasses.
        """
        raise NotImplementedError("Subclasses must implement process_query method")
