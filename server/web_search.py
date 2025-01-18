# filename: web_search.py
import requests
from bs4 import BeautifulSoup

def search_paper_sword_making():
    url = "https://www.google.com/search"
    params = {"q": "paper sword making"}
    headers = {"User-Agent": "Mozilla/5.0"}
    response = requests.get(url, params=params, headers=headers)
    soup = BeautifulSoup(response.text, "html.parser")
    results = soup.find_all("div", class_="rc")
    for result in results:
        title = result.find("h3").text
        link = result.find("a")["href"]
        snippet = result.find("span", class_="st").text
        print(f"Title: {title}\nLink: {link}\nSnippet: {snippet}\n")

search_paper_sword_making()
