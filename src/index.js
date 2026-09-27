export const STAGES = ['saved', 'applied', 'assessment', 'interview', 'offer', 'rejected', 'withdrawn'];

export function createApplication({ id, company, role, location = '', source = '', appliedAt = null }) {
  if (!company || !role) throw new Error('company and role are required');
  return {
    id,
    company,
    role,
    location,
    source,
    stage: appliedAt ? 'applied' : 'saved',
    appliedAt,
    followUpAt: null,
    notes: [],
    history: [{ stage: appliedAt ? 'applied' : 'saved', at: appliedAt ?? new Date().toISOString() }]
  };
}

export function moveStage(application, stage, at = new Date().toISOString()) {
  if (!STAGES.includes(stage)) throw new Error(`Unknown stage: ${stage}`);
  return {
    ...application,
    stage,
    history: [...application.history, { stage, at }]
  };
}

export function addNote(application, text, at = new Date().toISOString()) {
  return { ...application, notes: [...application.notes, { text: text.trim(), at }] };
}

export function setFollowUp(application, when) {
  return { ...application, followUpAt: new Date(when).toISOString() };
}

export function dueFollowUps(applications, now = new Date()) {
  return applications
    .filter(app => app.followUpAt && new Date(app.followUpAt) <= now && !['offer', 'rejected', 'withdrawn'].includes(app.stage))
    .sort((a, b) => new Date(a.followUpAt) - new Date(b.followUpAt));
}

export function pipelineStats(applications) {
  const counts = Object.fromEntries(STAGES.map(stage => [stage, 0]));
  for (const app of applications) counts[app.stage] += 1;
  const applied = applications.filter(a => a.appliedAt).length;
  const interviews = applications.filter(a => ['interview', 'offer'].includes(a.stage) || a.history.some(h => h.stage === 'interview')).length;
  const offers = applications.filter(a => a.stage === 'offer' || a.history.some(h => h.stage === 'offer')).length;
  return {
    total: applications.length,
    counts,
    interviewRate: applied ? Number(((interviews / applied) * 100).toFixed(1)) : 0,
    offerRate: applied ? Number(((offers / applied) * 100).toFixed(1)) : 0
  };
}

export function scoreOpportunity({ remote = false, hoursPerWeek = 40, skillMatch = 0, locationScore = 0, interest = 0 }) {
  const hoursFit = hoursPerWeek <= 20 ? 20 : hoursPerWeek <= 30 ? 10 : 0;
  return Math.min(100, Math.round(skillMatch * 0.45 + locationScore * 0.2 + interest * 0.25 + hoursFit + (remote ? 5 : 0)));
}
