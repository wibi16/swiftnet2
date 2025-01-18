"""This example demonstrates a human user interacting with a file surfer agent
to navigate the file system. The human user and the file surfer agent takes turn
to write input or perform actions, orchestrated by an round-robin orchestrator agent."""

import asyncio
import json
import logging
import os

from autogen_core import EVENT_LOGGER_NAME, AgentId, AgentProxy, SingleThreadedAgentRuntime
from autogen_core.models._model_client import ChatCompletionClient
from autogen_magentic_one.agents.file_surfer import FileSurfer
from autogen_magentic_one.agents.orchestrator import RoundRobinOrchestrator
from autogen_magentic_one.agents.user_proxy import UserProxy
from autogen_magentic_one.messages import RequestReplyMessage
from autogen_magentic_one.utils import LogHandler


async def main() -> None:
    # Create the runtime.
    runtime = SingleThreadedAgentRuntime()

    # Get an appropriate client
    client = ChatCompletionClient.load_component(json.loads(os.environ["CHAT_COMPLETION_CLIENT_CONFIG"]))

    # Register agents.
    await FileSurfer.register(runtime, "file_surfer", lambda: FileSurfer(model_client=client))
    file_surfer = AgentProxy(AgentId("file_surfer", "default"), runtime)

    await UserProxy.register(runtime, "UserProxy", lambda: UserProxy())
    user_proxy = AgentProxy(AgentId("UserProxy", "default"), runtime)

    await RoundRobinOrchestrator.register(
        runtime, "orchestrator", lambda: RoundRobinOrchestrator([file_surfer, user_proxy])
    )

    runtime.start()
    await runtime.send_message(RequestReplyMessage(), user_proxy.id)
    await runtime.stop_when_idle()


if __name__ == "__main__":
    logger = logging.getLogger(EVENT_LOGGER_NAME)
    logger.setLevel(logging.INFO)
    log_handler = LogHandler()
    logger.handlers = [log_handler]
    asyncio.run(main())
