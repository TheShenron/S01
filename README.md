# Docker Playwright Test Runner

This project builds a Docker image and runs a container that uses a mounted `index.html` file and outputs a Playwright report to a local folder.

---

## Prerequisites

- Docker installed
- `index.html` file available in the project root

---

## Build Docker Image

Run this command from the project directory:

```bash
docker build -t d-test-01 .


docker run --rm \
  -v "$(pwd)/index.html:/test_runner/index.html" \
  -v "$(pwd)/playwright-report:/test_runner/playwright-report" \
  d-test-01