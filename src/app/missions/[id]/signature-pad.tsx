"use client";

import { useRef, useState, useTransition } from "react";
import { signDocument } from "../actions";

export function SignaturePad({
  documentId,
  missionId,
}: {
  documentId: string;
  missionId: string;
}) {
  const [open, setOpen] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [pending, startTransition] = useTransition();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);

  function pos(e: React.PointerEvent<HTMLCanvasElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }

  function onPointerDown(e: React.PointerEvent<HTMLCanvasElement>) {
    drawing.current = true;
    const ctx = canvasRef.current!.getContext("2d")!;
    const { x, y } = pos(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
  }

  function onPointerMove(e: React.PointerEvent<HTMLCanvasElement>) {
    if (!drawing.current) return;
    const ctx = canvasRef.current!.getContext("2d")!;
    const { x, y } = pos(e);
    ctx.lineTo(x, y);
    ctx.strokeStyle = "#17241c";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.stroke();
    setHasDrawn(true);
  }

  function onPointerUp() {
    drawing.current = false;
  }

  function clear() {
    const canvas = canvasRef.current!;
    canvas.getContext("2d")!.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
  }

  function submit() {
    const dataUrl = canvasRef.current!.toDataURL("image/png");
    const formData = new FormData();
    formData.set("document_id", documentId);
    formData.set("mission_id", missionId);
    formData.set("signature", dataUrl);
    startTransition(async () => {
      await signDocument(formData);
      setOpen(false);
    });
  }

  if (!open) {
    return (
      <button onClick={() => setOpen(true)} className="text-brand-green hover:underline">
        Signer
      </button>
    );
  }

  return (
    <div className="mt-2 rounded-lg border border-gray-200 bg-gray-50 p-3">
      <canvas
        ref={canvasRef}
        width={280}
        height={100}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        className="touch-none rounded border border-gray-300 bg-white"
      />
      <div className="mt-2 flex gap-3 text-xs">
        <button onClick={clear} className="text-gray-500 hover:underline">
          Effacer
        </button>
        <button
          onClick={submit}
          disabled={!hasDrawn || pending}
          className="font-semibold text-brand-green hover:underline disabled:opacity-50"
        >
          {pending ? "Enregistrement…" : "Valider la signature"}
        </button>
        <button onClick={() => setOpen(false)} className="text-gray-400 hover:underline">
          Annuler
        </button>
      </div>
    </div>
  );
}
