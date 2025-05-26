<script lang="ts">
	import { browser } from '$app/environment';
	let dc;

	async function getOffer(peerConnection: RTCPeerConnection) {
		dc = peerConnection.createDataChannel('test');
		dc.onopen = () => {
			alert('open');
		};
		dc.onmessage = (m) => {
			alert(m.data);
		};
		const offer = await peerConnection.createOffer();
		await peerConnection.setLocalDescription(offer);
		console.log('offer', offer);
	}

	async function getResponse(peerConnection: RTCPeerConnection, offer: string) {
		peerConnection.ondatachannel = (e) => {
			dc = e.channel;
			dc.onopen = () => {
				alert('open');
			};
			dc.onmessage = (m) => {
				alert(m.data);
			};
		};

		let offer2 = new RTCSessionDescription(JSON.parse(atob(offer)));
		await peerConnection.setRemoteDescription(offer2);
		let response = await peerConnection.createAnswer(offer2);
		await peerConnection.setLocalDescription(response);
	}

	let peerConnection: RTCPeerConnection;
	if (browser) {
		const configuration = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };
		peerConnection = new RTCPeerConnection(configuration);

		peerConnection.onicecandidate = (e) => {
			if (e.candidate == null) {
				// This means we're done
				let x = btoa(JSON.stringify(peerConnection.localDescription));
				console.log(x);
				offer = x;
			}
		};
	}

	let offer = $state('');

	let remoteOffer = $state('');

	let response = $state('');

	let remoteResponse = $state('');

	async function gotResponse(peerConnection: RTCPeerConnection, response: string) {
		let response2 = new RTCSessionDescription(JSON.parse(atob(response)));
		await peerConnection.setRemoteDescription(response2);
	}
</script>

<button
	onclick={() => {
		alert(peerConnection.iceGatheringState);
	}}
>
	test
</button>

<button
	onclick={async () => {
		await getOffer(peerConnection);
	}}
>
	Get Offer
</button>

<p>{offer}</p>

<input type="text" bind:value={remoteOffer} />
<button
	onclick={async () => {
		await getResponse(peerConnection, remoteOffer);
	}}
>
	Got offer
</button>
<p>{response}</p>

<input type="text" bind:value={remoteResponse} />
<button
	onclick={async () => {
		await gotResponse(peerConnection, remoteResponse);
	}}
>
	Got response
</button>

<button
	onclick={() => {
		dc.send('a');
	}}
>
	send message
</button>
