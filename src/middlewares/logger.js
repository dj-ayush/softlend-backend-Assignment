const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

// Create logs directory if it doesn't exist
const logsDir = path.join(__dirname, '../../logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// Create a write stream for access logs
const accessLogStream = fs.createWriteStream(
  path.join(logsDir, 'access.log'),
  { flags: 'a' }
);

// Custom token for logging request body
morgan.token('body', (req) => {
  return req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH'
    ? JSON.stringify(req.body)
    : '';
});

// Custom token for logging user ID
morgan.token('user-id', (req) => {
  return req.userId || 'anonymous';
});

// Logger format
const loggerFormat = ':remote-addr - :user-id [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" :response-time ms :body';

// Request logger middleware
const requestLogger = morgan(loggerFormat, {
  stream: accessLogStream,
  skip: (req) => req.url === '/health' // Skip health checks
});

// Console logger for development
const consoleLogger = morgan('dev');

// Custom request logger with additional details
const logRequest = (req, res, next) => {
  const start = Date.now();
  
  // Log request details
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  
  // Log request body for POST/PUT/PATCH
  if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
    console.log('Request Body:', req.body);
  }
  
  // Log response time
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`Response: ${res.statusCode} - ${duration}ms`);
  });
  
  next();
};

module.exports = {
  requestLogger,
  consoleLogger,
  logRequest
};