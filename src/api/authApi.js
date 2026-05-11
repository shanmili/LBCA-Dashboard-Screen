import { apiRequest, clearAuthToken, setAuthToken } from './client';

const ADMIN_LOGIN_PATH = '/api/admin/login/';
const TEACHER_LOGIN_PATH = '/api/teacher/login/';
const TEACHER_LOGOUT_PATH = '/api/teacher/logout/';
const TEACHER_PROFILE_PATH = '/api/teacher/profile/';

const buildLoginBody = (identifier, password) => ({
  username: identifier,
  email: identifier,
  identifier,
  password,
});

export async function login(identifier, password) {
  const credentials = buildLoginBody(identifier, password);

  // Determine role based on email pattern FIRST
  const isAdmin = identifier?.toLowerCase().includes('admin');
  const role = isAdmin ? 'admin' : 'teacher';
  const path = isAdmin ? ADMIN_LOGIN_PATH : TEACHER_LOGIN_PATH;

  try {
    const payload = await apiRequest(path, {
      method: 'POST',
      body: credentials,
      auth: false,
    });

    if (payload?.token) {
      setAuthToken(payload.token);
    }

    // Use the payload's role if available, otherwise use the determined role
    const finalRole = payload?.role || role;

    return {
      role: finalRole,
      payload,
    };
  } catch (error) {
    throw error || new Error('Login failed');
  }
}

export async function logout(role) {
  try {
    if (role === 'teacher') {
      await apiRequest(TEACHER_LOGOUT_PATH, { method: 'POST' });
    }
  } finally {
    clearAuthToken();
  }
}

export function getTeacherProfile() {
  return apiRequest(TEACHER_PROFILE_PATH);
}
