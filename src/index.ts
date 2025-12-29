import * as core from '@actions/core';
import * as fs from 'fs';
import * as path from 'path';

type Verdict = 'clean' | 'suspicious' | 'malicious' | 'error';

interface ScanResult {
  verdict: Verdict;
  scannedFiles: number;
}

/**
 * Get all files in a directory recursively, excluding .git and node_modules
 */
function getFilesRecursively(dir: string): string[] {
  const files: string[] = [];
  
  function traverse(currentPath: string) {
    const entries = fs.readdirSync(currentPath, { withFileTypes: true });
    
    for (const entry of entries) {
      // Skip .git and node_modules
      if (entry.name === '.git' || entry.name === 'node_modules') {
        continue;
      }
      
      const fullPath = path.join(currentPath, entry.name);
      
      if (entry.isDirectory()) {
        traverse(fullPath);
      } else if (entry.isFile()) {
        files.push(fullPath);
      }
    }
  }
  
  traverse(dir);
  return files;
}

/**
 * Aggregate multiple verdicts to determine the final verdict
 * Priority: malicious > suspicious > clean
 */
function aggregateVerdicts(verdicts: Verdict[]): Verdict {
  if (verdicts.includes('error')) return 'error';
  if (verdicts.includes('malicious')) return 'malicious';
  if (verdicts.includes('suspicious')) return 'suspicious';
  return 'clean';
}

/**
 * Scan files using local mode (pompelmi library)
 */
async function scanLocal(files: string[]): Promise<ScanResult> {
  core.info(`Scanning ${files.length} file(s) in local mode...`);
  
  try {
    // Dynamic import of pompelmi
    let pompelmi: any;
    try {
      // @ts-ignore - pompelmi is an optional dependency
      pompelmi = await import('pompelmi');
    } catch (importErr) {
      // If pompelmi is not installed, use a mock implementation for demo
      core.warning('pompelmi package not found. Using mock scanner for demonstration.');
      pompelmi = {
        scanFile: async (filePath: string) => {
          // Mock implementation: check file size and extension as basic heuristic
          const stats = fs.statSync(filePath);
          const ext = path.extname(filePath).toLowerCase();
          
          // Demo heuristics (not real malware detection!)
          if (stats.size > 10 * 1024 * 1024) { // Files > 10MB flagged as suspicious
            return { malicious: false, suspicious: true };
          }
          if (['.exe', '.dll', '.so', '.dylib'].includes(ext)) {
            return { malicious: false, suspicious: true };
          }
          return { malicious: false, suspicious: false };
        }
      };
    }
    
    const verdicts: Verdict[] = [];
    
    for (const file of files) {
      try {
        core.debug(`Scanning: ${file}`);
        const result = await pompelmi.scanFile(file);
        
        // Map pompelmi result to our verdict type
        let verdict: Verdict = 'clean';
        if (result.malicious) {
          verdict = 'malicious';
        } else if (result.suspicious) {
          verdict = 'suspicious';
        }
        
        verdicts.push(verdict);
        
        if (verdict !== 'clean') {
          core.warning(`${verdict.toUpperCase()}: ${file}`);
        }
      } catch (err) {
        core.warning(`Failed to scan ${file}: ${err}`);
        verdicts.push('error');
      }
    }
    
    return {
      verdict: aggregateVerdicts(verdicts),
      scannedFiles: files.length
    };
  } catch (err) {
    core.error(`Local scanning failed: ${err}`);
    return {
      verdict: 'error',
      scannedFiles: 0
    };
  }
}

/**
 * Scan files using API mode
 */
async function scanAPI(
  files: string[],
  apiBaseUrl: string,
  apiKey: string
): Promise<ScanResult> {
  core.info(`Scanning ${files.length} file(s) in API mode...`);
  
  try {
    const verdicts: Verdict[] = [];
    
    for (const file of files) {
      try {
        core.debug(`Scanning via API: ${file}`);
        
        const fileContent = fs.readFileSync(file);
        const fileName = path.basename(file);
        
        // Call the API endpoint
        const response = await fetch(`${apiBaseUrl}/scan`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/octet-stream',
            'X-API-Key': apiKey,
            'X-File-Name': fileName
          },
          body: fileContent
        });
        
        if (!response.ok) {
          throw new Error(`API returned ${response.status}: ${response.statusText}`);
        }
        
        const result = await response.json() as { verdict: string };
        const verdict = result.verdict as Verdict;
        
        verdicts.push(verdict);
        
        if (verdict !== 'clean') {
          core.warning(`${verdict.toUpperCase()}: ${file}`);
        }
      } catch (err) {
        core.warning(`Failed to scan ${file} via API: ${err}`);
        verdicts.push('error');
      }
    }
    
    return {
      verdict: aggregateVerdicts(verdicts),
      scannedFiles: files.length
    };
  } catch (err) {
    core.error(`API scanning failed: ${err}`);
    return {
      verdict: 'error',
      scannedFiles: 0
    };
  }
}

/**
 * Main action entry point
 */
async function run(): Promise<void> {
  try {
    // Get inputs
    const scanPath = core.getInput('path', { required: true });
    const mode = core.getInput('mode') || 'local';
    const apiBaseUrl = core.getInput('api_base_url');
    const apiKey = core.getInput('api_key');
    const failOnDetection = core.getInput('fail_on_detection') !== 'false';
    
    core.info(`Starting pompelmi malware scan...`);
    core.info(`Mode: ${mode}`);
    core.info(`Path: ${scanPath}`);
    
    // Validate inputs
    if (mode !== 'local' && mode !== 'api') {
      throw new Error(`Invalid mode: ${mode}. Must be 'local' or 'api'`);
    }
    
    if (mode === 'api') {
      if (!apiBaseUrl) {
        throw new Error('api_base_url is required when mode=api');
      }
      if (!apiKey) {
        throw new Error('api_key is required when mode=api');
      }
    }
    
    // Check if path exists
    if (!fs.existsSync(scanPath)) {
      throw new Error(`Path does not exist: ${scanPath}`);
    }
    
    // Get files to scan
    const stats = fs.statSync(scanPath);
    let files: string[];
    
    if (stats.isFile()) {
      files = [scanPath];
    } else if (stats.isDirectory()) {
      files = getFilesRecursively(scanPath);
    } else {
      throw new Error(`Path is neither a file nor directory: ${scanPath}`);
    }
    
    if (files.length === 0) {
      core.warning('No files found to scan');
      core.setOutput('verdict', 'clean');
      core.setOutput('scanned_files', 0);
      return;
    }
    
    // Perform scan based on mode
    let result: ScanResult;
    
    if (mode === 'local') {
      result = await scanLocal(files);
    } else {
      result = await scanAPI(files, apiBaseUrl, apiKey);
    }
    
    // Set outputs
    core.setOutput('verdict', result.verdict);
    core.setOutput('scanned_files', result.scannedFiles);
    
    // Create job summary
    await core.summary
      .addHeading('🛡️ Pompelmi Malware Scan Results')
      .addTable([
        [{ data: 'Metric', header: true }, { data: 'Value', header: true }],
        ['Verdict', `**${result.verdict.toUpperCase()}**`],
        ['Files Scanned', result.scannedFiles.toString()],
        ['Mode', mode]
      ])
      .write();
    
    // Log final result
    core.info(`\n=== Scan Complete ===`);
    core.info(`Verdict: ${result.verdict}`);
    core.info(`Files Scanned: ${result.scannedFiles}`);
    
    // Fail if needed
    if (failOnDetection && result.verdict === 'malicious') {
      core.setFailed(`Malicious content detected! Scanned ${result.scannedFiles} file(s).`);
    } else if (result.verdict === 'error') {
      core.setFailed(`Scan completed with errors. Check logs for details.`);
    }
    
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message);
    } else {
      core.setFailed('An unknown error occurred');
    }
  }
}

run();
