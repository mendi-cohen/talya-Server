import sqlite3 from 'sqlite3';


const db = new sqlite3.Database('./store.db', (err) => {
  if (err) {
    console.error('Error opening database: ', err.message);
  } else {
    console.log('Connected to the SQLite database.');
    db.run(`CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      price REAL NOT NULL,
      description TEXT,
      image_url image
      
    )`, (err) => {
      if (err) {
        console.error('Error creating table: ', err.message);
      }
    });
  }
});
export { db };