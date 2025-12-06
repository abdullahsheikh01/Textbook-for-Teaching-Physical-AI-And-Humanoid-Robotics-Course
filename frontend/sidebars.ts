import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  // Manual sidebar configuration for the textbook
  textbookSidebar: [
    {
      type: 'doc',
      id: 'why-physical-ai-matters',
      label: 'Why Physical AI Matters',
    },
    {
      type: 'category',
      label: 'Modules',
      items: [
        {
          type: 'doc',
          id: 'modules/module-1',
          label: 'Module 1: The Robotic Nervous System (ROS 2)',
        },
        {
          type: 'doc',
          id: 'modules/module-2',
          label: 'Module 2: The Digital Twin (Gazebo & Unity)',
        },
        {
          type: 'doc',
          id: 'modules/module-3',
          label: 'Module 3: The AI-Robot Brain (NVIDIA Isaac™)',
        },
        {
          type: 'doc',
          id: 'modules/module-4',
          label: 'Module 4: Vision-Language-Action (VLA)',
        },
      ],
    },
    {
      type: 'category',
      label: 'Weekly Breakdowns',
      items: [
        {
          type: 'doc',
          id: 'weekly-breakdowns/week-1',
          label: 'Week 1: Introduction to Physical AI & ROS 2 Fundamentals',
        },
        {
          type: 'doc',
          id: 'weekly-breakdowns/week-2',
          label: 'Week 2: Digital Twins with Gazebo & Unity',
        },
        {
          type: 'doc',
          id: 'weekly-breakdowns/week-3',
          label: 'Week 3: AI-Robot Brain with NVIDIA Isaac™',
        },
        {
          type: 'doc',
          id: 'weekly-breakdowns/week-4',
          label: 'Week 4: Vision-Language-Action (VLA) Systems',
        },
      ],
    },
    {
      type: 'category',
      label: 'Assessments',
      items: [
        {
          type: 'doc',
          id: 'assessments/module-1-assessment',
          label: 'Module 1 Assessment: ROS 2 Fundamentals',
        },
        {
          type: 'doc',
          id: 'assessments/module-2-assessment',
          label: 'Module 2 Assessment: Digital Twins with Gazebo & Unity',
        },
        {
          type: 'doc',
          id: 'assessments/module-3-assessment',
          label: 'Module 3 Assessment: AI-Robot Brain with NVIDIA Isaac™',
        },
        {
          type: 'doc',
          id: 'assessments/module-4-assessment',
          label: 'Module 4 Assessment: Vision-Language-Action (VLA) Systems',
        },
      ],
    },
  ],
};

export default sidebars;
