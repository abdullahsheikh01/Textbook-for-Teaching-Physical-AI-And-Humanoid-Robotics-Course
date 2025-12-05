# Tasks: Textbook for Teaching Physical AI & Humanoid Robotics Course

**Input**: Design documents from `/specs/001-physical-ai-robotics-textbook/`
**Prerequisites**: plan.md (required), spec.md (required for user stories)

**Organization**: Tasks are grouped by user story and development area (Content, Frontend, Backend) to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Web app**: `backend/src/`, `frontend/src/`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

### Frontend Setup

- [ ] T001 Initialize Docusaurus project in `frontend/`
- [ ] T002 Configure basic Docusaurus site settings in `frontend/docusaurus.config.js`
- [ ] T003 [P] Configure CSS Modules for styling in `frontend/`

### Backend Setup

- [ ] T004 Initialize Python project and virtual environment in `backend/`
- [ ] T005 Install FastAPI and Uvicorn in `backend/`
- [ ] T006 Install OpenAI Agents SDK and Qdrant client in `backend/`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

### Backend Core Services

- [ ] T007 Implement Qdrant Vector Database client and connection logic in `backend/src/services/qdrant_service.py`
- [ ] T008 Create FastAPI application instance and basic routing in `backend/src/api/main.py`
- [ ] T009 Implement base AI Agent class and core logic using OpenAI Agents SDK in `backend/src/agents/base_agent.py`

### Content Structure & Initial Data

- [ ] T010 Define initial book content structure (modules, sections) and placeholder markdown files in `frontend/docs/`
- [ ] T011 Create "Why Physical AI Matters" main page content in `frontend/docs/why-physical-ai-matters.mdx`

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Accessing Book Content & Search (Priority: P1) 🎯 MVP

**Goal**: Students can access the main book content and use the Docusaurus search feature to find information.

**Independent Test**: A user can navigate to the "Why Physical AI Matters" main page, browse other content, and successfully search for keywords, verifying results are relevant.

### Frontend Development [US1]

- [ ] T012 [P] [US1] Implement Docusaurus navigation menu for modules and sections in `frontend/src/components/Navbar/index.js`
- [ ] T013 [P] [US1] Configure Docusaurus default search feature in `frontend/docusaurus.config.js`
- [ ] T014 [US1] Ensure all book content (markdown) is searchable and indexed by Docusaurus in `frontend/docs/`

---

## Phase 4: User Story 2 - Interacting with the AI Chatbot (Priority: P1)

**Goal**: Students can interact with an AI Chatbot with an "Experienced Engineer" persona to ask questions about the book content, including selected text, and receive accurate, contextual answers.

**Independent Test**: A user can open the chatbot, ask a general question about the book, and receive a relevant answer. Selecting text and asking a question about it yields a text-specific answer.

### Frontend Development [US2]

- [ ] T015 [P] [US2] Create Chatbot widget React component with open/close functionality in `frontend/src/components/ChatbotWidget/index.js`
- [ ] T016 [P] [US2] Create "AI HELP" button component to trigger chatbot in `frontend/src/components/AiHelpButton/index.js`
- [ ] T017 [US2] Integrate Chatbot widget into Docusaurus layout in `frontend/src/theme/Layout/index.js`
- [ ] T018 [US2] Implement user input handling and display of chatbot responses in `frontend/src/components/ChatbotWidget/index.js`
- [ ] T019 [P] [US2] Implement functionality to send selected text to the backend with user questions in `frontend/src/components/ChatbotWidget/index.js`

### Agentic Backend Development [US2]

- [ ] T020 [P] [US2] Define AI Agent persona as "Experienced Engineer of Physical AI & Humanoid Robotics" in `backend/src/agents/physical_ai_expert_agent.py`
- [ ] T021 [P] [US2] Create FastAPI endpoint `/api/chat` to receive user questions and selected text in `backend/src/api/main.py`
- [ ] T022 [P] [US2] Implement Qdrant retrieval tool for the AI Agent to fetch relevant book content in `backend/src/agents/tools/qdrant_retrieval_tool.py`
- [ ] T023 [US2] Integrate Qdrant retrieval tool into the AI Agent workflow to answer questions based on book content in `backend/src/agents/physical_ai_expert_agent.py`
- [ ] T024 [US2] Implement AI Agent logic to answer questions based *only* on provided book content (full text or selected text) in `backend/src/agents/physical_ai_expert_agent.py`
- [ ] T025 [US2] Connect FastAPI `/api/chat` endpoint to the AI Agent for processing user queries in `backend/src/api/main.py`

**Checkpoint**: At this point, User Story 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Navigating Book Modules & Assessments (Priority: P2)

**Goal**: Students can easily navigate through structured modules, weekly breakdowns, and assessments, with all hyperlinks functioning correctly.

**Independent Test**: A user can navigate from the main page to any module, then to its weekly breakdown and related assessment, verifying all hyperlinks work as expected.

### Content Writing [US3]

- [ ] T026 [P] [US3] Create detailed content for Module 1: The Robotic Nervous System (ROS 2) in `frontend/docs/modules/module-1.mdx`
- [ ] T027 [P] [US3] Create detailed content for Module 2: The Digital Twin (Gazebo & Unity) in `frontend/docs/modules/module-2.mdx`
- [ ] T028 [P] [US3] Create detailed content for Module 3: The AI-Robot Brain (NVIDIA Isaac™) in `frontend/docs/modules/module-3.mdx`
- [ ] T029 [P] [US3] Create detailed content for Module 4: Vision-Language-Action (VLA) in `frontend/docs/modules/module-4.mdx`
- [ ] T030 [P] [US3] Generate weekly breakdown content based on modules in `frontend/docs/weekly-breakdowns/`
- [ ] T031 [P] [US3] Generate assessment content based on modules in `frontend/docs/assessments/`
- [ ] T032 [US3] Add all necessary hyperlinks within the book content (`frontend/docs/**/*.mdx`)

### Frontend Development [US3]

- [ ] T033 [P] [US3] Update Docusaurus sidebar configuration to include all modules, weekly breakdowns, and assessments in `frontend/sidebars.js`
- [ ] T034 [US3] Ensure Docusaurus automatically generates navigation for all new content in `frontend/docusaurus.config.js`
- [ ] T035 [US3] Verify all internal and external hyperlinks are correctly rendered and navigable across the book in `frontend/docs/`

**Checkpoint**: All user stories should now be independently functional

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

### Frontend Polish

- [ ] T036 Refine overall book layout and theme to reflect robotics aesthetics using CSS Modules in `frontend/src/theme/`
- [ ] T037 Ensure footer has a clean and responsive interface, matching theme in `frontend/src/components/Footer/index.js`
- [ ] T038 Conduct comprehensive responsiveness testing across devices for all frontend components in `frontend/`
- [ ] T039 Implement accessibility best practices for the frontend in `frontend/`

### Backend Polish

- [ ] T040 Implement robust error handling and logging for all FastAPI endpoints and agent operations in `backend/src/`
- [ ] T041 Review and optimize agent performance and Qdrant query efficiency in `backend/src/`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 3 (P2)**: Can start after Foundational (Phase 2) - No dependencies on other stories

### Within Each User Story

- Models before services
- Services before endpoints
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- Multiple content writing tasks, multiple frontend tasks, and multiple backend tasks can be worked on in parallel within a story or across stories if no direct file dependencies.

---

## Parallel Example: User Story 2 (Interacting with the AI Chatbot)

```bash
# Frontend tasks for US2
Task: "Create Chatbot widget React component with open/close functionality in frontend/src/components/ChatbotWidget/index.js"
Task: "Create 'AI HELP' button component to trigger chatbot in frontend/src/components/AiHelpButton/index.js"
Task: "Implement functionality to send selected text to the backend with user questions in frontend/src/components/ChatbotWidget/index.js"

# Agentic Backend tasks for US2
Task: "Define AI Agent persona as 'Experienced Engineer of Physical AI & Humanoid Robotics' in backend/src/agents/physical_ai_expert_agent.py"
Task: "Create FastAPI endpoint /api/chat to receive user questions and selected text in backend/src/api/main.py"
Task: "Implement Qdrant retrieval tool for the AI Agent to fetch relevant book content in backend/src/agents/tools/qdrant_retrieval_tool.py"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 (Content, Frontend, Backend)
   - Developer B: User Story 2 (Content, Frontend, Backend)
   - Developer C: User Story 3 (Content, Frontend, Backend)
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
