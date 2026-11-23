CREATE TABLE IF NOT EXISTS profiles (
  id TEXT PRIMARY KEY,
  code_digest TEXT NOT NULL UNIQUE,
  code_version INTEGER NOT NULL DEFAULT 1,
  progress TEXT NOT NULL DEFAULT '{}'
);

CREATE TABLE IF NOT EXISTS sessions (
  token_digest TEXT PRIMARY KEY,
  profile_id TEXT NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  code_version INTEGER NOT NULL,
  expires_at INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS sessions_by_expiration ON sessions(expires_at);

CREATE TABLE IF NOT EXISTS login_attempts (
  scope TEXT PRIMARY KEY,
  window_start INTEGER NOT NULL,
  attempts INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS login_attempts_by_window ON login_attempts(window_start);
