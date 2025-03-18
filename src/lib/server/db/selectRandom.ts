import { type PgTable } from 'drizzle-orm/pg-core';
import { db } from '.';
import { sql } from 'drizzle-orm';

export const selectRandom = async <T extends PgTable>(
	table: T,
	count: number
): Promise<T['$inferSelect'][]> => {
	return db.execute<T['$inferSelect']>(
		sql`
      SELECT * FROM ${table}
      WHERE id >= FLOOR(RANDOM() * (SELECT MAX(id) FROM ${table}) + 1)
      ORDER BY id
      LIMIT ${count}
    `
	);
};
