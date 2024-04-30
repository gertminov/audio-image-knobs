

/**
 * Action
 */
interface ActionResult<P> {
	update?: (parameters?: P) => void;
	destroy?: () => void;
}

export type Action<P> = (node: HTMLElement, parameters?: P) => ActionResult<P>;


/**
 * App view
 */

export type View = 'shelf' | 'rack' | 'help';

