require('dotenv').config();

console.log('Environment Variables Check:');
console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'SET' : 'NOT SET');
console.log('MONGODB_URI:', process.env.MONGODB_URI ? 'SET' : 'NOT SET');
console.log('PORT:', process.env.PORT || '5000 (default)');

if (!process.env.JWT_SECRET) {
  console.log('\n❌ MISSING: JWT_SECRET is required for authentication');
}

if (!process.env.MONGODB_URI) {
  console.log('❌ MISSING: MONGODB_URI is required for database connection');
}

console.log('\nIf any variables are missing, add them to your .env file');
