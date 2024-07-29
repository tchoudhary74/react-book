const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const SECRET_MOUNT_EXTRA_PATHS = process.env.SECRET_MOUNT_EXTRA_PATHS || '';
const SECRET_PREFIX = 'secrets';

// Function to read file content
async function readFileContent(filePath) {
  try {
    const content = await fs.readFile(filePath, { encoding: 'utf-8' });
    return content.trim();
  } catch (error) {
    console.error(`Error reading secret file: ${filePath}, exception message: ${error.message}`);
    throw error; // Re-throw the error after logging
  }
}

// Load secrets into app.locals for server-side use
async function loadSecrets() {
  const appSecrets = {};
  const extraPathsConfigured = SECRET_MOUNT_EXTRA_PATHS.split(',');

  for (const mountLocation of extraPathsConfigured) {
    const directory = path.resolve(mountLocation);

    try {
      const files = await fs.readdir(directory);
      for (const fileName of files) {
        const filePath = path.join(directory, fileName);
        const stat = await fs.stat(filePath);

        if (stat.isFile()) {
          const secretKey = `${SECRET_PREFIX}.${fileName}`;
          const secretValue = await readFileContent(filePath);
          appSecrets[secretKey] = secretValue;
        }
      }
    } catch (error) {
      console.error(`Secret mount location doesn't exist or error reading secrets: ${mountLocation}, error: ${error}`);
    }
  }

  return appSecrets;
}

// Middleware to load secrets
app.use(async (req, res, next) => {
  if (!req.app.locals.secrets) {
    try {
      const secrets = await loadSecrets();
      req.app.locals.secrets = secrets;
    } catch (error) {
      console.error("Error loading secrets", error);
    }
  }
  next();
});

// Example endpoint demonstrating server-side usage of secrets
app.get('/use-secrets', (req, res) => {
  // Example use of secrets: log them to the server console (for demonstration purposes only)
  console.log("Accessing secrets on the server: ", req.app.locals.secrets);
  
  // Respond to the client without exposing secrets
  res.send("Secrets are being used on the server. Check the server logs for details.");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
