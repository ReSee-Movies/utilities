import type { Plugin } from 'vitest/config';
import type { BrowserCommand } from 'vitest/node';
import type { Page } from 'playwright';

export type Point = {
  x: number;
  y: number;
};

export type PointerEventCommandOptions = {
  start : Point;
  end?  : Point;
};

/**
 * At the time of writing, Vitest does not expose Testing Library's `pointer` utility.
 * This is a really, really, really simplified version of things intended to get
 * _something_ that can be used for testing.
 *
 * @https://testing-library.com/docs/user-event/pointer
 */
const pointCommand: BrowserCommand<[PointerEventCommandOptions]> = async (ctx, options) => {
  if (ctx.provider.name !== 'playwright') {
    return;
  }

  const page = 'page' in ctx ? ctx.page as Page : undefined;

  if (!page) {
    return;
  }

  await page.mouse.move(options.start.x, options.start.y);
  await page.mouse.down();

  if (options.end) {
    await page.mouse.move(options.end.x, options.end.y);
  }

  await page.mouse.up();
};

export default function PointerEventCommands(): Plugin {
  return {
    name: 'vitest:resee-point-event-commands',

    config() {
      return { test: { browser: { commands: { point: pointCommand } } } };
    },
  };
}

declare module 'vitest/browser' {
  interface BrowserCommands {
    point: (options: PointerEventCommandOptions) => Promise<void>;
  }
}
