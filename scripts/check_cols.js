import 'dotenv/config';
import { sql } from '../api/_db.js';

async function checkCols() {
  const modCols = await sql`
    SELECT column_name, data_type 
    FROM information_schema.columns 
    WHERE table_name = 'modules'
  `;
  console.log('modules columns:', modCols.map(c => c.column_name));

  const lesCols = await sql`
    SELECT column_name, data_type 
    FROM information_schema.columns 
    WHERE table_name = 'lessons'
  `;
  console.log('lessons columns:', lesCols.map(c => c.column_name));
}

checkCols().catch(console.error);
