/** @type { import("drizzle-kit").Config } */
export default {
  schema: "./utils/schema.js",
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://neondb_owner:rmRQltv61VjP@ep-red-tooth-a5n8sf9q.us-east-2.aws.neon.tech/neondb?sslmode=require',
  }
};