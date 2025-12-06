from typing import List, Dict, Any
import logging
from qdrant_client import QdrantClient
from qdrant_client.http import models
import os

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class QdrantRetrievalTool:
    def __init__(self):
        # Initialize Qdrant client
        self.client = QdrantClient(
            url=os.getenv("QDRANT_URL", "http://localhost:6333"),
            api_key=os.getenv("QDRANT_API_KEY")
        )
        self.collection_name = os.getenv("QDRANT_COLLECTION_NAME", "book_content")
        logger.info(f"Initialized Qdrant client for collection: {self.collection_name}")

    def retrieve_relevant_content(self, query: str, top_k: int = 5) -> List[Dict[str, Any]]:
        """
        Retrieve relevant content from the Qdrant vector database based on the query.

        Args:
            query (str): The search query
            top_k (int): Number of top results to return

        Returns:
            List[Dict[str, Any]]: List of relevant content chunks with metadata
        """
        try:
            # Perform semantic search in Qdrant
            search_results = self.client.search(
                collection_name=self.collection_name,
                query_text=query,  # Using text-based search
                limit=top_k,
                with_payload=True,  # Include the original content
                with_vectors=False  # We don't need the vectors in the response
            )

            # Extract relevant content from search results
            relevant_content = []
            for result in search_results:
                content = {
                    "text": result.payload.get("text", ""),
                    "title": result.payload.get("title", ""),
                    "source": result.payload.get("source", ""),
                    "score": result.score
                }
                relevant_content.append(content)

            logger.info(f"Retrieved {len(relevant_content)} relevant content chunks for query: {query[:50]}...")
            return relevant_content

        except Exception as e:
            logger.error(f"Error retrieving content from Qdrant: {str(e)}")
            # Return empty list if there's an error
            return []

    def retrieve_content_by_text_selection(self, selected_text: str) -> List[Dict[str, Any]]:
        """
        Retrieve content specifically related to selected text.

        Args:
            selected_text (str): The selected text to search for

        Returns:
            List[Dict[str, Any]]: List of relevant content chunks
        """
        return self.retrieve_relevant_content(selected_text, top_k=3)