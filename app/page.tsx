"use client";

import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";

type Stop = {
  id: number;
  chapter: string;
  activity: string;
  location: string;
  shortLocation: string;
  clue: string;
  nudge: string;
  whyHere: string;
  photoPrompt: string;
  time: string;
  format: string;
  context: string;
  steps: string[];
  responseLabel: string;
  placeholder: string;
  debrief: string;
  mapUrl: string;
};

const stops: Stop[] = [
  {
    id: 1,
    chapter: "School as Tribes",
    activity: "The Double Lens",
    location: "Harold Clark Simmons Hall",
    shortLocation: "Harold Clark Simmons Hall",
    clue:
      "Begin where educators gather and your class began. Two campus buildings carry the Simmons name—start at the one named for Harold Clark.",
    nudge: "Meet outside the main entrance to Harold Clark Simmons Hall.",
    whyHere:
      "This is your home base: a familiar place to notice how the same campus can feel different depending on the role you occupy.",
    photoPrompt:
      "Take a team photo with the building name or entrance in view. Photograph people only with their permission.",
    time: "5 min",
    format: "Solo → pair",
    context:
      "School culture comes into focus when we look through two lenses: what it feels like to learn here and what it feels like to lead or teach here.",
    steps: [
      "Take 90 seconds to answer both questions: What is it like to be a student on this campus? What is it like to be an educator here?",
      "Pair up and share one line from each answer.",
      "Name one place where the two perspectives align—and one place where they pull apart.",
    ],
    responseLabel: "Capture your group’s most interesting gap",
    placeholder:
      "Students experience… Educators experience… The gap tells us…",
    debrief:
      "What does the gap between those two views reveal about the culture?",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Harold+Clark+Simmons+Hall+SMU",
  },
  {
    id: 2,
    chapter: "Artifacts, Architecture, and Routines",
    activity: "Jargon vs. Soul",
    location: "Annette Caldwell Simmons Hall — Dean’s Office, 2nd floor",
    shortLocation: "Annette Caldwell Simmons Hall",
    clue:
      "Find the other Simmons sibling. Go up one level beyond the ground floor, where the school’s dean and official voice have a home.",
    nudge:
      "Annette Caldwell Simmons Hall, outside the Dean’s Office on the second floor. Keep hallways clear and voices low.",
    whyHere:
      "Leadership spaces are full of official language—mission statements, priorities, policies, and signs. This stop asks what that language makes people feel.",
    photoPrompt:
      "Photograph your team beside the Dean’s Office sign or a nearby school artifact—without capturing private office materials.",
    time: "6 min",
    format: "Pairs",
    context:
      "Bureaucratic language can become cold and detached from purpose. Your job is to put the human meaning back in.",
    steps: [
      "Find or recall three phrases common in school meetings, emails, policies, or professional learning.",
      "Translate each phrase into purpose-driven, human language.",
      "Choose the rewrite most likely to ‘capture the heart and stir the soul.’",
    ],
    responseLabel: "Save your strongest before → after rewrite",
    placeholder:
      "Before: ‘Improve stakeholder engagement.’\nAfter: ‘Make sure every family knows their voice changes what we do.’",
    debrief:
      "What gets lost when we default to metric language—and what might change if we spoke more plainly?",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Annette+Caldwell+Simmons+Hall+SMU",
  },
  {
    id: 3,
    chapter: "History",
    activity: "The 60-Second Origin Story",
    location: "Moody Hall",
    shortLocation: "Moody Hall",
    clue:
      "Do not follow the roar of the arena. Find the quieter Moody: a graduate-student home for writing, fellowships, collaboration, and reflection.",
    nudge:
      "Moody Hall—not Moody Coliseum. Look for the graduate and advanced studies hub.",
    whyHere:
      "Moody Hall is built around graduate student life. Use that future-facing setting to notice the history each of you carries into graduate study.",
    photoPrompt:
      "Photograph the Moody Hall name, an exterior detail, or your group using a communal space. Respect anyone studying nearby.",
    time: "6 min",
    format: "Pairs",
    context:
      "Every school has an origin story—and ‘reform ghosts’ from earlier initiatives that still shape how people work today.",
    steps: [
      "Partner A has 60 seconds to tell one story about how their school became what it is.",
      "Switch storytellers.",
      "Each person names one reform ghost—an old policy, initiative, or habit that still lingers.",
    ],
    responseLabel: "Name one story and its lingering reform ghost",
    placeholder:
      "Origin story: …\nThe reform ghost we still feel is … because …",
    debrief:
      "Without that story, what would an outsider misunderstand about the culture?",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Moody+Hall+SMU+Dallas",
  },
  {
    id: 4,
    chapter: "Myth, Vision, and Values",
    activity: "Sort the Iceberg",
    location: "Meadows Museum / Greer Garson Plaza",
    shortLocation: "Meadows Museum",
    clue:
      "Seek the campus place where Spanish masters live. Pause outside, where art, architecture, and public symbols invite interpretation.",
    nudge:
      "Meet at the Meadows Museum entrance or Greer Garson Plaza. Museum admission is not required.",
    whyHere:
      "Museums make hidden meaning visible through objects and interpretation—perfect conditions for looking below a culture’s surface.",
    photoPrompt:
      "Create a ‘living sculpture’ team pose near the museum sign or plaza. Do not climb on artwork or photograph restricted interiors.",
    time: "7 min",
    format: "Small group",
    context:
      "Culture has four layers: values (conscious standards), beliefs (views held as true), assumptions (often invisible), and norms (unwritten rules).",
    steps: [
      "Generate four real statements or observations from schools you know.",
      "Sort each into values, beliefs, assumptions, or norms.",
      "Choose the hardest item to place and explain what evidence would help.",
    ],
    responseLabel: "Record the hardest item and your best category",
    placeholder:
      "Observation: …\nWe placed it under [value / belief / assumption / norm] because …",
    debrief:
      "Which cultural layer was hardest to surface, and what reflective practice might reveal it?",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Meadows+Museum+SMU",
  },
  {
    id: 5,
    chapter: "Stories & Tales",
    activity: "The Bus Driver Moment",
    location: "Fondren Library",
    shortLocation: "Fondren Library",
    clue:
      "Find more than two million voices and the people who help you hear the right one. The first floor hums; higher floors grow quieter.",
    nudge:
      "Fondren Library, the main library. Meet outside or in a conversation-friendly first-floor area.",
    whyHere:
      "A library runs on visible expertise and invisible care. Notice the people whose real contribution is larger than their job title.",
    photoPrompt:
      "Photograph a useful library feature your group wants to remember—a sign, service point, study area, or exterior detail. Avoid bystanders.",
    time: "5 min",
    format: "Solo → group",
    context:
      "Use this frame: ‘My assigned responsibility is… but my real job is…’ Great cultures remember the work that job descriptions miss.",
    steps: [
      "Identify one person or role on a campus whose real job is larger than the title suggests.",
      "Write a two-sentence story showing what that person actually does for the culture.",
      "Share without analyzing—just listen for the values inside each story.",
    ],
    responseLabel: "Write your two-sentence culture story",
    placeholder:
      "Their assigned responsibility is… But their real job is…",
    debrief:
      "Whose stories go untold, and how could a school make room for them regularly?",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Fondren+Library+SMU",
  },
  {
    id: 6,
    chapter: "Rituals",
    activity: "Ritual or Routine?",
    location: "Hughes-Trigg Student Center",
    shortLocation: "Hughes-Trigg",
    clue:
      "Find the campus living room: IDs, meals, organizations, support, and chance encounters all cross beneath one roof.",
    nudge:
      "Hughes-Trigg Student Center. Meet near the main atrium and stay out of busy walkways.",
    whyHere:
      "Student centers turn repeated actions—eating, meeting, asking for help—into belonging. Some routines carry mission; others merely repeat.",
    photoPrompt:
      "Photograph one feature that signals ‘community’ to your group. If people appear, ask first or frame them out.",
    time: "6 min",
    format: "Small group",
    context:
      "Positive rituals build culture. Hollow routines keep moving after their purpose has disappeared.",
    steps: [
      "Brainstorm six daily or weekly routines from schools you know.",
      "Sort them into mission-connected rituals or hollow habits.",
      "Choose one hollow routine and give it a one-sentence purpose that could bring it back to life.",
    ],
    responseLabel: "Rewrite one hollow routine",
    placeholder:
      "Routine: …\nNew purpose: We do this so that …",
    debrief:
      "What is the smallest change that could reconnect this routine to mission?",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Hughes-Trigg+Student+Center+SMU",
  },
  {
    id: 7,
    chapter: "Ceremonies and Traditions",
    activity: "The 60-Second Ceremony Pitch",
    location: "Dallas Hall steps and Rotunda",
    shortLocation: "Dallas Hall",
    clue:
      "Finish at the Hilltop’s oldest landmark, where Mustangs begin and complete their SMU journey through a symbolic passage.",
    nudge:
      "Dallas Hall. Meet on the front steps; enter the Rotunda only if the building is open and your group can do so quietly.",
    whyHere:
      "Dallas Hall anchors the Rotunda Processional and Recessional—traditions that mark entry into and departure from the SMU community.",
    photoPrompt:
      "Take a final team photo on the Dallas Hall steps or with the building behind you. Keep entrances and stairs clear.",
    time: "7 min",
    format: "Small group",
    context:
      "A living ceremony combines purpose, symbols, stories, values, and documentation. Your challenge is to revive one that feels merely obligatory.",
    steps: [
      "Choose a ceremony from a school you know that feels flat or performative.",
      "Name three missing elements: purpose, symbols, stories, values, participation, or documentation.",
      "Prepare a 60-second pitch with one concrete change for each missing element.",
    ],
    responseLabel: "Draft your 60-second ceremony pitch",
    placeholder:
      "We would redesign… The three changes are… Our safeguard against performative ritual is…",
    debrief:
      "What could make your redesign performative—and what safeguard would keep it meaningful?",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Dallas+Hall+SMU",
  },
];

const storageKey = "smu-culture-trail-v1";

type SavedState = {
  completed: number[];
  responses: Record<number, string>;
  teamName: string;
};

export default function Home() {
  const [ready, setReady] = useState(false);
  const [started, setStarted] = useState(false);
  const [activeId, setActiveId] = useState(1);
  const [completed, setCompleted] = useState<number[]>([]);
  const [responses, setResponses] = useState<Record<number, string>>({});
  const [teamName, setTeamName] = useState("");
  const [photos, setPhotos] = useState<Record<number, string>>({});
  const [alternatives, setAlternatives] = useState<number[]>([]);
  const [nudges, setNudges] = useState<number[]>([]);
  const fileInputs = useRef<Record<number, HTMLInputElement | null>>({});
  const photoUrls = useRef<Set<string>>(new Set());

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved) as SavedState;
        setCompleted(parsed.completed ?? []);
        setResponses(parsed.responses ?? {});
        setTeamName(parsed.teamName ?? "");
        const next = stops.find((stop) => !parsed.completed?.includes(stop.id));
        setActiveId(next?.id ?? 7);
        setStarted(Boolean(parsed.teamName || parsed.completed?.length));
      }
    } catch {
      // A fresh trail is a safe fallback if browser storage is unavailable.
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    const state: SavedState = { completed, responses, teamName };
    window.localStorage.setItem(storageKey, JSON.stringify(state));
  }, [completed, ready, responses, teamName]);

  useEffect(() => {
    const urls = photoUrls.current;
    return () => urls.forEach((url) => URL.revokeObjectURL(url));
  }, []);

  const activeStop = stops[activeId - 1];
  const progress = Math.round((completed.length / stops.length) * 100);
  const allDone = completed.length === stops.length;
  const firstIncomplete = stops.find((stop) => !completed.includes(stop.id))?.id ?? 7;

  const unlocked = useMemo(
    () => new Set(stops.filter((stop) => stop.id <= firstIncomplete).map((stop) => stop.id)),
    [firstIncomplete],
  );

  function handlePhoto(stopId: number, event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setPhotos((current) => {
      if (current[stopId]) {
        URL.revokeObjectURL(current[stopId]);
        photoUrls.current.delete(current[stopId]);
      }
      const nextUrl = URL.createObjectURL(file);
      photoUrls.current.add(nextUrl);
      return { ...current, [stopId]: nextUrl };
    });
  }

  function completeStop(stopId: number) {
    if (!completed.includes(stopId)) {
      const nextCompleted = [...completed, stopId].sort((a, b) => a - b);
      setCompleted(nextCompleted);
    }
    const next = stops.find((stop) => stop.id > stopId && !completed.includes(stop.id));
    if (next) {
      setActiveId(next.id);
      window.setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 60);
    }
  }

  function resetTrail() {
    if (!window.confirm("Reset all team notes and completed stops on this device?")) return;
    Object.values(photos).forEach((url) => URL.revokeObjectURL(url));
    photoUrls.current.clear();
    setCompleted([]);
    setResponses({});
    setPhotos({});
    setAlternatives([]);
    setNudges([]);
    setTeamName("");
    setStarted(false);
    setActiveId(1);
    window.localStorage.removeItem(storageKey);
  }

  if (!ready) return <main className="loading">Opening the trail…</main>;

  if (!started) {
    return (
      <main className="welcome-shell">
        <div className="welcome-card">
          <div className="eyebrow">SMU · Graduate Student Field Quest</div>
          <div className="welcome-mark" aria-hidden="true">7</div>
          <h1>The Culture Trail</h1>
          <p className="welcome-lede">
            Seven campus stops. Seven lenses on school culture. One team field guide that unlocks as you go.
          </p>
          <div className="trail-facts" aria-label="Trail details">
            <span>↗ 7 stops</span>
            <span>◷ 60–75 min</span>
            <span>◎ Teams of 3–4</span>
          </div>
          <label className="team-field">
            <span>Team name</span>
            <input
              value={teamName}
              onChange={(event) => setTeamName(event.target.value)}
              placeholder="e.g., The Culture Detectives"
              autoComplete="off"
            />
          </label>
          <button
            className="primary-button start-button"
            onClick={() => setStarted(true)}
            disabled={!teamName.trim()}
          >
            Start at Simmons Hall <span aria-hidden="true">→</span>
          </button>
          <p className="privacy-note">
            Photos stay on this device and are not sent or saved. Your written field notes and progress are saved only in this browser.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <div>
          <div className="eyebrow">SMU · The Culture Trail</div>
          <div className="team-title">{teamName}</div>
        </div>
        <div className="progress-compact" aria-label={`${completed.length} of 7 stops complete`}>
          <strong>{completed.length}/7</strong>
          <span>complete</span>
        </div>
      </header>

      <div className="progress-track" aria-hidden="true">
        <span style={{ width: `${progress}%` }} />
      </div>

      <div className="app-grid">
        <aside className="trail-nav" aria-label="Scavenger hunt stops">
          <div className="nav-heading">
            <span>Your route</span>
            <button onClick={resetTrail}>Reset</button>
          </div>
          <ol>
            {stops.map((stop) => {
              const isComplete = completed.includes(stop.id);
              const isUnlocked = unlocked.has(stop.id) || isComplete;
              return (
                <li key={stop.id}>
                  <button
                    className={`${activeId === stop.id ? "active" : ""} ${isComplete ? "complete" : ""}`}
                    onClick={() => isUnlocked && setActiveId(stop.id)}
                    disabled={!isUnlocked}
                    aria-current={activeId === stop.id ? "step" : undefined}
                  >
                    <span className="stop-dot">{isComplete ? "✓" : stop.id}</span>
                    <span>
                      <strong>{isUnlocked ? stop.shortLocation : "Next clue locked"}</strong>
                      <small>{isUnlocked ? stop.activity : "Complete the previous stop"}</small>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </aside>

        <section className="stop-stage" aria-live="polite">
          {allDone && activeId === 7 && completed.includes(7) ? (
            <div className="finish-card">
              <div className="finish-burst" aria-hidden="true">✦</div>
              <div className="eyebrow">Trail complete</div>
              <h1>Culture detectives,<br />case closed.</h1>
              <p>
                {teamName} visited seven corners of the Hilltop and uncovered the stories, routines, symbols, and ceremonies that shape a school.
              </p>
              <div className="finish-stats">
                <span><strong>7</strong> campus stops</span>
                <span><strong>7</strong> culture lenses</span>
                <span><strong>1</strong> final debrief</span>
              </div>
              <button className="secondary-button" onClick={() => setActiveId(1)}>
                Review field notes
              </button>
              <button className="text-button" onClick={resetTrail}>Start a new team</button>
            </div>
          ) : (
            <StopCard
              stop={activeStop}
              isComplete={completed.includes(activeStop.id)}
              photo={photos[activeStop.id]}
              useAlternative={alternatives.includes(activeStop.id)}
              showNudge={nudges.includes(activeStop.id)}
              response={responses[activeStop.id] ?? ""}
              inputRef={(element) => { fileInputs.current[activeStop.id] = element; }}
              onPhoto={(event) => handlePhoto(activeStop.id, event)}
              onAlternative={() =>
                setAlternatives((current) =>
                  current.includes(activeStop.id)
                    ? current.filter((id) => id !== activeStop.id)
                    : [...current, activeStop.id],
                )
              }
              onNudge={() =>
                setNudges((current) =>
                  current.includes(activeStop.id)
                    ? current.filter((id) => id !== activeStop.id)
                    : [...current, activeStop.id],
                )
              }
              onResponse={(value) =>
                setResponses((current) => ({ ...current, [activeStop.id]: value }))
              }
              onComplete={() => completeStop(activeStop.id)}
            />
          )}
        </section>
      </div>
    </main>
  );
}

type StopCardProps = {
  stop: Stop;
  isComplete: boolean;
  photo?: string;
  useAlternative: boolean;
  showNudge: boolean;
  response: string;
  inputRef: (element: HTMLInputElement | null) => void;
  onPhoto: (event: ChangeEvent<HTMLInputElement>) => void;
  onAlternative: () => void;
  onNudge: () => void;
  onResponse: (value: string) => void;
  onComplete: () => void;
};

function StopCard({
  stop,
  isComplete,
  photo,
  useAlternative,
  showNudge,
  response,
  inputRef,
  onPhoto,
  onAlternative,
  onNudge,
  onResponse,
  onComplete,
}: StopCardProps) {
  const checkedIn = Boolean(photo || useAlternative || isComplete);
  const canComplete = checkedIn && response.trim().length >= 8;

  return (
    <article className="stop-card">
      <div className="stop-hero">
        <div className="stop-number" aria-hidden="true">{String(stop.id).padStart(2, "0")}</div>
        <div>
          <div className="eyebrow">Stop {stop.id} of 7 · Chapter {stop.id}</div>
          <h1>{stop.activity}</h1>
          <p className="chapter-name">{stop.chapter}</p>
        </div>
      </div>

      <section className="clue-panel">
        <div className="panel-icon" aria-hidden="true">?</div>
        <div>
          <span className="section-label">Your clue</span>
          <p>{stop.clue}</p>
          <div className="clue-actions">
            <button className="text-button" onClick={onNudge}>
              {showNudge ? "Hide nudge" : "Need a nudge?"}
            </button>
            {showNudge && (
              <a href={stop.mapUrl} target="_blank" rel="noreferrer">Open directions ↗</a>
            )}
          </div>
          {showNudge && <div className="nudge"><strong>{stop.location}</strong><br />{stop.nudge}</div>}
        </div>
      </section>

      <section className="checkin-section">
        <div className="section-heading-row">
          <div>
            <span className="section-label">Arrive & check in</span>
            <h2>Unlock the field activity</h2>
          </div>
          <span className={`status-pill ${checkedIn ? "unlocked" : ""}`}>
            {checkedIn ? "Unlocked" : "Locked"}
          </span>
        </div>
        <p className="why-here"><strong>Why here?</strong> {stop.whyHere}</p>
        <p className="photo-prompt">{stop.photoPrompt}</p>
        <input
          ref={inputRef}
          id={`photo-${stop.id}`}
          className="visually-hidden"
          type="file"
          accept="image/*"
          capture="environment"
          onChange={onPhoto}
        />
        {photo ? (
          <div className="photo-preview">
            {/* The selected image is a temporary local object URL. */}
            <img src={photo} alt={`Local check-in preview for ${stop.location}`} />
            <label htmlFor={`photo-${stop.id}`}>Retake / choose another</label>
          </div>
        ) : (
          <label className="upload-button" htmlFor={`photo-${stop.id}`}>
            <span aria-hidden="true">＋</span>
            Take or choose a photo
          </label>
        )}
        <button className="access-button" onClick={onAlternative}>
          {useAlternative ? "Use a photo instead" : "No-camera / accessibility check-in"}
        </button>
        {useAlternative && (
          <p className="alternative-note">
            Check in by having one teammate describe a visual detail that proves the group found the location.
          </p>
        )}
      </section>

      <section className={`activity-section ${checkedIn ? "revealed" : ""}`}>
        {!checkedIn && (
          <div className="locked-cover">
            <span aria-hidden="true">⌁</span>
            <strong>Activity sealed</strong>
            <p>Your task appears after the location check-in.</p>
          </div>
        )}
        <div aria-hidden={!checkedIn}>
          <div className="activity-meta">
            <span>{stop.time}</span>
            <span>{stop.format}</span>
          </div>
          <h2>{stop.activity}</h2>
          <p className="activity-context">{stop.context}</p>
          <ol className="activity-steps">
            {stop.steps.map((step, index) => (
              <li key={step}>
                <span>{index + 1}</span>
                <p>{step}</p>
              </li>
            ))}
          </ol>
          <label className="response-field">
            <span>{stop.responseLabel}</span>
            <textarea
              value={response}
              onChange={(event) => onResponse(event.target.value)}
              placeholder={stop.placeholder}
              rows={5}
              disabled={!checkedIn}
            />
          </label>
          <div className="debrief-box">
            <span>Debrief</span>
            <p>{stop.debrief}</p>
          </div>
          <button
            className="primary-button complete-button"
            disabled={!canComplete || isComplete}
            onClick={onComplete}
          >
            {isComplete ? "Stop complete ✓" : stop.id === 7 ? "Finish the trail" : "Complete & reveal next clue"}
          </button>
          {!isComplete && checkedIn && !canComplete && (
            <p className="completion-hint">Add a short field note to complete this stop.</p>
          )}
        </div>
      </section>
    </article>
  );
}
