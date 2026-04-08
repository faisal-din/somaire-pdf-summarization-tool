export const parseSection = (
  section: string
): { title: string; points: string[] } => {
  const [title, ...content] = section.split('\n');

  const cleanTitle = title.startsWith('#')
    ? title.substring(1).trim()
    : title.trim();

  const points: string[] = [];

  let currentPoint = '';

  content.forEach((line) => {
    const trimmedLine = line.trim();
    if (trimmedLine.startsWith('⭐')) {
      if (currentPoint) {
        points.push(currentPoint.trim());
      }
      currentPoint = trimmedLine; // Start a new point
    } else if (!trimmedLine) {
      if (currentPoint) {
        points.push(currentPoint.trim());
      }
      currentPoint = ''; // Reset for the next point
    } else {
      currentPoint += ' ' + trimmedLine; // Continue the current point
    }
  });

  if (currentPoint) {
    points.push(currentPoint.trim());
  }

  const filteredPoints = points.filter(
    (point) => point && !point.startsWith('#') && !point.startsWith('Choose')
  );

  console.log({ currentPoint });

  return { title: cleanTitle, points: filteredPoints };
};

export function parsePoint(point: string) {
  const isNumbered = /^\d+\./.test(point);
  const isMainPoint = /^•/.test(point);

  // Replace the Unicode property escape with a simpler emoji detection
  const emojiRegex = /[\u{1F300}-\u{1F9FF}] | [\u{2600}-\u{26FF}]/u;
  const hasEmoji = emojiRegex.test(point);

  const isEmpty = point.trim() === '';

  return { isNumbered, isMainPoint, hasEmoji, isEmpty };
}

export function parseEmojiPoint(content: string) {
  const cleanedContent = content.replace(/^[•]\s*/, '').trim();

  const matches = cleanedContent.match(/^(\p{Emoji}+)(.+)$/u);

  if (!matches) return null;

  const [_, emoji, text] = matches;
  return {
    emoji: emoji.trim(),
    text: text.trim(),
  };
}
