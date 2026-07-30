const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgresql://postgres.tftwkkchdtyqlgjghzbt:hssFXHcc664h05Wn@aws-0-eu-west-3.pooler.supabase.com:6543/postgres?pgbouncer=true',
});

async function run() {
  await client.connect();
  console.log("Connected to DB.");
  
  // Disable RLS on Project table
  await client.query('ALTER TABLE "Project" DISABLE ROW LEVEL SECURITY;');
  console.log("Disabled RLS on Project table.");
  
  await client.query(`
    INSERT INTO storage.buckets (id, name, public) 
    VALUES ('portfolio', 'portfolio', true) 
    ON CONFLICT (id) DO UPDATE SET public = true;
  `);
  console.log("Ensured portfolio bucket exists and is public.");

  const policy1 = `
    CREATE POLICY "Allow public read access" ON storage.objects FOR SELECT USING (bucket_id = 'portfolio');
  `;
  const policy2 = `
    CREATE POLICY "Allow public insert access" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'portfolio');
  `;
  const policy3 = `
    CREATE POLICY "Allow public update access" ON storage.objects FOR UPDATE USING (bucket_id = 'portfolio');
  `;
  const policy4 = `
    CREATE POLICY "Allow public delete access" ON storage.objects FOR DELETE USING (bucket_id = 'portfolio');
  `;

  for (let p of [policy1, policy2, policy3, policy4]) {
    try {
      await client.query(p);
      console.log("Policy created successfully.");
    } catch (e) {
      console.log("Policy might already exist:", e.message);
    }
  }

  await client.end();
}

run().catch(console.error);
