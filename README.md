# SwiftNet: Your AI Dream Team for the Digital World

![Swiftnet_Banner](https://github.com/wibi16/swiftnet/imgs/Swiftnet_Banner.png)

## Table of Contents
1. [Introduction](#introduction)
2. [Safety Guidelines](#safety-guidelines)
3. [AI Agents](#ai-agents)
4. [Getting Started](#getting-started)
   - [Clone & Install](#clone--install)
   - [Install SwiftNet](#install-swiftnet)
   - [Set Up Your Tools](#set-up-your-tools)
   - [Run Examples](#run-examples)
5. [Configuration](#configuration)
6. [Acknowledgments](#acknowledgments)

## Introduction
**SwiftNet** is a powerful AI-driven system designed to streamline digital workflows. It combines mulitple agents specialized in different tasks to generate solution to user queries.

## Safety Guidelines
To ensure secure usage, follow these best practices:

- **Containerization**: Run AI agents in Docker containers for isolation.
- **Virtual Environments**: Use separate environments to avoid dependency conflicts.
- **Logging & Monitoring**: Regularly review logs to track agent activity.
- **Human Oversight**: Keep a human in the loop for critical decisions.
- **Access Control**: Limit permissions to prevent unauthorized access.
- **Data Protection**: Safeguard sensitive information with encryption and access controls.

## AI Agents
SwiftNet consists of specialized AI agents working together to solve complex tasks efficiently:

- **Task Master**: Orchestrates and manages workflows.
- **BrowserBot**: Performs web research and data extraction.
- **FileScout**: Handles file organization and retrieval.
- **CodeSmith**: Assists with coding and debugging.
- **Shell Commander**: Executes system commands and scripts.

## Getting Started
### Clone & Install
```sh
git clone https://github.com/wibi16/swiftnet.git
cd swiftnet/python
uv sync --all-extras
source .venv/bin/activate  # Windows users: .venv\Scripts\activate
```

### Install SwiftNet
```sh
cd packages/swiftnet
pip install -e .
```

### Set Up Your Tools
- Install Playwright: `playwright install --with-deps chromium`
- Ensure Docker is running
- Configure environment variables as needed

### Run Examples
Basic run with logs:
```sh
python examples/example.py --logs_dir ./logs
```

Run in interactive mode:
```sh
python examples/example.py --logs_dir ./logs --hil_mode
```

Save execution screenshots:
```sh
python examples/example.py --logs_dir ./logs --save_screenshots
```

## Configuration
For detailed setup instructions, refer to the configuration guide in the [documentation](https://kiwis-organization-2.gitbook.io/swiftnet).

## Acknowledgments
We appreciate contributions from the AI and open-source community. Your support helps improve SwiftNet's capabilities and reach.

