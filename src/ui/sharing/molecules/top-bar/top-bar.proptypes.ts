export interface Props {
	/** Shows "‹ Atrás" when the screen can go back. */
	onBack?: () => void;
	/** What Escuchar reads aloud. */
	script: string;
}
