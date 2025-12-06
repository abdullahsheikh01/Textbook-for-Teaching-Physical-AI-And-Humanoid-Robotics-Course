from .base_agent import BaseAIAgent
from .tools.qdrant_retrieval_tool import QdrantRetrievalTool
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class PhysicalAIEngineerAgent(BaseAIAgent):
    def __init__(self, **kwargs):
        super().__init__(
            agent_id="physical_ai_expert_agent",
            agent_parameters={
                "temperature": 0.7,
                "max_tokens": 1000,
                "model": "gpt-4-turbo"  # or gpt-3.5-turbo
            },
            **kwargs
        )
        # Initialize the retrieval tool
        self.retrieval_tool = QdrantRetrievalTool()

    def process_query(self, query: str) -> str:
        """
        Process a query using the retrieval tool to find relevant book content,
        then generate a response based on that content.
        """
        try:
            # Extract the actual question from the query
            if "User is asking about this specific text:" in query:
                # Handle case where selected text is provided
                parts = query.split("User is asking about this specific text:")
                selected_text_part = parts[1].split("User question:")[0].strip().strip("'")
                user_question = parts[1].split("User question:")[1].strip()

                # Retrieve content related to the selected text
                relevant_content = self.retrieval_tool.retrieve_content_by_text_selection(selected_text_part)
            else:
                # Handle case where only a question is provided
                user_question = query.split("User question:")[1] if "User question:" in query else query
                relevant_content = self.retrieval_tool.retrieve_relevant_content(user_question)

            # Prepare context from retrieved content
            context_str = ""
            if relevant_content:
                context_str = "Relevant book content:\n"
                for i, content in enumerate(relevant_content[:3]):  # Use top 3 results
                    context_str += f"{i+1}. {content['text']}\n"
                    if content.get('title'):
                        context_str += f"   Source: {content['title']}\n"
            else:
                context_str = "No specific content found in the textbook. Please refer to the textbook for detailed information on Physical AI and Humanoid Robotics."

            # Create a system message with the persona
            system_message = {
                "role": "system",
                "content": "You are an experienced engineer specializing in Physical AI and Humanoid Robotics. Your expertise covers ROS 2, Gazebo, Unity, NVIDIA Isaac, and Vision-Language-Action (VLA) systems. You provide detailed, accurate, and practical answers based on the provided textbook content."
            }

            # Create the user message with context
            user_message = {
                "role": "user",
                "content": f"""
                {context_str}

                User's question: {user_question}

                Please provide a detailed, accurate answer based on the textbook content provided above.
                If the content doesn't directly answer the question, provide general guidance based on
                your expertise in Physical AI and Humanoid Robotics while noting that the specific
                information may be found in the textbook.
                """
            }

            # Call the OpenAI API
            response = self.client.chat.completions.create(
                model=self.agent_parameters.get("model", "gpt-3.5-turbo"),
                messages=[system_message, user_message],
                temperature=self.agent_parameters.get("temperature", 0.7),
                max_tokens=self.agent_parameters.get("max_tokens", 1000)
            )

            # Extract and return the response
            ai_response = response.choices[0].message.content

            logger.info(f"Processed query: {user_question[:50]}... with {len(relevant_content)} relevant content chunks")
            return ai_response

        except Exception as e:
            logger.error(f"Error processing query: {str(e)}")
            return "I encountered an error while processing your request. Please try again."
