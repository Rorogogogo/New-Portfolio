'use client';

import { useEffect } from 'react';

export default function DisableRightClick() {
  useEffect(() => {
    // Intercept all mouse events and replace right button with left button
    const interceptMouseEvent = (e: MouseEvent) => {
      if (e.button === 2 || e.buttons === 2) { // Right button
        // Stop the original event completely
        e.preventDefault();
        e.stopImmediatePropagation();
        
        // Create a new left-click event with same properties but left button
        const newEvent = new MouseEvent(e.type, {
          bubbles: true,
          cancelable: true,
          view: e.view,
          detail: e.detail,
          screenX: e.screenX,
          screenY: e.screenY,
          clientX: e.clientX,
          clientY: e.clientY,
          ctrlKey: e.ctrlKey,
          altKey: e.altKey,
          shiftKey: e.shiftKey,
          metaKey: e.metaKey,
          button: 0, // Left button
          buttons: e.type === 'mousedown' ? 1 : 0, // Set buttons based on event type
          relatedTarget: e.relatedTarget
        });
        
        // Dispatch the new event immediately
        setTimeout(() => {
          if (e.target instanceof Element) {
            e.target.dispatchEvent(newEvent);
          }
        }, 0);
      }
    };

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      e.stopImmediatePropagation();
      return false;
    };

    // Intercept all mouse events at the very earliest phase
    document.addEventListener('mousedown', interceptMouseEvent, { capture: true, passive: false });
    document.addEventListener('mouseup', interceptMouseEvent, { capture: true, passive: false });
    document.addEventListener('click', interceptMouseEvent, { capture: true, passive: false });
    document.addEventListener('contextmenu', handleContextMenu, { capture: true, passive: false });

    return () => {
      document.removeEventListener('mousedown', interceptMouseEvent, true);
      document.removeEventListener('mouseup', interceptMouseEvent, true);
      document.removeEventListener('click', interceptMouseEvent, true);
      document.removeEventListener('contextmenu', handleContextMenu, true);
    };
  }, []);

  return null;
}