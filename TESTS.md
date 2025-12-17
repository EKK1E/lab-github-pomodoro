# Manual Test Cases — Pomodoro

## Scope
Manual test cases for:
- Timer (modes + controls)
- Tasks (add/remove)
- LocalStorage persistence

## Environment
- Browser: Chrome / Edge (latest)
- OS: Windows / macOS
- App opened from: local file or dev server

---

## Timer

### TC-TIMER-001 — Default view
**Preconditions:** App opened fresh (no actions).  
**Steps:**
1. Open the app.
**Expected:**
- Time shows `25:00`.
- Pomodoro mode is active (25/5).
- Start / Pause / Reset buttons are visible.

### TC-TIMER-002 — Switch modes
**Steps:**
1. Click `15/3`.
2. Click `50/10`.
3. Click `25/5`.
**Expected:**
- Timer changes to `15:00`, then `50:00`, then back to `25:00`.
- Active mode button is visually highlighted.

### TC-TIMER-003 — Start countdown
**Steps:**
1. Click `Start`.
2. Wait ~3 seconds.
**Expected:**
- Time decreases (e.g. `24:59`, `24:58`...).
- UI remains responsive.

### TC-TIMER-004 — Pause countdown
**Steps:**
1. Click `Start`.
2. Wait ~2 seconds.
3. Click `Pause`.
4. Wait ~2 seconds.
**Expected:**
- Time stops decreasing after Pause.

### TC-TIMER-005 — Reset timer
**Steps:**
1. Click `Start`, wait a few seconds.
2. Click `Reset`.
**Expected:**
- Timer returns to current mode default:
  - Pomodoro: `25:00`
  - Short: `15:00`
  - Long: `50:00`
- Countdown stops.

### TC-TIMER-006 — Start while already running
**Steps:**
1. Click `Start`.
2. Click `Start` again multiple times.
**Expected:**
- Timer continues normally.
- No accelerated countdown / no errors.

---

## Tasks

### TC-TASK-001 — Add a task
**Steps:**
1. Type `Buy milk` into input.
2. Click `Add` (or submit form).
**Expected:**
- Task appears in the list.
- Input is cleared (if implemented).

### TC-TASK-002 — Add multiple tasks
**Steps:**
1. Add `Task A`, `Task B`, `Task C`.
**Expected:**
- All tasks appear in order.
- No UI break.

### TC-TASK-003 — Prevent empty task
**Steps:**
1. Leave input empty.
2. Click `Add`.
**Expected:**
- No empty task is added (or app shows validation).

### TC-TASK-004 — Remove a task
**Preconditions:** At least 1 task exists.  
**Steps:**
1. Click remove/delete button on a task.
**Expected:**
- Selected task disappears.
- Other tasks remain.

---

## LocalStorage

### TC-LS-001 — Tasks persist after reload
**Preconditions:** Add 2–3 tasks.  
**Steps:**
1. Reload the page (F5).
**Expected:**
- Tasks list is restored from localStorage.

### TC-LS-002 — Removing tasks persists after reload
**Preconditions:** Add tasks, then remove 1 task.  
**Steps:**
1. Reload the page.
**Expected:**
- Removed task is still removed.
- Remaining tasks persist.

### TC-LS-003 — Fresh start after clearing storage
**Steps:**
1. Open DevTools → Application → Local Storage.
2. Clear localStorage for the app.
3. Reload page.
**Expected:**
- App starts with default state (no tasks).
