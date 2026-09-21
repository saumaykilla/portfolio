# syntax=docker/dockerfile:1

ARG PYTHON_VERSION=3.11
FROM python:${PYTHON_VERSION}-slim AS base

ENV PYTHONUNBUFFERED=1
ENV PIP_DISABLE_PIP_VERSION_CHECK=1

FROM base AS build

RUN apt-get update && apt-get install -y \
    gcc \
    g++ \
    python3-dev \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY requirements.txt ./
RUN python -m venv .venv
ENV PATH="/app/.venv/bin:$PATH"
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

FROM base

ARG UID=10001
RUN adduser \
    --disabled-password \
    --gecos "" \
    --home "/app" \
    --shell "/sbin/nologin" \
    --uid "${UID}" \
    appuser

WORKDIR /app

COPY --from=build --chown=appuser:appuser /app /app

ENV PATH="/app/.venv/bin:$PATH"

USER appuser

CMD ["python", "agent.py", "start"]
