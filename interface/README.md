# SwiftNet Interface

This repository contains a preview interface for interacting with the SwiftNet system. It includes helper classes, and example usage.


## Usage

### SwiftNetHelper

The SwiftNetHelper class provides an interface to interact with the SwiftNet system. It saves logs to a user-specified directory and provides methods to run tasks, stream logs, and retrieve the final answer.

The class provides the following methods:
- async initialize(self) -> None: Initializes the SwiftNet system, setting up agents and runtime.
- async run_task(self, task: str) -> None: Runs a specific task through the SwiftNet system.
- get_final_answer(self) -> Optional[str]: Retrieves the final answer from the Orchestrator.
- async stream_logs(self) -> AsyncGenerator[Dict[str, Any], None]: Streams logs from the system as they are generated.
- get_all_logs(self) -> List[Dict[str, Any]]: Retrieves all logs that have been collected so far.

We show an example of how to use the SwiftNetHelper class to in [example_swiftnet_helper.py](example_swiftnet_helper.py).

```python
from swiftnet_helper import SwiftNetHelper
import asyncio
import json

async def swiftnet_example():
    # Create and initialize SwiftNet
    magnetic_one = SwiftNetHelper(logs_dir="./logs")
    await magnetic_one.initialize()
    print("SwiftNet initialized.")
    
    # Start a task and stream logs
    task = "How many members are in the MSR HAX Team"
    task_future = asyncio.create_task(magnetic_one.run_task(task))

    # Stream and process logs
    async for log_entry in magnetic_one.stream_logs():
        print(json.dumps(log_entry, indent=2))

    # Wait for task to complete
    await task_future

    # Get the final answer
    final_answer = magnetic_one.get_final_answer()

    if final_answer is not None:
        print(f"Final answer: {final_answer}")
    else:
        print("No final answer found in logs.")
```
