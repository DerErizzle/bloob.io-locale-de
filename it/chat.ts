import { ChatMessage, ChatMessageType } from '../types/chat'

export default <ChatMessage>{
	[ChatMessageType.emoji]: {
		love: `❤️`,
		luck: `🍀`,
		fire: `🔥`,
		celebration: `🎉`,
		thumbsUp: `👍`,
		mindBlowing: `🤯`,
		thinking: `🤔`,
		clap: `👏`,
		cry: `😭`,
		cool: `😎`
	},
	[ChatMessageType.universal]: {
		leftTheGame: `ha abbandonato il gioco`,
		affirmative: `Okay.`,
		thanks: `Grazie!`,
		sorry: `Mi dispiace!`,
		goodLuck: `Buona fortuna!`,
		brb: `Torno subito!`,
		go: `Devo andare.`,
		glhf: `Buona fortuna, divertiti`,
		gg: `Bella partita`
	},
	[ChatMessageType.preGame]: {
		readyCheck: `Siete tutti pronti?`,
		changeSettings: `Cambia le impostazioni!`,
		ready: `Pronti!`,
		wait: `Aspetta un attimo!`,
		go: `Andiamo!`,
		greeting: `Ciao! 👋`
	},
	[ChatMessageType.game]: {
		wtf: `WTF!`,
		how: `Come!?`,
		closeOne: `Per un pelo!`,
		niceOne: `Ottimo!`,
		remindMove: `Tocca a te!`,
		wow: `Wow!`,
		oops: `Ops!`,
		no: `Noooo!`,
		ohNo: `Oh no!`
	},
	[ChatMessageType.postGame]: {
		closeOne: `Per un pelo!`,
		wellPlayed: `Bella mossa!`,
		differentGame: null,
		rematch: `Rivincita!`,
		fun: `È stato divertente!`,
		bye: `Ciao!`
	}
}
