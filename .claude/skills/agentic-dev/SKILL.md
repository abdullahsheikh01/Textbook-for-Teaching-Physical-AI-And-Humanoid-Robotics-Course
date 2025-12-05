---
name: agentic-developer-openai-qdrant
description: Expert agentic developer skill for building AI agents using OpenAI Agents SDK, FastAPI, and Qdrant vector database. Use when implementing AI agents with retrieval-augmented generation (RAG), creating conversational AI systems, building question-answering systems over document collections, or integrating vector search with LLM agents.
---

# Agentic Developer - OpenAI Agents SDK + FastAPI + Qdrant

## Overview
This skill provides expert guidance for building production-ready AI agent systems using OpenAI's Agents SDK, FastAPI for REST APIs, and Qdrant for vector-based retrieval. Specializes in creating context-aware agents that answer questions based on specific document collections.

## Core Competencies

### 1. OpenAI Agents SDK Mastery

#### Agent Configuration & Personas
- Define agent personas with specific expertise and behavioral traits
- Configure agent instructions for domain-specific knowledge
- Set temperature and model parameters for consistent responses
- Implement multi-agent systems with specialized roles
- Create agent hierarchies and handoff patterns

#### Agent Components
```python
from openai_agents import Agent, Runner

# Define agent with persona
agent = Agent(
    name="robotics_expert",
    model="gpt-4o",
    instructions="""You are an Experienced Engineer of Physical AI & Humanoid Robotics.
    
    Your expertise includes:
    - Robotics systems architecture
    - Physical AI implementations
    - Humanoid robot design and control
    - Sensor integration and perception
    - Motion planning and control algorithms
    
    CRITICAL: Answer questions ONLY based on the provided book content.
    If information is not in the retrieved context, clearly state that the 
    information is not available in the provided materials.""",
    temperature=0.3,  # Lower for more consistent, factual responses
)
```

#### Tool Integration
- Register custom tools for agents to use
- Implement function calling patterns
- Handle tool execution and response formatting
- Create async tool wrappers for I/O operations
- Manage tool error handling and retries

#### Agent Execution Patterns
- Implement streaming responses for real-time feedback
- Handle agent state and conversation history
- Manage context windows and token limits
- Implement agent memory and persistence
- Create agent orchestration workflows

### 2. FastAPI Backend Development

#### API Structure & Design
- RESTful endpoint design for agent interactions
- Request/response models with Pydantic validation
- Async endpoint implementation for performance
- CORS configuration for frontend integration
- Error handling and status codes

#### Core Endpoints
```python
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from typing import Optional, List

app = FastAPI(
    title="AI Agent API",
    description="Agentic system with retrieval capabilities",
    version="1.0.0"
)

class ChatRequest(BaseModel):
    question: str = Field(..., description="User question")
    selected_text: Optional[str] = Field(None, description="Selected text context")
    conversation_id: Optional[str] = Field(None, description="Conversation ID for history")
    
class ChatResponse(BaseModel):
    answer: str
    sources: List[dict]
    conversation_id: str
    
@app.post("/api/chat", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    """Process user query with AI agent"""
    pass
```

#### Middleware & Dependencies
- Authentication and authorization middleware
- Rate limiting for API protection
- Logging and monitoring integration
- Database connection management
- Dependency injection patterns

#### Advanced Features
- WebSocket support for streaming responses
- Background tasks for long-running operations
- File upload handling for document ingestion
- Health check and readiness endpoints
- API versioning strategies

### 3. Qdrant Vector Database Integration

#### Collection Management
- Create and configure Qdrant collections
- Define vector dimensions and distance metrics
- Set up collection schemas with payload fields
- Implement collection indexing strategies
- Manage collection lifecycle (create, update, delete)

#### Vector Operations
```python
from qdrant_client import QdrantClient
from qdrant_client.models import Distance, VectorParams, PointStruct

client = QdrantClient(url="http://localhost:6333")

# Create collection
client.create_collection(
    collection_name="robotics_books",
    vectors_config=VectorParams(
        size=1536,  # OpenAI embedding dimension
        distance=Distance.COSINE
    )
)

# Upload vectors
client.upsert(
    collection_name="robotics_books",
    points=[
        PointStruct(
            id=chunk_id,
            vector=embedding,
            payload={
                "text": chunk_text,
                "book_title": "Physical AI Fundamentals",
                "chapter": "Chapter 3",
                "page": 42
            }
        )
    ]
)
```

#### Retrieval Strategies
- Semantic search with vector similarity
- Hybrid search (vector + keyword filtering)
- Multi-query retrieval for comprehensive results
- Re-ranking retrieved documents
- Contextual compression of results

#### Optimization Techniques
- Batch operations for performance
- HNSW indexing parameters tuning
- Quantization for reduced memory usage
- Sharding for large-scale deployments
- Caching strategies for frequent queries

### 4. Retrieval-Augmented Generation (RAG) Patterns

#### Document Processing Pipeline
- Text chunking strategies (semantic, fixed-size, recursive)
- Embedding generation with OpenAI or alternatives
- Metadata extraction and enrichment
- Deduplication and quality filtering
- Incremental updates and versioning

#### Retrieval Tool Implementation
```python
from typing import List
import openai

async def retrieve_relevant_context(
    query: str,
    selected_text: Optional[str] = None,
    top_k: int = 5
) -> List[dict]:
    """Retrieve relevant book content from Qdrant"""
    
    # Generate query embedding
    embedding_response = await openai.embeddings.create(
        model="text-embedding-3-small",
        input=query
    )
    query_vector = embedding_response.data[0].embedding
    
    # Search Qdrant
    search_results = client.search(
        collection_name="robotics_books",
        query_vector=query_vector,
        limit=top_k,
        score_threshold=0.7  # Minimum similarity score
    )
    
    # Format results
    contexts = []
    for result in search_results:
        contexts.append({
            "text": result.payload["text"],
            "metadata": {
                "book_title": result.payload["book_title"],
                "chapter": result.payload.get("chapter"),
                "page": result.payload.get("page"),
                "score": result.score
            }
        })
    
    # If selected text provided, prioritize it
    if selected_text:
        contexts.insert(0, {
            "text": selected_text,
            "metadata": {"source": "user_selection"}
        })
    
    return contexts
```

#### Context Management
- Context window optimization
- Relevance scoring and filtering
- Context deduplication
- Source attribution and citations
- Fallback strategies for no-match scenarios

## Technology Stack

### Primary Technologies
- **OpenAI Agents SDK**: Agent orchestration and tool use
- **FastAPI**: High-performance async API framework
- **Qdrant**: Vector database for semantic search
- **Pydantic**: Data validation and settings management
- **Python 3.11+**: Modern Python with typing support

### Supporting Libraries
- **openai**: OpenAI API client
- **qdrant-client**: Qdrant Python client
- **uvicorn**: ASGI server for FastAPI
- **python-dotenv**: Environment variable management
- **httpx**: Async HTTP client
- **tenacity**: Retry logic and fault tolerance

### Optional Enhancements
- **LangChain**: For advanced agent patterns
- **Redis**: Caching and session management
- **PostgreSQL**: Structured data storage
- **Prometheus/Grafana**: Monitoring and metrics
- **Sentry**: Error tracking

## Complete Implementation Architecture

```
project/
├── app/
│   ├── __init__.py
│   ├── main.py                    # FastAPI application
│   ├── config.py                  # Configuration management
│   ├── agents/
│   │   ├── __init__.py
│   │   ├── robotics_agent.py     # Agent definition
│   │   └── tools.py               # Agent tools
│   ├── api/
│   │   ├── __init__.py
│   │   ├── endpoints.py           # API endpoints
│   │   └── models.py              # Pydantic models
│   ├── services/
│   │   ├── __init__.py
│   │   ├── qdrant_service.py     # Qdrant operations
│   │   ├── embeddings.py          # Embedding generation
│   │   └── rag_service.py         # RAG pipeline
│   └── utils/
│       ├── __init__.py
│       ├── chunking.py            # Text chunking
│       └── logging.py             # Logging setup
├── tests/
├── .env
├── requirements.txt
└── README.md
```

## Step-by-Step Implementation Guide

### Step 1: Environment Setup
```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install fastapi uvicorn openai-agents qdrant-client openai python-dotenv pydantic
```

### Step 2: Configuration
```python
# app/config.py
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    openai_api_key: str
    qdrant_url: str = "http://localhost:6333"
    qdrant_api_key: str = ""
    collection_name: str = "robotics_books"
    embedding_model: str = "text-embedding-3-small"
    agent_model: str = "gpt-4o"
    
    class Config:
        env_file = ".env"

settings = Settings()
```

### Step 3: Qdrant Service Implementation
```python
# app/services/qdrant_service.py
from qdrant_client import QdrantClient
from qdrant_client.models import Distance, VectorParams, PointStruct
from typing import List, Optional
import openai
from app.config import settings

class QdrantService:
    def __init__(self):
        self.client = QdrantClient(
            url=settings.qdrant_url,
            api_key=settings.qdrant_api_key if settings.qdrant_api_key else None
        )
        self.collection_name = settings.collection_name
    
    async def initialize_collection(self, vector_size: int = 1536):
        """Create collection if it doesn't exist"""
        try:
            self.client.get_collection(self.collection_name)
        except Exception:
            self.client.create_collection(
                collection_name=self.collection_name,
                vectors_config=VectorParams(
                    size=vector_size,
                    distance=Distance.COSINE
                )
            )
    
    async def search_similar(
        self,
        query: str,
        limit: int = 5,
        score_threshold: float = 0.7
    ) -> List[dict]:
        """Search for similar content"""
        # Generate embedding
        response = await openai.embeddings.create(
            model=settings.embedding_model,
            input=query
        )
        query_vector = response.data[0].embedding
        
        # Search Qdrant
        results = self.client.search(
            collection_name=self.collection_name,
            query_vector=query_vector,
            limit=limit,
            score_threshold=score_threshold
        )
        
        return [
            {
                "text": r.payload["text"],
                "metadata": r.payload.get("metadata", {}),
                "score": r.score
            }
            for r in results
        ]
```

### Step 4: Agent Definition
```python
# app/agents/robotics_agent.py
from openai_agents import Agent
from app.config import settings
from app.services.qdrant_service import QdrantService

qdrant_service = QdrantService()

async def retrieve_book_content(query: str) -> str:
    """Tool for retrieving relevant book content"""
    results = await qdrant_service.search_similar(query, limit=5)
    
    if not results:
        return "No relevant content found in the book collection."
    
    # Format context
    context = "Retrieved book content:\n\n"
    for i, result in enumerate(results, 1):
        context += f"[Source {i}] (Relevance: {result['score']:.2f})\n"
        context += f"{result['text']}\n\n"
    
    return context

# Define the agent
robotics_agent = Agent(
    name="robotics_expert",
    model=settings.agent_model,
    instructions="""You are an Experienced Engineer of Physical AI & Humanoid Robotics.

Your core expertise areas:
- Physical AI systems and architectures
- Humanoid robotics design and implementation
- Sensor fusion and perception systems
- Motion planning and control
- Real-time robotics software

CRITICAL RULES:
1. Answer questions ONLY based on the retrieved book content
2. If information is not in the retrieved context, explicitly state: 
   "This information is not available in the provided book materials."
3. Always cite which source number you're referencing
4. Be precise and technical in your explanations
5. If selected text is provided by the user, prioritize that context

When you need information, use the retrieve_book_content tool to search the book database.""",
    tools=[retrieve_book_content],
    temperature=0.3,
)
```

### Step 5: FastAPI Endpoint Implementation
```python
# app/api/endpoints.py
from fastapi import APIRouter, HTTPException
from app.api.models import ChatRequest, ChatResponse
from app.agents.robotics_agent import robotics_agent
from openai_agents import Runner
import uuid

router = APIRouter()

@router.post("/api/chat", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    """
    Process user query with AI agent using retrieval-augmented generation.
    
    - **question**: User's question about robotics/physical AI
    - **selected_text**: Optional text selected by user for context
    - **conversation_id**: Optional ID to maintain conversation history
    """
    try:
        # Generate conversation ID if not provided
        conversation_id = request.conversation_id or str(uuid.uuid4())
        
        # Prepare user message
        user_message = request.question
        if request.selected_text:
            user_message = f"""User's selected text for context:
---
{request.selected_text}
---

User's question: {request.question}

Please answer based on the selected text above and any additional relevant book content."""
        
        # Run agent
        runner = Runner(agent=robotics_agent)
        response = await runner.run(user_message)
        
        # Extract sources from agent's tool calls
        sources = []
        if hasattr(response, 'tool_calls'):
            for tool_call in response.tool_calls:
                if tool_call.function.name == 'retrieve_book_content':
                    sources.append({
                        "query": tool_call.function.arguments,
                        "results": "Retrieved from book database"
                    })
        
        return ChatResponse(
            answer=response.content,
            sources=sources,
            conversation_id=conversation_id
        )
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error processing request: {str(e)}"
        )
```

### Step 6: Main Application
```python
# app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.endpoints import router
from app.services.qdrant_service import QdrantService
from app.config import settings

app = FastAPI(
    title="Robotics AI Agent API",
    description="AI Agent for Physical AI & Humanoid Robotics Q&A",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure appropriately for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(router)

@app.on_event("startup")
async def startup_event():
    """Initialize services on startup"""
    qdrant = QdrantService()
    await qdrant.initialize_collection()

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "robotics-agent"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
```

## Best Practices

### Agent Design
1. **Clear Instructions**: Define agent persona and constraints explicitly
2. **Tool Documentation**: Document tool parameters and expected outputs
3. **Error Handling**: Gracefully handle tool failures and edge cases
4. **Context Limits**: Monitor and manage token usage
5. **Deterministic Behavior**: Use lower temperatures for factual responses

### API Design
1. **Async Everywhere**: Use async/await for I/O operations
2. **Request Validation**: Leverage Pydantic for input validation
3. **Error Responses**: Return meaningful error messages with proper status codes
4. **Rate Limiting**: Implement rate limiting to prevent abuse
5. **Logging**: Log all requests, responses, and errors

### RAG Implementation
1. **Chunking Strategy**: Use semantic chunking for better context preservation
2. **Embedding Quality**: Use high-quality embedding models
3. **Retrieval Tuning**: Experiment with top_k and score_threshold values
4. **Context Ranking**: Re-rank retrieved results by relevance
5. **Source Attribution**: Always track and return source information

### Vector Database
1. **Index Optimization**: Tune HNSW parameters for your use case
2. **Batch Operations**: Use batch uploads for large datasets
3. **Metadata Filtering**: Leverage payload filtering for targeted searches
4. **Monitoring**: Track query latency and storage usage
5. **Backup Strategy**: Regular backups of collection data

## Testing Strategy

```python
# tests/test_agent.py
import pytest
from app.agents.robotics_agent import robotics_agent, retrieve_book_content

@pytest.mark.asyncio
async def test_retrieve_book_content():
    result = await retrieve_book_content("humanoid robot control")
    assert "Retrieved book content" in result
    
@pytest.mark.asyncio
async def test_agent_response():
    from openai_agents import Runner
    runner = Runner(agent=robotics_agent)
    response = await runner.run("What is physical AI?")
    assert len(response.content) > 0
```

## Performance Optimization

### Caching Strategy
```python
from functools import lru_cache
import hashlib

@lru_cache(maxsize=1000)
async def cached_embedding(text: str):
    """Cache embeddings for frequently queried text"""
    cache_key = hashlib.md5(text.encode()).hexdigest()
    # Check cache, generate if missing
    pass
```

### Async Processing
```python
import asyncio

async def parallel_retrievals(queries: List[str]):
    """Process multiple retrievals in parallel"""
    tasks = [retrieve_book_content(q) for q in queries]
    return await asyncio.gather(*tasks)
```

## Monitoring & Observability

```python
from prometheus_client import Counter, Histogram
import time

query_counter = Counter('agent_queries_total', 'Total queries processed')
query_duration = Histogram('agent_query_duration_seconds', 'Query processing time')

@router.post("/api/chat")
async def chat_endpoint(request: ChatRequest):
    query_counter.inc()
    start_time = time.time()
    
    try:
        # Process query
        pass
    finally:
        query_duration.observe(time.time() - start_time)
```

## When to Use This Skill

Apply this skill when the task involves:
- Building AI agents with OpenAI Agents SDK
- Implementing retrieval-augmented generation (RAG) systems
- Creating question-answering systems over document collections
- Integrating vector databases (Qdrant) with LLM agents
- Developing FastAPI backends for AI applications
- Implementing semantic search functionality
- Building context-aware conversational AI
- Creating domain-specific AI assistants
- Processing and querying large document collections
- Implementing tool-using agents with custom capabilities

## Output Standards

When implementing agentic solutions:
1. Use async/await throughout for performance
2. Implement comprehensive error handling
3. Add proper logging and monitoring
4. Write type hints for all functions
5. Document agent instructions clearly
6. Test agent behavior with edge cases
7. Optimize vector search parameters
8. Implement proper security measures
9. Follow FastAPI best practices
10. Ensure responses cite sources accurately