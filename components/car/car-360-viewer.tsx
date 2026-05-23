"use client";

import Image from "next/image";
import {Rotate3D} from "lucide-react";
import {useMemo, useState} from "react";
import {Card, CardContent} from "@/components/ui/card";

export function Car360Viewer({images, alt}: {images: string[]; alt: string}) {
  const frames = useMemo(() => images.filter(Boolean), [images]);
  const [frame, setFrame] = useState(0);
  const [dragStart, setDragStart] = useState<number | null>(null);

  if (frames.length < 2) return null;

  function updateFrame(deltaX: number) {
    const step = Math.trunc(deltaX / 18);
    if (step === 0) return;

    setFrame((current) => {
      const next = (current + step) % frames.length;
      return next < 0 ? next + frames.length : next;
    });
  }

  return (
    <Card className="mt-8">
      <CardContent className="p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="flex items-center gap-2 text-lg font-bold">
          <Rotate3D className="h-5 w-5 text-green-700" aria-hidden="true" />
          360 view
        </h2>
        <span className="text-sm text-muted-foreground">
          {frame + 1}/{frames.length}
        </span>
      </div>
      <div
        className="relative aspect-[16/9] cursor-grab overflow-hidden rounded-md bg-muted active:cursor-grabbing"
        onPointerDown={(event) => {
          setDragStart(event.clientX);
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerMove={(event) => {
          if (dragStart === null) return;
          const deltaX = event.clientX - dragStart;
          if (Math.abs(deltaX) < 18) return;
          updateFrame(deltaX);
          setDragStart(event.clientX);
        }}
        onPointerUp={() => setDragStart(null)}
        onPointerCancel={() => setDragStart(null)}
      >
        <Image src={frames[frame]} alt={`${alt} 360 frame ${frame + 1}`} fill className="select-none object-cover" draggable={false} sizes="(min-width: 1024px) 70vw, 100vw" />
      </div>
      <input
        className="mt-4 w-full accent-green-600"
        type="range"
        min={0}
        max={frames.length - 1}
        value={frame}
        onChange={(event) => setFrame(Number(event.target.value))}
        aria-label="360 frame"
      />
      </CardContent>
    </Card>
  );
}
