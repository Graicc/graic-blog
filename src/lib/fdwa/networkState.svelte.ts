type NetworkState = {
	peerConnection: RTCPeerConnection | undefined,
	dc: RTCDataChannel | undefined,
	isHost: boolean,
	offer: string,
	response: string,
	remoteResponse: string
	connected: boolean,
};


export const networkState: NetworkState = $state({
	peerConnection: undefined,
	dc: undefined,
	isHost: true,
	offer: "",
	response: "",
	remoteResponse: "",
	connected: false
});
