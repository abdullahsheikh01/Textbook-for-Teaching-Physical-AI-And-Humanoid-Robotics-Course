<!-- Sync Impact Report:
Version change: 0.1.0 → 0.1.1
Modified principles:
- [PRINCIPLE_1_NAME] → I. Frontend Framework & UI/UX
- [PRINCIPLE_2_NAME] → II. Agentic Backend Architecture
- [PRINCIPLE_3_NAME] → III. Content Interaction & Intelligence
- [PRINCIPLE_4_NAME] → IV. Core Educational Focus
- [PRINCIPLE_5_NAME] → V. Book Content Structure & Standards
- [PRINCIPLE_6_NAME] → VI. Visual & Interactive Design
Added sections:
- Additional Constraints
- Development Workflow
Templates requiring updates:
- .specify/templates/plan-template.md: ⚠ pending
- .specify/templates/spec-template.md: ⚠ pending
- .specify/templates/tasks-template.md: ⚠ pending
- .specify/templates/commands/*.md: ⚠ pending
- runtime guidance docs (README.md, docs/quickstart.md): ⚠ pending
Follow-up TODOs: None
-->
# Textbook for Teaching Physical AI & Humanoid Robotics Course Constitution

## Core Principles

### I. Frontend Framework & UI/UX
The digital book MUST be built using Docusaurus. The user interface, including the Chatbot widget, MUST be clean and responsive, with the Chatbot's open/close functionality controlled by an "AI HELP" button.

### II. Agentic Backend Architecture
The backend MUST implement an agentic workflow using the OpenAI Agents SDK. It MUST provide FastAPI REST APIs to connect with the frontend Chatbot widget.

### III. Content Interaction & Intelligence
The agentic backend MUST be capable of answering user questions based on the book's content, including specifically selected text, to provide contextual assistance.

### IV. Core Educational Focus
The book's focus, theme, and goal MUST center on "AI Systems in the Physical World: Embodied Intelligence," bridging the gap between the digital brain and the physical body. The content MUST enable students to apply AI knowledge to control Humanoid Robots in simulated and real-world environments.

### V. Book Content Structure & Standards
The book's content MUST introduce Physical AI, covering design, simulation, and deployment of humanoid robots using ROS 2, Gazebo, and NVIDIA Isaac. It MUST be structured into modules, weekly breakdowns, assessments, and hardware requirements, with all weekly breakdowns and assessments directly based on the modules. Hyperlinks MUST be used where appropriate.

### VI. Visual & Interactive Design
The book's layout and theme MUST reflect robotics aesthetics. The footer MUST also maintain a clean and responsive interface, consistent with the overall design.

## Additional Constraints

*   **Book Content Generation:** Content generation MUST adhere to the described capstone introduction of Physical AI, focusing on design, simulation, and deployment of humanoid robots.
*   **Book Layout:** The book's layout, including colors and theme, MUST consistently align with a robotics aesthetic.
*   **Footer:** The footer interface MUST be clean and responsive.

## Development Workflow

*   **Code Quality:** All code (frontend and backend) MUST be clean, maintainable, and responsive.
*   **API Design:** Backend REST APIs MUST be well-documented and adhere to best practices for FastAPI.
*   **Content Integration:** The Chatbot widget MUST seamlessly integrate with the backend API to provide accurate and contextual responses.

## Governance
The Constitution is the single source of truth for all project principles and design decisions. Amendments MUST be thoroughly documented, approved by stakeholders, and include a clear migration plan for any breaking changes. All pull requests and code reviews MUST explicitly verify compliance with these principles. Unnecessary complexity MUST always be avoided and justified if introduced.

**Version**: 0.1.1 | **Ratified**: 2025-12-05 | **Last Amended**: 2025-12-05