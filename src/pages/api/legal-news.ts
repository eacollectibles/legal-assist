{
  "success": true,
  "count": 0,
  "cases": [],
  "debug": [
    "HTTP 403 for onltb",
    "Error: fetch failed for onhrt",
    ...
  ]
}
```

**What to look for in the debug array:**
- `"OK: 20 items from onltb"` = Working ✅
- `"HTTP 403..."` = CanLII blocking the server
- `"Error: fetch failed"` = Network issue
- `"Empty response"` = Got response but no content

---

**Publish and visit:**
```
https://legalassist.london/api/legal-news?debug=true
