import type {
    FullConfig,
    FullResult,
    Reporter,
    Suite,
    TestCase,
    TestResult,
} from "@playwright/test/reporter";

type Summary = {
    total: number;
    passed: number;
    failed: number;
    skipped: number;
    durationMs: number;
};

class SummaryReporter implements Reporter {
    private passed = 0;
    private failed = 0;
    private skipped = 0;
    private startTime = Date.now();

    onBegin(config: FullConfig, suite: Suite) {
        this.startTime = Date.now();
    }

    onTestEnd(test: TestCase, result: TestResult) {
        if (result.status === "passed") this.passed++;
        else if (result.status === "failed") this.failed++;
        else if (result.status === "skipped") this.skipped++;
    }

    onEnd(result: FullResult) {
        const durationMs = Date.now() - this.startTime;

        const summary: Summary = {
            total: this.passed + this.failed + this.skipped,
            passed: this.passed,
            failed: this.failed,
            skipped: this.skipped,
            durationMs,
        };

        console.log(JSON.stringify(summary, null, 2));
    }
}

export default SummaryReporter;
