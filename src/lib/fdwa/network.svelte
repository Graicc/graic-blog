<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/state';
	import { faClipboard } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';

	import type { NetworkPacket } from './types';

	import { networkState } from './networkState.svelte';

	import * as devalue from 'devalue';
	import Br from '$lib/br.svelte';

	let {
		onRecieve,
		onOpen
	}: { onRecieve: (data: NetworkPacket) => void; onOpen: (isHost: boolean) => void } = $props();

	function onMessage(m: MessageEvent<any>) {
		onRecieve(devalue.parse(m.data));
	}

	function onClose() {
		networkState.connected = false;
	}

	async function getOffer(peerConnection: RTCPeerConnection) {
		networkState.dc = peerConnection.createDataChannel('test');
		networkState.dc.onopen = () => {
			networkState.connected = true;
			onOpen(true);
		};
		networkState.dc.onclose = onClose;
		networkState.dc.onmessage = onMessage;
		const offer = await peerConnection.createOffer();
		await peerConnection.setLocalDescription(offer);
	}

	async function getResponse(peerConnection: RTCPeerConnection, offer: string) {
		peerConnection.ondatachannel = (e) => {
			networkState.dc = e.channel;
			networkState.dc.onopen = () => {
				networkState.connected = true;
				onOpen(false);
			};
			networkState.dc.onclose = onClose;
			networkState.dc.onmessage = onMessage;
		};

		let offer2 = new RTCSessionDescription(JSON.parse(atob(offer)));
		await peerConnection.setRemoteDescription(offer2);
		let response = await peerConnection.createAnswer(offer2);
		await peerConnection.setLocalDescription(response);
	}

	let pageUrl: string = $state('');

	if (browser && networkState.peerConnection === undefined) {
		pageUrl = page.url.href;
		networkState.isHost = page.url.hash == '';

		const configuration = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };
		networkState.peerConnection = new RTCPeerConnection(configuration);

		if (!networkState.isHost) {
			getResponse(networkState.peerConnection, decodeURI(page.url.hash.slice(1)));
		} else {
			getOffer(networkState.peerConnection);
		}

		networkState.peerConnection.onicecandidate = (e) => {
			// This means we've got all of them
			// so our local description is ready
			if (e.candidate == null) {
				if (networkState.isHost) {
					networkState.offer = btoa(JSON.stringify(networkState.peerConnection!.localDescription));
				} else {
					networkState.response = btoa(
						JSON.stringify(networkState.peerConnection!.localDescription)
					);
				}
			}
		};
	}

	let offerUrl = $derived(pageUrl + '#' + networkState.offer);

	async function gotResponse(peerConnection: RTCPeerConnection, response: string) {
		let response2 = new RTCSessionDescription(JSON.parse(atob(response)));
		await peerConnection.setRemoteDescription(response2);
	}

	export function send(data: NetworkPacket) {
		if (networkState.dc?.readyState === 'open') {
			let time1 = new Date();
			networkState.dc.send(devalue.stringify(data));
		}
	}
</script>

<Br />
<div class="copy fit">
	<div class="connectionbox" class:connected={networkState.connected}></div>
	<p>{networkState.connected ? 'Connected' : 'Not Connected'}</p>
</div>

{#if networkState.isHost}
	<div class="copy">
		<p class="nowrap">Room Link:</p>
		<p class="wrap">
			<code>{offerUrl}</code>
		</p>
		<button
			class="copy"
			onclick={() => {
				navigator.clipboard.writeText(offerUrl);
			}}
		>
			<Fa icon={faClipboard} />
		</button>
	</div>

	<div class="copy">
		<p>Join Request:</p>
		<input type="text" bind:value={networkState.remoteResponse} />
		<button
			onclick={async () => {
				await gotResponse(networkState.peerConnection!, networkState.remoteResponse);
			}}
		>
			Accept Connection
		</button>
	</div>
{:else}
	<div class="copy">
		<p class="nowrap">Join Request:</p>
		<p class="wrap">
			<code>{networkState.response}</code>
		</p>
		<button
			class="copy"
			onclick={() => {
				navigator.clipboard.writeText(networkState.response);
			}}
		>
			<Fa icon={faClipboard} />
		</button>
	</div>
{/if}
<Br />

<style>
	.fit {
		width: fit-content;
	}

	p {
		margin-bottom: 0 !important;
	}

	input {
		flex-grow: 1;
	}

	code {
		display: block;
		width: fit-content;
	}

	.wrap {
		overflow-x: scroll;
		text-wrap: nowrap;
	}

	.nowrap {
		min-width: fit-content;
	}

	.copy {
		display: flex;
		gap: 5px;
		align-items: center;
		margin-top: 5px;
		margin-bottom: 5px;
	}

	.connectionbox {
		width: 2rem;
		height: 2rem;
		background: red;
	}

	.connected {
		background: green;
	}

	button {
		flex-basis: 100%;
		max-width: fit-content;
		max-height: 2rem;
	}
</style>
