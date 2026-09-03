import type { TopicItem } from '../types';

export function exportTopicToMarkdown(topic: TopicItem): void {
  const content = `# ${topic.title}
*Module: ${topic.moduleTitle}* | *Difficulty: ${topic.difficulty}*

---

## Complexity Summary
- **Time Complexity:** \`${topic.timeComplexity}\`
- **Space Complexity:** \`${topic.spaceComplexity}\`

---

## Concept Overview
${topic.overview}

---

## Detailed Explanation & Intuition
${topic.explanation}

---

## Key Takeaways
${topic.keyTakeaways.map(point => `- ${point}`).join('\n')}

---

## Code Implementations

### JavaScript
\`\`\`javascript
${topic.codeSnippets.javascript}
\`\`\`

### Python
\`\`\`python
${topic.codeSnippets.python}
\`\`\`

### C++
\`\`\`cpp
${topic.codeSnippets.cpp}
\`\`\`

### Java
\`\`\`java
${topic.codeSnippets.java}
\`\`\`

---
*Generated via DSA Interactive Visualizer & Concept Studio*
`;

  const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${topic.id}-notes.md`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function printCurrentTopic(): void {
  window.print();
}
