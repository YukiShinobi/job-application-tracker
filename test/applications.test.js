import test from 'node:test';
import assert from 'node:assert/strict';
import { createApplication, dueFollowUps, moveStage, pipelineStats, scoreOpportunity, setFollowUp } from '../src/index.js';

test('moves applications through the pipeline', () => {
  let app = createApplication({ id: '1', company: 'Example', role: 'Engineer', appliedAt: '2026-09-20T10:00:00Z' });
  app = moveStage(app, 'interview');
  assert.equal(app.stage, 'interview');
  assert.equal(pipelineStats([app]).interviewRate, 100);
});

test('returns due follow ups', () => {
  let app = createApplication({ id: '1', company: 'Example', role: 'Engineer' });
  app = setFollowUp(app, '2026-09-25T10:00:00Z');
  assert.equal(dueFollowUps([app], new Date('2026-09-27T10:00:00Z')).length, 1);
});

test('opportunity score stays within bounds', () => {
  assert.ok(scoreOpportunity({ remote: true, hoursPerWeek: 20, skillMatch: 90, locationScore: 90, interest: 100 }) <= 100);
});
