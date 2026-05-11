# Migration to Backend-Only Data

## Summary
All hardcoded student and teacher data has been removed from the frontend. The system now exclusively retrieves all data from the Django backend API. Mock data fallbacks have been disabled.

## Changes Made

### 1. Environment Configuration (`.env`)
- **Changed**: `VITE_USE_MOCK_FALLBACK=true` → `VITE_USE_MOCK_FALLBACK=false`
- **Effect**: Mock data fallback is now disabled. API failures will show errors instead of falling back to hardcoded data.

### 2. Dashboard State Hook (`useDashboardDataState.js`)
- **Removed**: 
  - Import of `studentsData`, `atRiskStudents`, `activityFeed`, `quarterlyPaceData`, `attendanceData`
  - `buildMockDashboardData()` function
  - `normalizeDashboardPayload()` function
  - `USE_MOCK_FALLBACK` logic
- **Changed**: Initial state now uses empty/zero values instead of mock data
- **Effect**: Dashboard only displays data from `fetchDashboardData()` API call

### 3. Early Warning State Hook (`useEarlyWarningState.js`)
- **Removed**:
  - Import of `studentsData`
  - Fallback to `studentsData` in catch block
- **Changed**: Initial state set to empty array `[]`
- **Effect**: Early warning page only shows data from API, fails gracefully if API is unavailable

### 4. Students Page State Hook (`useStudentsPageState.js`)
- **Removed**:
  - Import of `studentsData`
  - Fallback to `studentsData` in catch block
- **Changed**: Initial state set to empty array `[]`
- **Effect**: Students list only populated from backend API

### 5. Student Profile State Hook (`useStudentProfileState.js`)
- **Removed**:
  - Import of `studentsData`
  - Fallback lookup in `studentsData` when API fails
- **Changed**: Sets `studentData` to `null` on API failure
- **Effect**: Student profile requires successful API call, shows error if API is unavailable

### 6. PACE Encoding State Hook (`usePaceEncodingState.js`)
- **Removed**:
  - Import of `paceEncodingData` and `studentsData`
  - Fallback to `studentsData` transformation in catch block
- **Changed**: 
  - Initial state for `paceDataStore` set to `{}`
  - `allStudents` set to `[]` on API failure
- **Effect**: PACE data only comes from `listStudents()` API call

### 7. Notification Context (`NotificationContext.jsx`)
- **Removed**:
  - Import of `studentsData`
  - `getStudentName()` helper function
  - `generateSystemNotifications()` function that used mock student data
- **Changed**: 
  - Initial notifications state set to `[]`
  - User activity state set to `[]`
- **Effect**: All notifications and activity feed must come from backend (requires new API endpoints to be created)

### 8. Teachers State Hook (`useTeachersState.js`)
- **Removed**:
  - Import of `teachersData`
  - Fallback to `teachersData` in catch block
- **Changed**: Initial state set to empty array `[]`
- **Effect**: Teachers list only populated from backend API

## Data Still Using Mock Configuration
The following are **not** hardcoded student data and are acceptable to keep:
- `studentGrades` - System configuration for grade levels
- `studentSections` - System configuration for sections
- `schoolYears` - System configuration for school years
- `paceSubjects` - System configuration for subjects

These are used only for dropdown filters and don't represent actual student records.

## API Requirements
Your Django backend must now provide data through these endpoints:

1. **Students**: `GET /api/students/`
2. **Early Warnings**: `GET /api/early-warnings/` or `GET /api/warnings/`
3. **Student Warnings**: `GET /api/warnings/` (with student IDs)
4. **PACE Data**: `GET /api/pace/` or `GET /api/student-paces/`
5. **Teachers**: `GET /api/teachers/`
6. **Dashboard**: `GET /api/dashboard/` (optional, can be computed from above)
7. **Notifications** (future): Need API endpoints to fetch notifications

## Migration Checklist
- [ ] Verify Django backend has all required API endpoints
- [ ] Test login flow with backend authentication
- [ ] Test students page loads students from backend
- [ ] Test early warning page loads warnings from backend
- [ ] Test student profile pages load data from backend
- [ ] Test PACE encoding loads students from backend
- [ ] Test teachers page loads from backend
- [ ] Test dashboard loads data from backend
- [ ] Create notification fetching API endpoints and integrate
- [ ] Update error handling/messaging for API failures

## Error Handling
When API endpoints are unavailable or fail:
- **Dashboard**: Shows loading state then error message
- **Students/Teachers**: Shows empty lists with error message
- **Student Profile**: Shows error message
- **Early Warnings**: Shows empty list with error message
- **Notifications**: Shows empty notifications list

Users will need to understand that API failures result in empty/error states, not fallback data.

## Next Steps
1. Ensure all Django API endpoints are properly configured
2. Set `VITE_API_BASE_URL` in `.env` to your Django backend URL
3. Test each page to verify data loads correctly
4. Implement any missing API endpoints
5. Consider adding loading skeletons/spinners for better UX during API calls
