CREATE TABLE IF NOT EXISTS verifiche_edizioni (
  id TEXT PRIMARY KEY,
  classe_id TEXT NOT NULL,
  anno TEXT NOT NULL,
  classe TEXT NOT NULL,
  modulo TEXT NOT NULL,
  creata TEXT NOT NULL,
  prima_data TEXT,
  minuti INTEGER NOT NULL,
  presenze TEXT NOT NULL,
  stato TEXT NOT NULL CHECK (stato IN ('aperta', 'chiusa'))
);

CREATE INDEX IF NOT EXISTS verifiche_edizioni_classe ON verifiche_edizioni(classe_id, creata);

CREATE TABLE IF NOT EXISTS verifiche_elaborati (
  edizione_id TEXT NOT NULL REFERENCES verifiche_edizioni(id),
  profilo_id TEXT NOT NULL,
  recupero TEXT NOT NULL UNIQUE,
  stato TEXT NOT NULL,
  copia_scaricata TEXT,
  PRIMARY KEY (edizione_id, profilo_id)
);

CREATE TABLE IF NOT EXISTS verifiche_chiavi (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  pubblica TEXT NOT NULL,
  privata TEXT NOT NULL
);
