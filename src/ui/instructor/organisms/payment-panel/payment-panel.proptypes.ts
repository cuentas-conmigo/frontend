import type { Payment } from "~typing/charges";

export interface Props {
	payment: Payment;
	/** Shows the NFC cube hint under the QR; defaults to `EXPO_PUBLIC_NFC_CUBE=on`. */
	cubeHint?: boolean;
}
