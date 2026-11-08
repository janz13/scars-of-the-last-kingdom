/**
 * Master E2E Test Suite Runner
 * Executes Tiers 1-4 with comprehensive reporting and tier breakdown.
 * Run with: npx tsx scripts/e2e/runAllTests.ts
 */

import { tier1Tests } from './tier1_feature_coverage.test.js';
import { tier2Tests } from './tier2_boundary_corner_cases.test.js';
import { tier3Tests } from './tier3_cross_feature_combinations.test.js';
import { tier4Tests } from './tier4_real_world_scenarios.test.js';
import { TestCase, TestResult } from './types.js';

interface TierSummary {
  tier: number;
  name: string;
  total: number;
  passed: number;
  failed: number;
  durationMs: number;
}

async function runTier(name: string, tierNum: 1 | 2 | 3 | 4, tests: TestCase[]): Promise<TierSummary> {
  console.log(`\n══════════════════════════════════════════════════════════════════════════════`);
  console.log(`  RUNNING TIER ${tierNum}: ${name.toUpperCase()} (${tests.length} tests)`);
  console.log(`══════════════════════════════════════════════════════════════════════════════`);

  let passed = 0;
  let failed = 0;
  const startTier = Date.now();

  for (const t of tests) {
    const startTest = Date.now();
    try {
      await t.fn();
      passed++;
      const duration = Date.now() - startTest;
      console.log(`  ✅ PASS [${t.id}] ${t.title} (${duration}ms)`);
    } catch (err: any) {
      failed++;
      const duration = Date.now() - startTest;
      console.error(`  ❌ FAIL [${t.id}] ${t.title} (${duration}ms)`);
      console.error(`     Error: ${err.message || err}`);
    }
  }

  const durationMs = Date.now() - startTier;
  return {
    tier: tierNum,
    name,
    total: tests.length,
    passed,
    failed,
    durationMs,
  };
}

async function main() {
  console.log(`\n╔════════════════════════════════════════════════════════════════════════════╗`);
  console.log(`║     SCARS OF THE LAST KINGDOM — E2E TEST SUITE EXECUTION RUNNER            ║`);
  console.log(`╚════════════════════════════════════════════════════════════════════════════╝`);

  const globalStart = Date.now();

  const summaries: TierSummary[] = [];

  summaries.push(await runTier('Feature Coverage', 1, tier1Tests));
  summaries.push(await runTier('Boundary & Corner Cases', 2, tier2Tests));
  summaries.push(await runTier('Cross-Feature Combinations', 3, tier3Tests));
  summaries.push(await runTier('Real-World Application Scenarios', 4, tier4Tests));

  const totalTime = Date.now() - globalStart;
  const grandTotal = summaries.reduce((acc, s) => acc + s.total, 0);
  const totalPassed = summaries.reduce((acc, s) => acc + s.passed, 0);
  const totalFailed = summaries.reduce((acc, s) => acc + s.failed, 0);

  console.log(`\n══════════════════════════════════════════════════════════════════════════════`);
  console.log(`  E2E TEST SUITE EXECUTION SUMMARY`);
  console.log(`══════════════════════════════════════════════════════════════════════════════`);
  console.log(`  Tier 1 (Feature Coverage):            ${summaries[0].passed}/${summaries[0].total} passed (${summaries[0].durationMs}ms)`);
  console.log(`  Tier 2 (Boundary & Corner Cases):     ${summaries[1].passed}/${summaries[1].total} passed (${summaries[1].durationMs}ms)`);
  console.log(`  Tier 3 (Cross-Feature Combinations):   ${summaries[2].passed}/${summaries[2].total} passed (${summaries[2].durationMs}ms)`);
  console.log(`  Tier 4 (Real-World Scenarios):        ${summaries[3].passed}/${summaries[3].total} passed (${summaries[3].durationMs}ms)`);
  console.log(`──────────────────────────────────────────────────────────────────────────────`);
  console.log(`  TOTAL TESTS:  ${grandTotal}`);
  console.log(`  PASSED:       ${totalPassed}`);
  console.log(`  FAILED:       ${totalFailed}`);
  console.log(`  TOTAL TIME:   ${totalTime}ms`);
  console.log(`══════════════════════════════════════════════════════════════════════════════`);

  if (totalFailed > 0) {
    console.error(`\n❌ TEST SUITE FAILED with ${totalFailed} failure(s).\n`);
    process.exit(1);
  } else {
    console.log(`\n🎉 ALL ${grandTotal} E2E TESTS PASSED SUCCESSFULLY across Tiers 1-4!\n`);
    process.exit(0);
  }
}

main().catch(err => {
  console.error('Fatal test runner error:', err);
  process.exit(1);
});
