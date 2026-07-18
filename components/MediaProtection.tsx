"use client";

import { useEffect } from "react";

/**
 * Deters casual saving of site media: blocks the context menu and
 * drag-and-drop on images and videos. Not absolute protection —
 * screenshots and dev tools can't be blocked — but it stops the
 * common right-click → "Save image as…" flow.
 */
export function MediaProtection() {
  useEffect(() => {
    const isMedia = (target: EventTarget | null) =>
      target instanceof Element && Boolean(target.closest("img, video, picture"));

    const onContextMenu = (event: MouseEvent) => {
      if (isMedia(event.target)) event.preventDefault();
    };
    const onDragStart = (event: DragEvent) => {
      if (isMedia(event.target)) event.preventDefault();
    };

    document.addEventListener("contextmenu", onContextMenu);
    document.addEventListener("dragstart", onDragStart);
    return () => {
      document.removeEventListener("contextmenu", onContextMenu);
      document.removeEventListener("dragstart", onDragStart);
    };
  }, []);

  return null;
}
