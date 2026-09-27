<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&height=200&text=JOB%20APPLICATION%20TRACKER&fontAlignY=38&desc=PIPELINE%20%E2%80%A2%20FOLLOWUPS%20%E2%80%A2%20CONVERSION&descAlignY=58&color=0:050505,55:202020,100:5a1616&fontColor=f5f5f5&descColor=d4d4d4" width="100%" />

![CRM](https://img.shields.io/badge/model-application%20CRM-111111?style=for-the-badge)
![Node](https://img.shields.io/badge/Node.js-20%2B-2b2b2b?style=for-the-badge&logo=nodedotjs)
![Tests](https://img.shields.io/badge/tests-node:test-7a1f1f?style=for-the-badge)

**A job-search pipeline for keeping applications out of random tabs, notes and inbox threads.**

</div>

---

## Current build

- saved → applied → assessment → interview → offer pipeline
- stage history
- notes
- follow-up scheduling
- overdue follow-up query
- interview / offer conversion stats
- opportunity scoring for skill match, hours, location, interest and remote work
- automated tests

## Why I built it

I wanted the logic to reflect how I actually think about applications: **what stage is this at, when do I follow up, and is this role worth prioritising?**

```txt
role found
   ↓
application stage
   ↓
follow-up + notes
   ↓
interview / offer data
   ↓
better prioritisation
```

## Use

```js
import { createApplication, moveStage, pipelineStats } from './src/index.js';
```

```bash
npm test
```

A later UI can add kanban columns, CV versions, reminders and calendar integration without changing the pipeline rules.

---

<div align="center"><sub>YukiShinobi // treat the job search like a pipeline, not a pile of tabs.</sub></div>
