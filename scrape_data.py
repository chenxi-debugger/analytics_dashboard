import requests

url = "https://greakproject.vercel.app/_next/data/O4-JBkei08FdW1WwmIulZ/pages/account-settings/billing-plan.json?tab=billing-plan"

response = requests.get(url)
if response.status_code == 200:
    data = response.json()
    print(data)  # or extract what you need: data['pageProps']
else:
    print(f"❌ Request failed with status {response.status_code}")

import json
with open("billing_plan.json", "w") as f:
    json.dump(data, f, indent=2)