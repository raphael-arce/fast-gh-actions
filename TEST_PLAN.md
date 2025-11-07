# Test Plan: Todo Application

## Overview
This test plan covers end-to-end testing for the Todo Application, including user authentication (registration, login, logout) and todo management features (create, read, update, delete operations).

---

## 1. User Registration Tests

### 1.1 Successful Registration
**Test ID:** REG-001  
**Priority:** High  
**Objective:** Verify that a new user can successfully register with valid credentials

**Preconditions:**
- Application is running
- User does not have an existing account

**Test Steps:**
1. Navigate to `/register` page
2. Enter a unique email address in the email field (e.g., `test-{timestamp}@example.com`)
3. Enter a valid password in the password field
4. Click the "Create Account" button

**Expected Results:**
- Loading state is displayed while processing
- Success page is displayed with message "Check your email!"
- Confirmation message states: "We've sent you a confirmation link"
- "Back to Login" link is visible

**Test Data:**
- Email: `test-{Date.now()}@example.com`
- Password: `TestPassword123!`

---

### 1.2 Registration with Invalid Email
**Test ID:** REG-002  
**Priority:** Medium  
**Objective:** Verify that registration fails with invalid email format

**Test Steps:**
1. Navigate to `/register` page
2. Enter an invalid email (e.g., `notanemail`)
3. Enter a valid password
4. Click "Create Account" button

**Expected Results:**
- HTML5 validation prevents form submission OR
- Error message is displayed about invalid email format

---

### 1.3 Registration with Existing Email
**Test ID:** REG-003  
**Priority:** High  
**Objective:** Verify that registration fails when email already exists

**Test Steps:**
1. Navigate to `/register` page
2. Enter an email that is already registered
3. Enter a valid password
4. Click "Create Account" button

**Expected Results:**
- Alert is displayed with Supabase error message
- User remains on registration page

---

### 1.4 Registration with Weak Password
**Test ID:** REG-004  
**Priority:** Medium  
**Objective:** Verify password strength requirements

**Test Steps:**
1. Navigate to `/register` page
2. Enter valid email
3. Enter weak password (e.g., `123`)
4. Click "Create Account" button

**Expected Results:**
- Alert displays error about password requirements
- Form does not submit successfully

---

## 2. User Login Tests

### 2.1 Successful Login
**Test ID:** LOGIN-001  
**Priority:** High  
**Objective:** Verify that registered users can log in with correct credentials

**Preconditions:**
- User account exists and is confirmed

**Test Steps:**
1. Navigate to `/login` page
2. Enter registered email in email field
3. Enter correct password in password field
4. Click "Sign In" button

**Expected Results:**
- Loading state is displayed ("Signing in..." text with spinner)
- User is redirected to `/` (Todo App main page)
- Header displays "✨ Todo App"
- "Logout" button is visible in header

**Test Data:**
- Use previously registered and confirmed email/password

---

### 2.2 Login with Incorrect Password
**Test ID:** LOGIN-002  
**Priority:** High  
**Objective:** Verify that login fails with incorrect password

**Test Steps:**
1. Navigate to `/login` page
2. Enter registered email
3. Enter incorrect password
4. Click "Sign In" button

**Expected Results:**
- Alert is displayed with authentication error message
- User remains on login page

---

### 2.3 Login with Non-existent Email
**Test ID:** LOGIN-003  
**Priority:** Medium  
**Objective:** Verify that login fails with non-existent email

**Test Steps:**
1. Navigate to `/login` page
2. Enter email that doesn't exist in system
3. Enter any password
4. Click "Sign In" button

**Expected Results:**
- Alert displays authentication error
- User remains on login page

---

### 2.4 Login Page Navigation
**Test ID:** LOGIN-004  
**Priority:** Low  
**Objective:** Verify navigation links on login page

**Test Steps:**
1. Navigate to `/login` page
2. Click "Sign up here" link

**Expected Results:**
- User is redirected to `/register` page

---

## 3. Add Todo Tests

### 3.1 Add Single Todo
**Test ID:** TODO-ADD-001  
**Priority:** High  
**Objective:** Verify that authenticated users can add a new todo

**Preconditions:**
- User is logged in

**Test Steps:**
1. Navigate to Todo App home page
2. Locate the "What needs to be done?" input field
3. Enter todo text (e.g., "Buy groceries")
4. Click "Add Todo" button

**Expected Results:**
- Form is cleared after submission
- New todo appears in the "Pending Todos" section
- Todo has an unchecked checkbox
- Todo text matches input
- Delete button (red X) is visible
- Stats are updated to reflect new pending todo

**Selectors:**
- Input: `input[name="todo"]` or `input[placeholder="What needs to be done?"]`
- Submit button: `button[type="submit"]` with text "Add Todo"

---

### 3.2 Add Multiple Todos
**Test ID:** TODO-ADD-002  
**Priority:** High  
**Objective:** Verify that multiple todos can be added sequentially

**Test Steps:**
1. Add first todo: "Task 1"
2. Add second todo: "Task 2"
3. Add third todo: "Task 3"

**Expected Results:**
- All three todos appear in pending section
- Todos are displayed in order of creation
- Stats show 3 pending todos

---

### 3.3 Add Todo with Empty Input
**Test ID:** TODO-ADD-003  
**Priority:** Medium  
**Objective:** Verify validation for empty todo input

**Test Steps:**
1. Leave todo input field empty
2. Click "Add Todo" button

**Expected Results:**
- HTML5 validation prevents submission (required attribute)
- No todo is added

---

### 3.4 Add Todo with Special Characters
**Test ID:** TODO-ADD-004  
**Priority:** Low  
**Objective:** Verify todos can contain special characters

**Test Steps:**
1. Enter todo with special characters: `Buy @groceries & cook! #dinner 🍕`
2. Click "Add Todo" button

**Expected Results:**
- Todo is added successfully with all special characters intact
- Characters are displayed correctly

---

## 4. Mark Todo as Completed Tests

### 4.1 Mark Single Todo as Completed
**Test ID:** TODO-COMPLETE-001  
**Priority:** High  
**Objective:** Verify that pending todos can be marked as completed

**Preconditions:**
- At least one pending todo exists

**Test Steps:**
1. Locate a pending todo
2. Click the circular checkbox button (left side of todo)

**Expected Results:**
- Checkbox fills with green color and shows checkmark
- Todo text gets strikethrough style
- Todo opacity decreases (becomes semi-transparent)
- Todo moves to "Completed Todos" section
- Stats update: pending count decreases by 1, completed count increases by 1

**Selectors:**
- Checkbox button: `button` with border-2 styling (first button in todo item)
- Completed checkbox has: `bg-green-500 border-green-500 text-white` classes

---

### 4.2 Mark Multiple Todos as Completed
**Test ID:** TODO-COMPLETE-002  
**Priority:** High  
**Objective:** Verify that multiple todos can be marked as completed

**Preconditions:**
- At least 3 pending todos exist

**Test Steps:**
1. Mark first todo as completed
2. Mark second todo as completed
3. Mark third todo as completed

**Expected Results:**
- All three todos move to completed section
- All show checkmarks and strikethrough
- Stats correctly reflect 3 completed todos
- Pending count decreases by 3

---

## 5. Mark Todo as Pending Tests

### 5.1 Mark Completed Todo as Pending
**Test ID:** TODO-PENDING-001  
**Priority:** High  
**Objective:** Verify that completed todos can be marked back as pending

**Preconditions:**
- At least one completed todo exists

**Test Steps:**
1. Navigate to "Completed Todos" section
2. Locate a completed todo (has checkmark and strikethrough)
3. Click the green checkbox button

**Expected Results:**
- Checkbox becomes empty (unchecked state)
- Strikethrough styling is removed
- Todo text becomes fully opaque
- Todo moves back to "Pending Todos" section
- Stats update: completed count decreases by 1, pending count increases by 1

---

### 5.2 Toggle Todo Status Multiple Times
**Test ID:** TODO-PENDING-002  
**Priority:** Medium  
**Objective:** Verify that todo status can be toggled back and forth

**Test Steps:**
1. Add a new todo
2. Mark it as completed
3. Mark it as pending
4. Mark it as completed again
5. Mark it as pending again

**Expected Results:**
- Each toggle properly updates the UI state
- Todo moves between sections correctly
- Stats are accurate after each toggle
- No visual glitches or state inconsistencies

---

## 6. Delete Todo Tests

### 6.1 Delete Pending Todo
**Test ID:** TODO-DELETE-001  
**Priority:** High  
**Objective:** Verify that pending todos can be deleted

**Preconditions:**
- At least one pending todo exists

**Test Steps:**
1. Locate a pending todo
2. Click the red X button (delete button on right side)

**Expected Results:**
- Todo is immediately removed from the list
- Todo no longer appears in pending section
- Stats update: pending count decreases by 1
- Other todos remain unaffected

**Selectors:**
- Delete button: `button` with `bg-red-50 text-red-500` classes, contains X icon SVG

---

### 6.2 Delete Completed Todo
**Test ID:** TODO-DELETE-002  
**Priority:** High  
**Objective:** Verify that completed todos can be deleted

**Preconditions:**
- At least one completed todo exists

**Test Steps:**
1. Navigate to completed section
2. Locate a completed todo
3. Click the red X button

**Expected Results:**
- Todo is removed from completed section
- Stats update: completed count decreases by 1
- Todo is permanently deleted

---

### 6.3 Delete All Todos
**Test ID:** TODO-DELETE-003  
**Priority:** Medium  
**Objective:** Verify that all todos can be deleted

**Preconditions:**
- Multiple todos exist (both pending and completed)

**Test Steps:**
1. Delete all pending todos one by one
2. Delete all completed todos one by one

**Expected Results:**
- All todos are removed
- Stats show 0 pending and 0 completed
- App remains functional with empty state

---

### 6.4 Delete Middle Todo from List
**Test ID:** TODO-DELETE-004  
**Priority:** Low  
**Objective:** Verify correct todo is deleted when multiple exist

**Test Steps:**
1. Add 5 todos: "Todo 1", "Todo 2", "Todo 3", "Todo 4", "Todo 5"
2. Delete "Todo 3" (middle item)

**Expected Results:**
- Only "Todo 3" is deleted
- Remaining todos maintain order: "Todo 1", "Todo 2", "Todo 4", "Todo 5"
- Stats show 4 pending todos

---

## 7. Logout Tests

### 7.1 Successful Logout
**Test ID:** LOGOUT-001  
**Priority:** High  
**Objective:** Verify that authenticated users can log out

**Preconditions:**
- User is logged in

**Test Steps:**
1. Navigate to Todo App home page
2. Locate "Logout" button in header
3. Click "Logout" button

**Expected Results:**
- User session is terminated
- User is redirected to login page (`/login`)
- Any attempt to access protected routes redirects to login
- Previous session data is cleared

**Selectors:**
- Logout button: `button` containing text "Logout" in header

---

### 7.2 Logout with Unsaved Changes
**Test ID:** LOGOUT-002  
**Priority:** Low  
**Objective:** Verify logout behavior (note: todos are auto-saved)

**Test Steps:**
1. Add several todos (they are auto-saved to Supabase)
2. Click "Logout" button

**Expected Results:**
- Logout succeeds
- When user logs back in, todos are persisted (if using Supabase storage)

---

### 7.3 Access Protected Route After Logout
**Test ID:** LOGOUT-003  
**Priority:** High  
**Objective:** Verify that logged-out users cannot access protected routes

**Test Steps:**
1. Complete logout
2. Manually navigate to `/` (Todo App route)

**Expected Results:**
- User is redirected to `/login` page
- Protected content is not accessible

---

## 8. Integration Tests (Full User Flows)

### 8.1 Complete User Journey
**Test ID:** INTEGRATION-001  
**Priority:** High  
**Objective:** Verify complete user workflow from registration to logout

**Test Steps:**
1. Register new account
2. Confirm email (if required by Supabase settings)
3. Login with new credentials
4. Add 3 todos
5. Mark 1 todo as completed
6. Delete 1 pending todo
7. Mark completed todo back to pending
8. Delete all remaining todos
9. Logout

**Expected Results:**
- All steps complete successfully
- UI state is consistent throughout
- Stats always reflect accurate counts
- No errors occur

---

### 8.2 Multiple Sessions
**Test ID:** INTEGRATION-002  
**Priority:** Medium  
**Objective:** Verify behavior with multiple browser sessions

**Test Steps:**
1. Login in first browser/tab
2. Add todos in first session
3. Login in second browser/tab with same credentials
4. Verify todos appear in second session
5. Modify todos in second session
6. Verify changes sync to first session (if real-time updates are implemented)

**Expected Results:**
- Both sessions can access same account
- Todo data is consistent across sessions
- Actions in one session reflect in other (if sync is implemented)

---

### 8.3 Persistence Test
**Test ID:** INTEGRATION-003  
**Priority:** High  
**Objective:** Verify todos persist across login sessions

**Test Steps:**
1. Login
2. Add multiple todos
3. Mark some as completed
4. Logout
5. Login again with same credentials

**Expected Results:**
- All todos are still present
- Todo completion states are preserved
- Stats are accurate

---

## 9. UI/UX Tests

### 9.1 Stats Display Accuracy
**Test ID:** UI-001  
**Priority:** High  
**Objective:** Verify that stats component displays accurate counts

**Test Steps:**
1. Note initial stats
2. Add 3 todos (should show 3 pending)
3. Complete 2 todos (should show 1 pending, 2 completed)
4. Delete 1 pending todo (should show 0 pending, 2 completed)

**Expected Results:**
- Stats update in real-time after each action
- Numbers are always accurate
- Stats component is always visible

---

### 9.2 Visual States
**Test ID:** UI-002  
**Priority:** Low  
**Objective:** Verify visual styling and transitions

**Test Steps:**
1. Observe hover states on buttons
2. Check loading states during async operations
3. Verify completed todos have correct styling (strikethrough, opacity, green checkbox)
4. Verify pending todos have correct styling (no strikethrough, full opacity)

**Expected Results:**
- All interactive elements have hover effects
- Loading spinners appear during async operations
- Styling is consistent and matches design
- Transitions are smooth (200ms duration)

---

## 10. Error Handling Tests

### 10.1 Network Error During Add Todo
**Test ID:** ERROR-001  
**Priority:** Medium  
**Objective:** Verify behavior when adding todo fails

**Test Steps:**
1. Simulate network error or database unavailability
2. Attempt to add a todo

**Expected Results:**
- User-friendly error message is displayed
- App doesn't crash
- User can retry operation

---

### 10.2 Session Expiry
**Test ID:** ERROR-002  
**Priority:** Medium  
**Objective:** Verify behavior when session expires

**Test Steps:**
1. Login
2. Wait for session to expire (or manually clear session)
3. Attempt to perform action (add/delete todo)

**Expected Results:**
- User is redirected to login page
- Appropriate message about session expiry
- No data loss if possible

---

## Test Execution Notes

### Test Environment Setup
- Supabase backend must be running and accessible
- Database should be seeded with clean state for each test run
- Consider using unique test user accounts or cleaning up after tests

### Test Data Management
- Use timestamp-based emails for registration tests to ensure uniqueness
- Clean up test data after test runs
- Consider using test database separate from production

### Automation Considerations
- Tests are designed for Playwright automation
- Use data-testid attributes for more reliable selectors if needed
- Implement proper wait strategies for async operations
- Consider implementing fixtures for common test scenarios (logged-in user, user with todos, etc.)

### Key Selectors Reference
```typescript
// Registration/Login
'input[type="email"]' or 'input#email'
'input[type="password"]' or 'input#password'
'button[type="submit"]'

// Todo App
'input[name="todo"]' or 'input[placeholder="What needs to be done?"]'
'button[type="submit"]' // within form for Add Todo
// Checkbox button: first button in todo item
// Delete button: button with red background in todo item

// Header
'button:has-text("Logout")'
```

---

## Test Priority Summary

**High Priority (Must Pass):**
- REG-001, REG-003
- LOGIN-001, LOGIN-002
- TODO-ADD-001, TODO-ADD-002
- TODO-COMPLETE-001, TODO-COMPLETE-002
- TODO-PENDING-001
- TODO-DELETE-001, TODO-DELETE-002
- LOGOUT-001, LOGOUT-003
- INTEGRATION-001, INTEGRATION-003
- UI-001

**Medium Priority:**
- REG-002, REG-004
- LOGIN-003
- TODO-ADD-003
- TODO-PENDING-002
- TODO-DELETE-003
- INTEGRATION-002
- ERROR-001, ERROR-002

**Low Priority:**
- LOGIN-004
- TODO-ADD-004
- TODO-DELETE-004
- LOGOUT-002
- UI-002

---

## Success Criteria
- All High Priority tests pass
- At least 90% of Medium Priority tests pass
- No critical bugs in core workflows
- UI is consistent and responsive across all actions
