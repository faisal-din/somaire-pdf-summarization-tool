import { parseEmojiPoint, parsePoint } from '@/utils/summary-helpers';

const EmojiPoint = ({ point }: { point: string }) => {
  const { emoji, text } = parseEmojiPoint(point) ?? {};

  return (
    <div className='group relative rounded-2xl border border-gray-500/10 bg-gradient-to-br from-gray-200/[0.08] to-gray-400/[0.03] p-3 transition-all shadow-sm hover:shadow-lg'>
      <div className='absolute inset-0 rounded-2xl bg-gradient-to-r from-gray-500/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100' />
      <div className='relative flex items-start gap-3'>
        <span className='shrink-0 pt-1 text-lg lg:text-xl'>{emoji}</span>
        <p className='text-lg leading-relaxed text-muted-foreground/90 lg:text-xl'>
          {text}
        </p>
      </div>
    </div>
  );
};

const RegularPoint = ({ point }: { point: string }) => {
  const text = point.replace(/^[•]\s*/, '').trim();

  return (
    <div className='group relative rounded-2xl border border-gray-500/10 bg-gradient-to-br from-gray-200/[0.08] to-gray-400/[0.03] p-4 transition-all shadow-sm hover:shadow-lg'>
      <div className='absolute inset-0 rounded-2xl bg-gradient-to-r from-gray-500/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100' />
      <p className='relative text-lg leading-relaxed text-muted-foreground/90 lg:text-xl'>
        {text}
      </p>
    </div>
  );
};

const ContentSection = ({
  title,
  points,
}: {
  title: string;
  points: string[];
}) => {
  return (
    <div className='space-y-4'>
      {points.map((point, index) => {
        const { isMainPoint, hasEmoji, isEmpty } = parsePoint(point);

        if (isEmpty) return null;

        if (hasEmoji || isMainPoint) {
          return <EmojiPoint key={`point-${index}`} point={point} />;
        }

        return <RegularPoint key={`point-${index}`} point={point} />;
      })}
    </div>
  );
};

export default ContentSection;
