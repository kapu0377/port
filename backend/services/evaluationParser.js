class EvaluationParser {
    static parse(text) {
        return {
            score: this._parseScore(text),
            strengths: this._parseSection(text, "잘한 점", ["부족한 점", "개선방안", "요약"]),
            weaknesses: this._parseSection(text, "부족한 점", ["개선방안", "요약"]),
            improvements: this._parseSection(text, "개선방안", ["요약"]),
            summary: this._parseSection(text, "요약", []),
            llm_evaluation: text.trim()
        };
    }

    static _parseScore(text) {
        const scoreMatch = text.match(/점수:\s*(\d+)/);
        return scoreMatch && scoreMatch[1] ? parseInt(scoreMatch[1], 10) : 0;
    }

    static _parseSection(text, key, nextKeys) {
        const keyPattern = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        let regexPattern = `${keyPattern}\\s*([\\s\\S]*?)`;

        if (nextKeys && nextKeys.length > 0) {
            const nextKeyPatterns = nextKeys.map(nk => nk.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
            regexPattern += `(?=\\n(?:${nextKeyPatterns.join('|')})|$)`;
        } else {
            regexPattern += `(?=$)`;
        }

        const regex = new RegExp(regexPattern, 'm');
        const match = text.match(regex);
        return match && match[1] ? match[1].trim() : "";
    }
}

module.exports = EvaluationParser;