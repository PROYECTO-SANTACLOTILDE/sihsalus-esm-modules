#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Analyzes and cleans routes.json files by removing unused routes based on index.ts exports
 */
class RouteCleaner {
  constructor() {
    this.packagesDir = path.join(__dirname, 'packages');
    this.results = [];
  }

  /**
   * Main execution method
   */
  async run() {
    console.log('🔍 Analyzing OpenMRS ESM packages for unused routes...\n');
    
    const packages = this.getPackages();
    
    for (const pkg of packages) {
      await this.processPackage(pkg);
    }
    
    this.printSummary();
  }

  /**
   * Get all packages that have both routes.json and index.ts
   */
  getPackages() {
    const dirs = fs.readdirSync(this.packagesDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);
    
    return dirs.filter(dir => {
      const routesPath = path.join(this.packagesDir, dir, 'src', 'routes.json');
      const indexPath = path.join(this.packagesDir, dir, 'src', 'index.ts');
      return fs.existsSync(routesPath) && fs.existsSync(indexPath);
    });
  }

  /**
   * Process a single package
   */
  async processPackage(packageName) {
    console.log(`📦 Processing ${packageName}...`);
    
    const routesPath = path.join(this.packagesDir, packageName, 'src', 'routes.json');
    const indexPath = path.join(this.packagesDir, packageName, 'src', 'index.ts');
    
    try {
      // Read files
      const routesContent = JSON.parse(fs.readFileSync(routesPath, 'utf8'));
      const indexContent = fs.readFileSync(indexPath, 'utf8');
      
      // Extract exports from index.ts
      const exports = this.extractExports(indexContent);
      
      // Analyze routes usage
      const analysis = this.analyzeRoutes(routesContent, exports, packageName);
      
      // Generate cleaned routes.json
      const cleanedRoutes = this.generateCleanedRoutes(routesContent, analysis.usedComponents);
      
      // Save cleaned routes if changes were made
      if (analysis.removedRoutes.length > 0) {
        const cleanedPath = path.join(this.packagesDir, packageName, 'src', 'routes.cleaned.json');
        fs.writeFileSync(cleanedPath, JSON.stringify(cleanedRoutes, null, 2));
        console.log(`  ✅ Cleaned routes saved to routes.cleaned.json`);
      } else {
        console.log(`  ✅ No unused routes found`);
      }
      
      this.results.push({
        packageName,
        analysis,
        cleanedRoutes: analysis.removedRoutes.length > 0 ? cleanedRoutes : null
      });
      
    } catch (error) {
      console.error(`  ❌ Error processing ${packageName}:`, error.message);
    }
    
    console.log('');
  }

  /**
   * Extract all exports from index.ts
   */
  extractExports(content) {
    const exports = new Set();
    
    // Match export statements
    const exportRegex = /export\s+const\s+(\w+)\s*=/g;
    let match;
    while ((match = exportRegex.exec(content)) !== null) {
      exports.add(match[1]);
    }
    
    // Also match export { ... } statements
    const exportBlockRegex = /export\s*{([^}]+)}/g;
    while ((match = exportBlockRegex.exec(content)) !== null) {
      const exportList = match[1].split(',').map(s => s.trim().split(' as ')[0]);
      exportList.forEach(exp => exports.add(exp));
    }
    
    return exports;
  }

  /**
   * Analyze routes.json against exports
   */
  analyzeRoutes(routes, exports, packageName) {
    const usedComponents = new Set();
    const removedRoutes = [];
    
    // Check pages
    if (routes.pages) {
      routes.pages.forEach((page, index) => {
        if (exports.has(page.component)) {
          usedComponents.add(page.component);
        } else {
          removedRoutes.push({
            type: 'page',
            index,
            component: page.component,
            route: page.route,
            reason: 'Component not exported in index.ts'
          });
        }
      });
    }
    
    // Check extensions
    if (routes.extensions) {
      routes.extensions.forEach((extension, index) => {
        if (exports.has(extension.component)) {
          usedComponents.add(extension.component);
        } else {
          removedRoutes.push({
            type: 'extension',
            index,
            name: extension.name,
            component: extension.component,
            slot: extension.slot,
            reason: 'Component not exported in index.ts'
          });
        }
      });
    }
    
    // Check modals
    if (routes.modals) {
      routes.modals.forEach((modal, index) => {
        if (exports.has(modal.component)) {
          usedComponents.add(modal.component);
        } else {
          removedRoutes.push({
            type: 'modal',
            index,
            name: modal.name,
            component: modal.component,
            reason: 'Component not exported in index.ts'
          });
        }
      });
    }
    
    // Check workspaces
    if (routes.workspaces) {
      routes.workspaces.forEach((workspace, index) => {
        if (exports.has(workspace.component)) {
          usedComponents.add(workspace.component);
        } else {
          removedRoutes.push({
            type: 'workspace',
            index,
            name: workspace.name,
            component: workspace.component,
            reason: 'Component not exported in index.ts'
          });
        }
      });
    }
    
    return {
      totalExports: exports.size,
      usedComponents,
      removedRoutes,
      totalRoutes: (routes.pages?.length || 0) + 
                   (routes.extensions?.length || 0) + 
                   (routes.modals?.length || 0) + 
                   (routes.workspaces?.length || 0)
    };
  }

  /**
   * Generate cleaned routes.json
   */
  generateCleanedRoutes(originalRoutes, usedComponents) {
    const cleaned = { ...originalRoutes };
    
    // Filter pages
    if (cleaned.pages) {
      cleaned.pages = cleaned.pages.filter(page => usedComponents.has(page.component));
    }
    
    // Filter extensions
    if (cleaned.extensions) {
      cleaned.extensions = cleaned.extensions.filter(ext => usedComponents.has(ext.component));
    }
    
    // Filter modals
    if (cleaned.modals) {
      cleaned.modals = cleaned.modals.filter(modal => usedComponents.has(modal.component));
    }
    
    // Filter workspaces
    if (cleaned.workspaces) {
      cleaned.workspaces = cleaned.workspaces.filter(ws => usedComponents.has(ws.component));
    }
    
    return cleaned;
  }

  /**
   * Print summary of all results
   */
  printSummary() {
    console.log('📊 SUMMARY REPORT');
    console.log('='.repeat(50));
    
    let totalRemoved = 0;
    let packagesWithChanges = 0;
    
    this.results.forEach(result => {
      const { packageName, analysis } = result;
      
      console.log(`\n📦 ${packageName}`);
      console.log(`   Total routes: ${analysis.totalRoutes}`);
      console.log(`   Used components: ${analysis.usedComponents.size}`);
      console.log(`   Removed routes: ${analysis.removedRoutes.length}`);
      
      if (analysis.removedRoutes.length > 0) {
        packagesWithChanges++;
        totalRemoved += analysis.removedRoutes.length;
        
        console.log('   Removed items:');
        analysis.removedRoutes.forEach(removed => {
          console.log(`     • ${removed.type}: ${removed.component} (${removed.reason})`);
        });
      }
    });
    
    console.log('\n' + '='.repeat(50));
    console.log(`🎯 FINAL SUMMARY:`);
    console.log(`   Packages processed: ${this.results.length}`);
    console.log(`   Packages with changes: ${packagesWithChanges}`);
    console.log(`   Total routes removed: ${totalRemoved}`);
    console.log(`\n✅ Analysis complete! Check routes.cleaned.json files for cleaned versions.`);
  }
}

// Run the script
if (require.main === module) {
  const cleaner = new RouteCleaner();
  cleaner.run().catch(console.error);
}

module.exports = RouteCleaner;