# DECISIONS.md

## 1. Why this ingestion strategy?

I chose a **snapshot-based ingestion strategy with retries, backoff, and resumable processing** rather than continuously scraping a source in one long-running request.

The obvious alternative was a simple fetch-and-process pipeline: request the source, parse everything, and continue until completion. I rejected that because it is fragile when a source rate-limits, blocks, times out, or changes its response during a run.

With snapshots, each successful fetch is stored before processing. If a source blocks the next request, the system can back off and retry without losing the last known state. Change detection can then compare the latest successful snapshot against the previous one. This makes ingestion more resilient and also gives the product a reliable "what changed?" foundation.

## 2. Trade-off under the time limit

Because the implementation had to be completed quickly, I prioritized the **core product experience and ingestion architecture** over building a production-grade ingestion service.

The demo uses a controlled dataset and focuses on demonstrating how the product would detect and present changes. With a real week, I would implement persistent ingestion jobs, source-specific rate limits, exponential backoff with jitter, request timeouts, checkpointing, failure states, structured logging, and monitoring. I would also test behavior against sources that return rate limits, errors, partial responses, or schema changes.

## 3. Where I used AI

I used AI tools to accelerate the initial implementation, particularly for generating the page structure, styling, responsive CSS, and some interaction logic.

I did not treat the generated output as final. I personally reviewed the implementation, tested the page at **390px and 1440px**, checked for horizontal overflow and broken responsive behavior, and changed the visual hierarchy, spacing, typography, interaction behavior, and product presentation where the generated result felt generic or inconsistent with the intended design.

The final decisions about the product concept, visual direction, ingestion approach, trade-offs, and what was acceptable to ship were mine.
