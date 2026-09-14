import { useEffect, useState } from "react";

const pad = (n: number) => String(Math.max(0, n)).padStart(2, "0");

export function CountdownTimer({ endsAt }: { endsAt: string }) {
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setRemaining(new Date(endsAt).getTime() - Date.now());
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, [endsAt]);

  const ms = remaining ?? 0;
  const hours = Math.floor(ms / 3_600_000);
  const minutes = Math.floor((ms % 3_600_000) / 60_000);
  const seconds = Math.floor((ms % 60_000) / 1000);

  const blocks = [
    { label: "hrs", value: hours },
    { label: "min", value: minutes },
    { label: "sec", value: seconds },
  ];

  return (
    <div className="flex items-center gap-2" aria-label="Time remaining in this sale">
      {blocks.map((b, i) => (
        <span key={b.label} className="flex items-center gap-2">
          <span className="flex min-w-[46px] flex-col items-center rounded-lg bg-ink px-2 py-1.5 text-ink-foreground">
            <span className="font-display text-base font-bold tabular-nums">
              {remaining === null ? "--" : pad(b.value)}
            </span>
            <span className="text-[10px] uppercase tracking-wide opacity-70">{b.label}</span>
          </span>
          {i < blocks.length - 1 && <span className="font-bold text-muted-foreground">:</span>}
        </span>
      ))}
    </div>
  );
}
