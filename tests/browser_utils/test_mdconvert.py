#!/usr/bin/env python3 -m pytest
import io
import os
import shutil

import pytest
import requests
from autogen_magentic_one.markdown_browser import MarkdownConverter

skip_all = False

skip_exiftool = shutil.which("exiftool") is None

TEST_FILES_DIR = os.path.join(os.path.dirname(__file__), "test_files")

JPG_TEST_EXIFTOOL = {
    "Author": "AutoGen Authors",
    "Title": "AutoGen: Enabling Next-Gen LLM Applications via Multi-Agent Conversation",
    "Description": "AutoGen enables diverse LLM-based applications",
    "ImageSize": "1615x1967",
    "DateTimeOriginal": "2024:03:14 22:10:00",
}

PDF_TEST_URL = "https://arxiv.org/pdf/2308.08155v2.pdf"
PDF_TEST_STRINGS = ["While there is contemporaneous exploration of multi-agent approaches"]

YOUTUBE_TEST_URL = "https://www.youtube.com/watch?v=V2qZ_lgxTzg"
YOUTUBE_TEST_STRINGS = [
    "## AutoGen FULL Tutorial with Python (Step-By-Step)",
    "This is an intermediate tutorial for installing and using AutoGen locally",
    "PT15M4S",
    "the model we're going to be using today is GPT 3.5 turbo",  # From the transcript
]

XLSX_TEST_STRINGS = [
    "## 09060124-b5e7-4717-9d07-3c046eb",
    "6ff4173b-42a5-4784-9b19-f49caff4d93d",
    "affc7dad-52dc-4b98-9b5d-51e65d8a8ad0",
]

DOCX_TEST_STRINGS = [
    "314b0a30-5b04-470b-b9f7-eed2c2bec74a",
    "49e168b7-d2ae-407f-a055-2167576f39a1",
    "## d666f1f7-46cb-42bd-9a39-9a39cf2a509f",
    "# Abstract",
    "# Introduction",
    "AutoGen: Enabling Next-Gen LLM Applications via Multi-Agent Conversation",
]

PPTX_TEST_STRINGS = [
    "2cdda5c8-e50e-4db4-b5f0-9722a649f455",
    "04191ea8-5c73-4215-a1d3-1cfb43aaaf12",
    "44bf7d06-5e7a-4a40-a2e1-a2e42ef28c8a",
    "1b92870d-e3b5-4e65-8153-919f4ff45592",
    "AutoGen: Enabling Next-Gen LLM Applications via Multi-Agent Conversation",
]

BLOG_TEST_URL = "https://microsoft.github.io/autogen/blog/2023/04/21/LLM-tuning-math"
BLOG_TEST_STRINGS = [
    "Large language models (LLMs) are powerful tools that can generate natural language texts for various applications, such as chatbots, summarization, translation, and more. GPT-4 is currently the state of the art LLM in the world. Is model selection irrelevant? What about inference parameters?",
    "an example where high cost can easily prevent a generic complex",
]

WIKIPEDIA_TEST_URL = "https://en.wikipedia.org/wiki/Microsoft"
WIKIPEDIA_TEST_STRINGS = [
    "Microsoft entered the operating system (OS) business in 1980 with its own version of [Unix]",
    'Microsoft was founded by [Bill Gates](/wiki/Bill_Gates "Bill Gates")',
]
WIKIPEDIA_TEST_EXCLUDES = [
    "You are encouraged to create an account and log in",
    "154 languages",
    "move to sidebar",
]

SERP_TEST_URL = "https://www.bing.com/search?q=microsoft+wikipedia"
SERP_TEST_STRINGS = [
    "](https://en.wikipedia.org/wiki/Microsoft",
    "Microsoft Corporation is **an American multinational corporation and technology company headquartered** in Redmond",
    "1995–2007: Foray into the Web, Windows 95, Windows XP, and Xbox",
]
SERP_TEST_EXCLUDES = [
    "https://www.bing.com/ck/a?!&&p=",
    "data:image/svg+xml,%3Csvg%20width%3D",
]


@pytest.mark.skipif(
    skip_all,
    reason="do not run if dependency is not installed",
)
def test_mdconvert_remote() -> None:
    mdconvert = MarkdownConverter()

    # By URL
    result = mdconvert.convert(PDF_TEST_URL)
    for test_string in PDF_TEST_STRINGS:
        assert test_string in result.text_content

    # By stream
    response = requests.get(PDF_TEST_URL)
    result = mdconvert.convert_stream(io.BytesIO(response.content), file_extension=".pdf", url=PDF_TEST_URL)
    for test_string in PDF_TEST_STRINGS:
        assert test_string in result.text_content

    # Youtube
    # TODO: This test randomly fails for some reason. Haven't been able to repro it yet. Disabling until I can debug the issue
    # result = mdconvert.convert(YOUTUBE_TEST_URL)
    # for test_string in YOUTUBE_TEST_STRINGS:
    #     assert test_string in result.text_content


@pytest.mark.skipif(
    skip_all,
    reason="do not run if dependency is not installed",
)
def test_mdconvert_local() -> None:
    mdconvert = MarkdownConverter()

    # Test XLSX processing
    result = mdconvert.convert(os.path.join(TEST_FILES_DIR, "test.xlsx"))
    for test_string in XLSX_TEST_STRINGS:
        text_content = result.text_content.replace("\\", "")
        assert test_string in text_content

    # Test DOCX processing
    result = mdconvert.convert(os.path.join(TEST_FILES_DIR, "test.docx"))
    for test_string in DOCX_TEST_STRINGS:
        text_content = result.text_content.replace("\\", "")
        assert test_string in text_content

    # Test PPTX processing
    result = mdconvert.convert(os.path.join(TEST_FILES_DIR, "test.pptx"))
    for test_string in PPTX_TEST_STRINGS:
        text_content = result.text_content.replace("\\", "")
        assert test_string in text_content

    # Test HTML processing
    result = mdconvert.convert(os.path.join(TEST_FILES_DIR, "test_blog.html"), url=BLOG_TEST_URL)
    for test_string in BLOG_TEST_STRINGS:
        text_content = result.text_content.replace("\\", "")
        assert test_string in text_content

    # Test Wikipedia processing
    result = mdconvert.convert(os.path.join(TEST_FILES_DIR, "test_wikipedia.html"), url=WIKIPEDIA_TEST_URL)
    text_content = result.text_content.replace("\\", "")
    for test_string in WIKIPEDIA_TEST_EXCLUDES:
        assert test_string not in text_content
    for test_string in WIKIPEDIA_TEST_STRINGS:
        assert test_string in text_content

    # Test Bing processing
    result = mdconvert.convert(os.path.join(TEST_FILES_DIR, "test_serp.html"), url=SERP_TEST_URL)
    text_content = result.text_content.replace("\\", "")
    for test_string in SERP_TEST_EXCLUDES:
        assert test_string not in text_content
    for test_string in SERP_TEST_STRINGS:
        assert test_string in text_content


@pytest.mark.skipif(
    skip_exiftool,
    reason="do not run if exiftool is not installed",
)
def test_mdconvert_exiftool() -> None:
    mdconvert = MarkdownConverter()

    # Test JPG metadata processing
    result = mdconvert.convert(os.path.join(TEST_FILES_DIR, "test.jpg"))
    for key in JPG_TEST_EXIFTOOL:
        target = f"{key}: {JPG_TEST_EXIFTOOL[key]}"
        assert target in result.text_content


if __name__ == "__main__":
    """Runs this file's tests from the command line."""
    # test_mdconvert_remote()
    test_mdconvert_local()
    # test_mdconvert_exiftool()
