import asyncio
import json
from autogen_ext.models.openai import OpenAIChatCompletionClient
from autogen_ext.teams.magentic_one import MagenticOne
from autogen_agentchat.ui import Console
import sys
import warnings


async def serve_magentic(task=None, key=None, human_interaction=False):
    
    client = OpenAIChatCompletionClient(
        model="meta-llama/Meta-Llama-3-70B-Instruct",
        base_url="https://api.deepinfra.com/v1/openai",
        api_key=key,
        model_info={
            "vision": True,
            "function_calling": True,
            "json_output": True,
        })
    
    m1 = MagenticOne(client=client, hil_mode=human_interaction)
    result = await Console(m1.run_stream(task=task))
    print(result)
    sys.stdout.flush()


if __name__ == "__main__":
    try:
        data_str = sys.argv[1]
        data = json.loads(data_str)
        warnings.filterwarnings(action="ignore", message="unclosed", category=ResourceWarning)
        asyncio.run(serve_magentic(task=data['task'], key=data['key'], human_interaction=data['humanInteraction']))

    except Exception as e:
        print(f"Error occurred: {e}")
        # sys.stdout.flush()
