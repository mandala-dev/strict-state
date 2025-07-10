<script>
	import { onMount } from 'svelte';
	onMount(() => {
		const ws = new WebSocket('ws://localhost:8080');

		ws.onopen = () => {
			console.log('Connected to WebSocket server');
		};

		ws.onmessage = (event) => {
			console.log('Message from server:', event.data);
		};

		document.getElementById('sendBtn').onclick = () => {
			ws.send('Hello from client');
		};
	});
</script>

<h1>WebSocket Example</h1>
<button id="sendBtn">Send Message</button>