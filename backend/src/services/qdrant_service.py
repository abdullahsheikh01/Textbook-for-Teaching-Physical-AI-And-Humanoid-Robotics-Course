from qdrant_client import QdrantClient, models
from qdrant_client.http.models import Distance, VectorParams
import os

QDRANT_HOST = os.getenv("QDRANT_HOST", "localhost")
QDRANT_PORT = int(os.getenv("QDRANT_PORT", 6333))
QDRANT_COLLECTION_NAME = os.getenv("QDRANT_COLLECTION_NAME", "physical_ai_robotics_textbook")

class QdrantService:
    def __init__(self):
        self.client = QdrantClient(host=QDRANT_HOST, port=QDRANT_PORT)
        self.collection_name = QDRANT_COLLECTION_NAME
        self._ensure_collection_exists()

    def _ensure_collection_exists(self):
        collections = self.client.get_collections().collections
        if not any(c.name == self.collection_name for c in collections):
            self.client.recreate_collection(
                collection_name=self.collection_name,
                vectors_config=VectorParams(size=1536, distance=Distance.COSINE), # Assuming OpenAI embeddings size
            )
            print(f"Collection '{self.collection_name}' created.")
        else:
            print(f"Collection '{self.collection_name}' already exists.")

    def upsert_vectors(self, vectors, payloads, ids=None):
        points = []
        for i, (vector, payload) in enumerate(zip(vectors, payloads)):
            point_id = ids[i] if ids else None
            points.append(
                models.PointStruct(
                    id=point_id,
                    vector=vector,
                    payload=payload,
                )
            )
        self.client.upsert(
            collection_name=self.collection_name,
            wait=True,
            points=points,
        )
        print(f"Upserted {len(vectors)} points to collection '{self.collection_name}'.")

    def search_vectors(self, query_vector, limit=5):
        search_result = self.client.search(
            collection_name=self.collection_name,
            query_vector=query_vector,
            limit=limit,
        )
        return search_result

if __name__ == "__main__":
    # Example usage:
    qdrant_service = QdrantService()

    # In a real scenario, vectors would come from an embedding model (e.g., OpenAI)
    # For demonstration, using dummy vectors
    dummy_vectors = [[0.1] * 1536, [0.2] * 1536]
    dummy_payloads = [{"content": "This is a test document about AI."}, {"content": "Another document on robotics."}]
    dummy_ids = [1, 2]

    qdrant_service.upsert_vectors(dummy_vectors, dummy_payloads, dummy_ids)

    query_vector = [0.15] * 1536
    results = qdrant_service.search_vectors(query_vector)
    print("Search results:")
    for result in results:
        print(f"  Score: {result.score}, Payload: {result.payload}")
