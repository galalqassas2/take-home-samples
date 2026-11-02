# Task queue

A task queue on Postgres, exposed over HTTP. This is a partial solution: the queue itself is done and tested, the rest of the brief is not.

## Run it

Needs Node 24 and Docker.

```bash
npm install
npm start
```

## Test it

```bash
npm run db
npm test
```

## What is implemented

The storage and the eight endpoints: atomic claims with `FOR UPDATE SKIP LOCKED`, leases and their recovery, retries with per-queue backoff, a DLQ with requeue, and idempotent enqueue.

## What is not

I ran out of time before these:

- The worker harness, so nothing processes tasks yet.
- The `llm`, `js` and `http` handlers.
- The page showing the queues.
- The `concurrent-claim` test.
- `DESIGN.md`.

## With another day

The harness and handlers first, then the `concurrent-claim` test, as that is what proves the claim holds.
