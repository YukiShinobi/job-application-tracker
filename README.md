# Job Application Tracker

A small application CRM for keeping job searches organised instead of losing everything across browser tabs and email threads.

I built the domain layer around the way I actually think about applications: stage, next follow-up, notes, interview conversion and whether the role is even worth prioritising.

## Features

- saved → applied → assessment → interview → offer pipeline
- stage history
- notes
- follow-up scheduling
- overdue follow-up query
- interview / offer conversion stats
- opportunity scoring for hours, skill match, location, interest and remote work

```js
import { createApplication, moveStage, pipelineStats } from './src/index.js';
```

This is the logic layer first. A full UI can sit on top later with kanban columns, reminders, CV versions and calendar integration.

Requires Node 20+.
